/**
 * ContactPage Component
 * Full Contact Page Experience adhering to KodMates design system
 * and strict submission rules.
 */

import { createContactHero } from '../components/contact/ContactHero.js';
import { createContactInfo } from '../components/contact/ContactInfo.js';
import { createContactFormHTML, isValidEmail } from '../components/contact/ContactForm.js';
import { createContactProcess } from '../components/contact/ContactProcess.js';
import { createContactFAQ } from '../components/contact/ContactFAQ.js';
import { CONTACT_CONFIG } from '../components/contact/ContactConfig.js';

export class ContactPage {
  constructor(options = {}) {
    this.target = options.target || document.getElementById('main-content');
    this.pageEl = null;
    this.isSubmitting = false;

    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleInput = this._handleInput.bind(this);
    this._handleFAQClick = this._handleFAQClick.bind(this);
  }

  renderHTML() {
    return `
      <div class="contact-page" id="contact-page">
        ${createContactHero()}
        ${createContactInfo()}
        ${createContactFormHTML()}
        ${createContactProcess()}
        ${createContactFAQ()}
      </div>
    `;
  }

  mount() {
    this.destroy();

    const temp = document.createElement('div');
    temp.innerHTML = this.renderHTML().trim();
    this.pageEl = temp.firstElementChild;

    if (this.target) {
      this.target.appendChild(this.pageEl);
    }

    this.bindEvents();
    this.updateSEO();
    window.scrollTo({ top: 0, behavior: 'instant' });
    return this.pageEl;
  }

  updateSEO() {
    document.title = "Contact KodMates — Start a Software Project";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', "Let's build something meaningful. Contact KodMates to discuss web applications, Android development, APIs, and custom software systems.");
    }
  }

  bindEvents() {
    if (!this.pageEl) return;

    // Contact Form
    const form = this.pageEl.querySelector('#kodmates-contact-form');
    if (form) {
      form.addEventListener('submit', this._handleSubmit);
      form.addEventListener('input', this._handleInput);
    }

    // Character counter for description
    const descTextarea = this.pageEl.querySelector('#field-description');
    const charCounter = this.pageEl.querySelector('#char-count-description');
    if (descTextarea && charCounter) {
      descTextarea.addEventListener('input', () => {
        const len = descTextarea.value.length;
        charCounter.textContent = `${len} / 2000`;
      });
    }

    // FAQ Accordion
    const accordion = this.pageEl.querySelector('#contact-faq-accordion');
    if (accordion) {
      accordion.addEventListener('click', this._handleFAQClick);
    }
  }

  _handleInput(e) {
    const input = e.target;
    const group = input.closest('.form-field-group');
    if (group && group.classList.contains('is-invalid')) {
      group.classList.remove('is-invalid');
      input.removeAttribute('aria-invalid');
      const errEl = group.querySelector('.form-error-msg');
      if (errEl) errEl.textContent = '';
    }
  }

  _handleFAQClick(e) {
    const trigger = e.target.closest('.faq-trigger');
    if (!trigger) return;

    const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
    const panelId = trigger.getAttribute('aria-controls');
    const panel = this.pageEl.querySelector(`#${panelId}`);

    if (isExpanded) {
      trigger.setAttribute('aria-expanded', 'false');
      panel?.classList.remove('is-open');
    } else {
      // Close other panels in accordion
      const allTriggers = this.pageEl.querySelectorAll('.faq-trigger');
      const allPanels = this.pageEl.querySelectorAll('.faq-panel');
      allTriggers.forEach((t) => t.setAttribute('aria-expanded', 'false'));
      allPanels.forEach((p) => p.classList.remove('is-open'));

      trigger.setAttribute('aria-expanded', 'true');
      panel?.classList.add('is-open');
    }
  }

  async _handleSubmit(e) {
    e.preventDefault();
    if (this.isSubmitting) return;

    const form = e.target;
    const hp = form.querySelector('#contact-hp-field')?.value;
    // Honeypot bot protection
    if (hp) {
      return;
    }

    // Form inputs
    const fullNameInput = form.querySelector('#field-fullname');
    const emailInput = form.querySelector('#field-email');
    const companyInput = form.querySelector('#field-company');
    const serviceInput = form.querySelector('#field-service');
    const budgetInput = form.querySelector('#field-budget');
    const timelineInput = form.querySelector('#field-timeline');
    const descInput = form.querySelector('#field-description');
    const consentInput = form.querySelector('#field-consent');

    let hasError = false;
    let firstErrorField = null;

    const setError = (input, groupSelector, errorSelector, msg) => {
      const group = form.querySelector(groupSelector);
      const err = form.querySelector(errorSelector);
      if (group && err) {
        group.classList.add('is-invalid');
        input.setAttribute('aria-invalid', 'true');
        err.textContent = msg;
        if (!firstErrorField) firstErrorField = input;
      }
      hasError = true;
    };

    // 1. Full name validation
    if (!fullNameInput.value || fullNameInput.value.trim().length < 2) {
      setError(fullNameInput, '#group-fullname', '#error-fullname', 'Please provide your full name (minimum 2 characters).');
    }

    // 2. Email format validation
    if (!emailInput.value || !isValidEmail(emailInput.value)) {
      setError(emailInput, '#group-email', '#error-email', 'Please provide a valid email address (e.g. name@company.com).');
    }

    // 3. Project description validation
    if (!descInput.value || descInput.value.trim().length < 20) {
      setError(descInput, '#group-description', '#error-description', 'Please share more project context (minimum 20 characters).');
    }

    // 4. Consent validation
    if (!consentInput.checked) {
      setError(consentInput, '#group-consent', '#error-consent', 'Please consent to project inquiry review to proceed.');
    }

    if (hasError) {
      firstErrorField?.focus();
      return;
    }

    // Trigger submission state
    this.isSubmitting = true;
    const submitBtn = form.querySelector('#contact-submit-btn');
    submitBtn?.classList.add('is-loading');

    // Simulate standard request processing latency
    await new Promise((res) => setTimeout(res, 650));

    // Construct structured submission payload
    const payload = {
      submissionId: 'km-inq-' + Date.now().toString(36),
      submittedAt: new Date().toISOString(),
      inquiryData: {
        fullName: fullNameInput.value.trim(),
        email: emailInput.value.trim(),
        company: companyInput.value.trim() || 'Not specified',
        service: serviceInput.value || 'General Technical Inquiries',
        budget: budgetInput.value || 'Not specified',
        timeline: timelineInput.value || 'Flexible',
        description: descInput.value.trim(),
        consentAcknowledged: true
      },
      integrationEnvironment: {
        backendConfigured: false,
        deliveryStatus: 'READY_FOR_BACKEND_DISPATCH',
        note: CONTACT_CONFIG.backendIntegration.integrationNotice
      }
    };

    // Render honest feedback in accordance with Important Submission Rule
    this.renderSubmissionFeedback(payload);
  }

  renderSubmissionFeedback(payload) {
    const feedbackBox = this.pageEl.querySelector('#contact-feedback-container');
    const form = this.pageEl.querySelector('#kodmates-contact-form');

    if (!feedbackBox || !form) return;

    form.style.display = 'none';
    feedbackBox.style.display = 'block';

    const payloadJsonString = JSON.stringify(payload, null, 2);

    feedbackBox.innerHTML = `
      <div class="feedback-card" role="region" aria-label="Submission feedback">
        <div class="feedback-header">
          <div class="feedback-icon-badge" aria-hidden="true">✓</div>
          <div class="feedback-title-group">
            <span class="feedback-badge">VALIDATION SUCCESSFUL</span>
            <h3 class="feedback-title">Project Inquiry Validated</h3>
          </div>
        </div>

        <p class="feedback-desc">
          ${CONTACT_CONFIG.backendIntegration.integrationNotice}
        </p>

        <div class="feedback-payload-box">
          <div class="feedback-payload-header">
            <span class="feedback-payload-label">Validated API Request Payload</span>
            <button type="button" class="copy-payload-btn" id="copy-payload-btn">
              Copy Payload JSON
            </button>
          </div>
          <pre class="feedback-payload-code"><code>${payloadJsonString}</code></pre>
        </div>

        <div class="feedback-actions">
          <button type="button" class="feedback-reset-btn" id="edit-inquiry-btn">
            ← Edit Inquiry Details
          </button>
        </div>
      </div>
    `;

    // Copy Payload Button
    const copyBtn = feedbackBox.querySelector('#copy-payload-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(payloadJsonString);
          copyBtn.textContent = 'Copied to Clipboard!';
          setTimeout(() => {
            copyBtn.textContent = 'Copy Payload JSON';
          }, 2000);
        } catch {
          copyBtn.textContent = 'Copied';
        }
      });
    }

    // Edit Inquiry / Return to form
    const editBtn = feedbackBox.querySelector('#edit-inquiry-btn');
    if (editBtn) {
      editBtn.addEventListener('click', () => {
        feedbackBox.style.display = 'none';
        feedbackBox.innerHTML = '';
        form.style.display = '';
        this.isSubmitting = false;
        const submitBtn = form.querySelector('#contact-submit-btn');
        submitBtn?.classList.remove('is-loading');
      });
    }
  }

  destroy() {
    if (this.pageEl && this.pageEl.parentNode) {
      this.pageEl.parentNode.removeChild(this.pageEl);
    }
    this.pageEl = null;
    this.isSubmitting = false;
  }
}

export function initContactPage(options = {}) {
  const page = new ContactPage(options);
  page.mount();
  return page;
}
