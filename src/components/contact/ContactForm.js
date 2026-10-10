/**
 * ContactForm Component
 * Step 04: Accessible, validated contact form adhering to strict submission rules.
 */

import { CONTACT_CONFIG } from './ContactConfig.js';

export function createContactFormHTML() {
  const serviceOptions = CONTACT_CONFIG.services.map((s) => `
    <option value="${s.value}">${s.label}</option>
  `).join('');

  const budgetOptions = CONTACT_CONFIG.budgetRanges.map((b) => `
    <option value="${b.value}">${b.label}</option>
  `).join('');

  const timelineOptions = CONTACT_CONFIG.timelines.map((t) => `
    <option value="${t.value}">${t.label}</option>
  `).join('');

  return `
    <section class="contact-form-section" id="contact-form-section" aria-label="Project Inquiry Form">
      <div class="contact-form__container">
        <div class="contact-form__intro">
          <span class="contact-section-eyebrow">SUBMIT YOUR BRIEF</span>
          <h2 class="contact-section-title">Initiate a Project Discussion</h2>
          <p class="contact-section-sub">
            Fill out the details below. Our team reviews project requirements directly to understand architecture, deliverables, and timeline requirements.
          </p>
        </div>

        <div class="contact-form__card" id="contact-form-card">
          <!-- Live Form Container -->
          <form id="kodmates-contact-form" class="contact-form" novalidate aria-label="Contact and project inquiry form">
            <!-- Honeypot Field for Bot Spam Prevention (Step 15) -->
            <div class="sr-only" aria-hidden="true" style="display:none !important;">
              <label for="contact-hp-field">Leave this field blank</label>
              <input type="text" id="contact-hp-field" name="organization_hp" tabindex="-1" autocomplete="off" />
            </div>

            <div class="form-grid">
              <!-- Full Name (Required) -->
              <div class="form-field-group" id="group-fullname">
                <label for="field-fullname" class="form-label">
                  Full Name <span class="form-required-mark" aria-hidden="true">*</span>
                </label>
                <input 
                  type="text" 
                  id="field-fullname" 
                  name="fullname" 
                  class="form-input" 
                  placeholder="e.g. Eleanor Vance" 
                  required 
                  aria-required="true"
                  aria-describedby="error-fullname"
                  autocomplete="name"
                />
                <span class="form-error-msg" id="error-fullname" role="alert" aria-live="polite"></span>
              </div>

              <!-- Email Address (Required) -->
              <div class="form-field-group" id="group-email">
                <label for="field-email" class="form-label">
                  Email Address <span class="form-required-mark" aria-hidden="true">*</span>
                </label>
                <input 
                  type="email" 
                  id="field-email" 
                  name="email" 
                  class="form-input" 
                  placeholder="e.g. eleanor@company.com" 
                  required 
                  aria-required="true"
                  aria-describedby="error-email"
                  autocomplete="email"
                />
                <span class="form-error-msg" id="error-email" role="alert" aria-live="polite"></span>
              </div>

              <!-- Company / Organization (Optional) -->
              <div class="form-field-group" id="group-company">
                <label for="field-company" class="form-label">
                  Company or Organization <span class="form-optional-tag">(Optional)</span>
                </label>
                <input 
                  type="text" 
                  id="field-company" 
                  name="company" 
                  class="form-input" 
                  placeholder="e.g. Acme Systems Ltd." 
                  autocomplete="organization"
                />
              </div>

              <!-- Service of Interest (Selectable) -->
              <div class="form-field-group" id="group-service">
                <label for="field-service" class="form-label">
                  Primary Service of Interest <span class="form-optional-tag">(Optional)</span>
                </label>
                <div class="form-select-wrapper">
                  <select id="field-service" name="service" class="form-select">
                    <option value="">Select a technical discipline...</option>
                    ${serviceOptions}
                  </select>
                </div>
              </div>

              <!-- Project Budget (Optional) -->
              <div class="form-field-group" id="group-budget">
                <label for="field-budget" class="form-label">
                  Estimated Budget Range <span class="form-optional-tag">(Optional)</span>
                </label>
                <div class="form-select-wrapper">
                  <select id="field-budget" name="budget" class="form-select">
                    <option value="">Select estimated budget...</option>
                    ${budgetOptions}
                  </select>
                </div>
              </div>

              <!-- Project Timeline (Optional) -->
              <div class="form-field-group" id="group-timeline">
                <label for="field-timeline" class="form-label">
                  Target Timeline <span class="form-optional-tag">(Optional)</span>
                </label>
                <div class="form-select-wrapper">
                  <select id="field-timeline" name="timeline" class="form-select">
                    <option value="">Select timeline expectation...</option>
                    ${timelineOptions}
                  </select>
                </div>
              </div>

              <!-- Project Description (Required) -->
              <div class="form-field-group form-field-group--full" id="group-description">
                <div class="form-label-row">
                  <label for="field-description" class="form-label">
                    Project Description & Requirements <span class="form-required-mark" aria-hidden="true">*</span>
                  </label>
                  <span class="form-char-count" id="char-count-description">0 / 2000</span>
                </div>
                <textarea 
                  id="field-description" 
                  name="description" 
                  class="form-textarea" 
                  rows="5" 
                  placeholder="Describe your software objectives, current technical stack, key user personas, and target deliverables..."
                  required
                  aria-required="true"
                  aria-describedby="error-description"
                  maxlength="2000"
                ></textarea>
                <span class="form-error-msg" id="error-description" role="alert" aria-live="polite"></span>
              </div>

              <!-- Consent Checkbox (Required) -->
              <div class="form-field-group form-field-group--full" id="group-consent">
                <label class="form-checkbox-label" for="field-consent">
                  <input 
                    type="checkbox" 
                    id="field-consent" 
                    name="consent" 
                    class="form-checkbox" 
                    required 
                    aria-required="true"
                    aria-describedby="error-consent"
                  />
                  <span class="form-checkbox-custom" aria-hidden="true"></span>
                  <span class="form-checkbox-text">
                    I acknowledge that the provided project inquiry details will be reviewed for technical feasibility and scope estimation.
                  </span>
                </label>
                <span class="form-error-msg" id="error-consent" role="alert" aria-live="polite"></span>
              </div>
            </div>

            <!-- Form Action Buttons -->
            <div class="form-actions-row">
              <button 
                type="submit" 
                class="cta-button form-submit-btn" 
                id="contact-submit-btn"
              >
                <span class="btn-spinner" aria-hidden="true"></span>
                <span class="btn-label">Submit Inquiry</span>
                <span class="cta-arrow" aria-hidden="true">→</span>
              </button>

              <div class="form-security-note">
                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="security-lock-icon" aria-hidden="true">
                  <rect x="3" y="6" width="10" height="8" rx="2" stroke="#FEEFB8" stroke-width="1.2"/>
                  <path d="M5 6V4.5C5 2.8 6.3 1.5 8 1.5C9.7 1.5 11 2.8 11 4.5V6" stroke="#FEEFB8" stroke-width="1.2"/>
                </svg>
                <span>Direct review by technical team. Client-side validated.</span>
              </div>
            </div>
          </form>

          <!-- Dynamic Result Feedback Container (Initial Empty) -->
          <div id="contact-feedback-container" aria-live="polite" class="contact-feedback-container" style="display: none;"></div>
        </div>
      </div>
    </section>
  `;
}

/**
 * Validates email format according to standard RFC pattern
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return re.test(email.trim());
}
