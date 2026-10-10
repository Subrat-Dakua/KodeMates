import servicesData from '../data/services.js';
import { updateServicesSEO } from '../components/services/ServicesSEO.js';

/**
 * Inline SVG Icon Provider for Services Visuals
 * Matches the warm champagne/gold (#FEEFB8) brand palette.
 */
function getServiceIconSvg(iconName) {
  switch (iconName) {
    case 'web':
      return `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="2.5" y="4" width="19" height="15" rx="3" stroke="currentColor" stroke-width="1.6"/>
          <path d="M2.5 9H21.5" stroke="currentColor" stroke-width="1.4" stroke-opacity="0.6"/>
          <circle cx="6" cy="6.5" r="1" fill="currentColor"/>
          <circle cx="9" cy="6.5" r="1" fill="currentColor" fill-opacity="0.6"/>
          <circle cx="12" cy="6.5" r="1" fill="currentColor" fill-opacity="0.3"/>
          <path d="M6 13H11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
          <path d="M6 16H14" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-opacity="0.7"/>
        </svg>
      `;
    case 'mobile':
      return `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="6" y="3" width="12" height="18" rx="2.5" stroke="currentColor" stroke-width="1.6"/>
          <path d="M10 6H14" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-opacity="0.7"/>
          <circle cx="12" cy="18" r="1" fill="currentColor"/>
          <path d="M9 10L15 10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-opacity="0.5"/>
          <path d="M9 13L13 13" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-opacity="0.5"/>
        </svg>
      `;
    case 'design':
      return `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="3.5" y="3.5" width="17" height="17" rx="3" stroke="currentColor" stroke-width="1.6"/>
          <path d="M3.5 10.5H20.5" stroke="currentColor" stroke-width="1.4" stroke-opacity="0.6"/>
          <path d="M10.5 10.5V20.5" stroke="currentColor" stroke-width="1.4" stroke-opacity="0.6"/>
          <circle cx="7" cy="7" r="1" fill="currentColor"/>
          <circle cx="10" cy="7" r="1" fill="currentColor" fill-opacity="0.6"/>
        </svg>
      `;
    case 'backend':
      return `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M6 6C6 4.89543 6.89543 4 8 4H16C17.1046 4 18 4.89543 18 6V8C18 9.10457 17.1046 10 16 10H8C6.89543 10 6 9.10457 6 8V6Z" stroke="currentColor" stroke-width="1.5"/>
          <path d="M6 16C6 14.8954 6.89543 14 8 14H16C17.1046 14 18 14.8954 18 16V18C18 19.1046 17.1046 20 16 20H8C6.89543 20 6 19.1046 6 18V16Z" stroke="currentColor" stroke-width="1.5"/>
          <path d="M12 10V14" stroke="currentColor" stroke-width="1.5"/>
          <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
          <path d="M3 8L6 8M18 8L21 8M3 16L6 16M18 16L21 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      `;
    case 'cloud':
      return `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M17.5 19H6.5C4.01472 19 2 16.9853 2 14.5C2 12.1564 3.79151 10.2313 6.07999 10.0243C6.56271 6.64165 9.47506 4 13 4C16.9765 4 20.2199 7.11327 20.4795 11.0421C21.9422 11.6441 23 13.0645 23 14.75C23 17.0972 21.0972 19 18.75 19H17.5Z" stroke="currentColor" stroke-width="1.5"/>
          <path d="M12 12V16M12 16L10 14M12 16L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
    case 'automation':
      return `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.6"/>
          <path d="M19.4 15A7.97 7.97 0 0 0 20 12c0-.68-.09-1.35-.25-2l-2.05-.33a5.95 5.95 0 0 0-.8-1.92l1.24-1.68a8.03 8.03 0 0 0-2.83-2.83l-1.68 1.24a5.95 5.95 0 0 0-1.92-.8L11.38 1.6A8.04 8.04 0 0 0 8.6 1.6l-.33 2.05a5.95 5.95 0 0 0-1.92.8L4.67 3.21a8.03 8.03 0 0 0-2.83 2.83l1.24 1.68a5.95 5.95 0 0 0-.8 1.92L0.23 10c-.16.65-.25 1.32-.25 2s.09 1.35.25 2l2.05.33a5.95 5.95 0 0 0 .8 1.92l-1.24 1.68a8.03 8.03 0 0 0 2.83 2.83l1.68-1.24a5.95 5.95 0 0 0 1.92.8l.33 2.05c.65.16 1.32.25 2 .25s1.35-.09 2-.25l.33-2.05a5.95 5.95 0 0 0 1.92-.8l1.68 1.24a8.03 8.03 0 0 0 2.83-2.83l-1.24-1.68a5.95 5.95 0 0 0 .8-1.92l2.05-.33Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
        </svg>
      `;
    default:
      return `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/>
          <path d="M12 8V12L15 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      `;
  }
}

/**
 * Streamlined ServicesPage Component
 * Compact 8-section layout with interactive expandable service cards.
 */
export class ServicesPage {
  constructor(options = {}) {
    this.target = options.target || document.getElementById('main-content');
    this.pageEl = null;
    this._cardExpandButtons = [];
    this._faqButtons = [];
    this._anchorLinks = [];
    this._handleCardToggle = this._handleCardToggle.bind(this);
    this._handleFaqClick = this._handleFaqClick.bind(this);
    this._handleFaqKeyDown = this._handleFaqKeyDown.bind(this);
    this._handleAnchorClick = this._handleAnchorClick.bind(this);
  }

  /**
   * Generates the semantic HTML for all 8 consolidated sections of the Services Page.
   */
  renderHTML() {
    const { hero, coreServices, technologies, process, whyChooseUs, featuredCaseStudies, faqs, finalCta } = servicesData;

    // SECTION 1: Compact Hero
    const heroMarkup = `
      <section class="services-hero" aria-labelledby="services-hero-headline">
        <div class="services-container">
          <div class="services-hero__grid">
            <div class="services-hero__content">
              <span class="services-eyebrow">
                <span class="services-hero__status-dot" aria-hidden="true"></span>
                ${hero.eyebrow}
              </span>
              <h1 class="services-hero__title" id="services-hero-headline">
                Technology Built Around <span class="services-hero__title-accent">Your Business.</span>
              </h1>
              <p class="services-hero__copy">
                ${hero.supportingCopy}
              </p>
              <div class="services-hero__actions">
                <a href="${hero.primaryCta.href}" class="services-btn-primary services-anchor-link">
                  <span>${hero.primaryCta.label}</span>
                  <span aria-hidden="true">→</span>
                </a>
                <a href="${hero.secondaryCta.href}" class="services-btn-secondary services-anchor-link">
                  <span>${hero.secondaryCta.label}</span>
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>

            <div class="services-hero__visual" aria-hidden="true">
              <div class="services-hero__art-card">
                <div class="services-hero__blueprint-header">
                  <span class="services-hero__blueprint-tag">SYSTEM TOPOLOGY // ARCHITECTURE</span>
                  <div class="services-hero__blueprint-status">
                    <span class="services-hero__status-dot"></span>
                    <span>ACTIVE STACK</span>
                  </div>
                </div>
                <div class="services-hero__diagram-nodes">
                  <div class="services-hero__node">
                    <div class="services-hero__node-title">
                      <span>⚡</span>
                      <span>Frontend Tier</span>
                    </div>
                    <div class="services-hero__node-desc">React, ESNext & Responsive Systems</div>
                  </div>
                  <div class="services-hero__node">
                    <div class="services-hero__node-title">
                      <span>📱</span>
                      <span>Mobile Native</span>
                    </div>
                    <div class="services-hero__node-desc">Kotlin, CameraX & Offline Sync</div>
                  </div>
                  <div class="services-hero__node">
                    <div class="services-hero__node-title">
                      <span>🛡️</span>
                      <span>Backend APIs</span>
                    </div>
                    <div class="services-hero__node-desc">Laravel 11, Node.js & Sanctum Auth</div>
                  </div>
                  <div class="services-hero__node">
                    <div class="services-hero__node-title">
                      <span>☁️</span>
                      <span>Cloud & Queues</span>
                    </div>
                    <div class="services-hero__node-desc">Redis, BullMQ & Docker Containers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    // SECTION 2: Core Service Offerings (Expandable Cards Grid)
    const serviceCardsMarkup = coreServices
      .map(
        (card) => `
        <article class="services-card" id="card-${card.id}" aria-labelledby="card-title-${card.id}">
          <div class="services-card__top">
            <div class="services-card__icon-box">
              ${getServiceIconSvg(card.icon)}
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="services-card__number">${card.number}</span>
              <span class="services-card__badge">${card.badge}</span>
            </div>
          </div>
          <h3 class="services-card__title" id="card-title-${card.id}">${card.title}</h3>
          <p class="services-card__description">${card.shortDescription}</p>
          
          <ul class="services-card__capabilities-list" aria-label="${card.title} key highlights">
            ${card.keyCapabilities
              .map(
                (cap) => `
              <li class="services-card__capability-item">
                <span class="services-card__capability-bullet" aria-hidden="true"></span>
                <span>${cap}</span>
              </li>
            `
              )
              .join('')}
          </ul>

          <div class="services-card__footer">
            <button
              type="button"
              class="services-card__expand-btn"
              id="service-trigger-${card.id}"
              aria-expanded="false"
              aria-controls="service-details-${card.id}"
              data-service-id="${card.id}"
            >
              <span class="services-card__expand-btn-text">View Details</span>
              <span class="services-card__expand-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </button>
          </div>

          <!-- Expandable Detail Drawer -->
          <div
            class="services-card__drawer"
            id="service-details-${card.id}"
            role="region"
            aria-labelledby="service-trigger-${card.id}"
          >
            <div class="services-card__drawer-inner">
              <div class="services-card__drawer-content">
                <div class="services-card__detail-block">
                  <div class="services-card__detail-label">THE PROBLEM ADDRESSED</div>
                  <p class="services-card__problem-text">${card.expandedDetails.problem}</p>
                </div>

                <div class="services-card__detail-block">
                  <div class="services-card__detail-label">WHAT WE DELIVER</div>
                  <ul class="services-card__deliverables-list">
                    ${card.expandedDetails.deliverables
                      .map(
                        (d) => `
                      <li class="services-card__deliverable-item">
                        <span class="services-card__deliverable-check" aria-hidden="true">✓</span>
                        <span>${d}</span>
                      </li>
                    `
                      )
                      .join('')}
                  </ul>
                </div>

                <div class="services-card__detail-block">
                  <div class="services-card__detail-label">TECHNOLOGY & STACK</div>
                  <div class="services-card__tech-pills">
                    ${card.expandedDetails.technologies
                      .map(
                        (t) => `
                      <span class="services-card__tech-pill">${t}</span>
                    `
                      )
                      .join('')}
                  </div>
                </div>

                <div class="services-card__outcome-box">
                  <div style="font-size: 10px; font-weight: 700; letter-spacing: 0.1em; color: var(--km-accent-primary, #FEEFB8); margin-bottom: 4px; text-transform: uppercase;">
                    EXPECTED OUTCOME
                  </div>
                  <div>${card.expandedDetails.outcomes}</div>
                </div>

                <a href="#contact" class="services-card__drawer-cta services-anchor-link">
                  <span>${card.expandedDetails.ctaLabel}</span>
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </article>
      `
      )
      .join('');

    const offeringsSectionMarkup = `
      <section class="services-offerings-section" id="services-offerings" aria-labelledby="services-offerings-heading">
        <div class="services-container">
          <div class="services-section-header services-section-header--center">
            <span class="services-eyebrow">CORE CAPABILITIES</span>
            <h2 class="services-section-title" id="services-offerings-heading">Core Service Offerings</h2>
            <p class="services-section-subtitle">
              Comprehensive software engineering tailored to modern business requirements. Click any service card to inspect technical deliverables and architecture details.
            </p>
          </div>
          <div class="services-cards-grid">
            ${serviceCardsMarkup}
          </div>
        </div>
      </section>
    `;

    // SECTION 3: Technology & Capabilities (Grouped Grid)
    const techCardsMarkup = technologies
      .map(
        (cat) => `
        <div class="services-tech__card">
          <h3 class="services-tech__category">
            <span class="services-tech__category-dot" aria-hidden="true"></span>
            ${cat.category}
          </h3>
          <div class="services-tech__tags">
            ${cat.items
              .map(
                (item) => `
              <span class="services-tech__tag">${item}</span>
            `
              )
              .join('')}
          </div>
        </div>
      `
      )
      .join('');

    const techSectionMarkup = `
      <section class="services-tech-section" aria-labelledby="services-tech-heading">
        <div class="services-container">
          <div class="services-section-header services-section-header--center">
            <span class="services-eyebrow">ENGINEERING STACK</span>
            <h2 class="services-section-title" id="services-tech-heading">Technology & Capabilities</h2>
            <p class="services-section-subtitle">
              Organized into battle-tested categories. We select the most resilient, modern tools tailored to each system requirement.
            </p>
          </div>
          <div class="services-tech__grid">
            ${techCardsMarkup}
          </div>
        </div>
      </section>
    `;

    // SECTION 4: Seven-Stage Engineering Lifecycle
    const processStepsMarkup = process
      .map(
        (st) => `
        <div class="services-process__step-card">
          <div class="services-process__step-number">STAGE // ${st.step}</div>
          <h3 class="services-process__step-title">${st.title}</h3>
          <p class="services-process__step-desc">${st.description}</p>
        </div>
      `
      )
      .join('');

    const processSectionMarkup = `
      <section class="services-process-section" id="process" aria-labelledby="services-process-heading">
        <div class="services-container">
          <div class="services-section-header services-section-header--center">
            <span class="services-eyebrow">HOW WE WORK</span>
            <h2 class="services-section-title" id="services-process-heading">Seven-Stage Engineering Lifecycle</h2>
            <p class="services-section-subtitle">
              A disciplined, transparent delivery framework that eliminates guesswork from discovery through post-launch continuity.
            </p>
          </div>
          <div class="services-process__timeline">
            ${processStepsMarkup}
          </div>
          <p class="services-process__notice">
            * Note: Ongoing support, monitoring, and enhancement retainers depend upon the agreed engagement scope. Project delivery timelines are calculated strictly against technical architecture specifications during Planning.
          </p>
        </div>
      </section>
    `;

    // SECTION 5: Why Choose KodMates (3 Concise Cards)
    const whyCardsMarkup = whyChooseUs
      .map(
        (why) => `
        <div class="services-why__card">
          <div class="services-why__number">${why.number} // PRINCIPLE</div>
          <h3 class="services-why__title">${why.title}</h3>
          <p class="services-why__desc">${why.description}</p>
        </div>
      `
      )
      .join('');

    const whySectionMarkup = `
      <section class="services-why-section" aria-labelledby="services-why-heading">
        <div class="services-container">
          <div class="services-section-header services-section-header--center">
            <span class="services-eyebrow">OUR COMMITMENT</span>
            <h2 class="services-section-title" id="services-why-heading">Why Choose KodMates</h2>
            <p class="services-section-subtitle">
              Ground-level principles guiding every architectural decision, line of code, and client interaction.
            </p>
          </div>
          <div class="services-why__grid">
            ${whyCardsMarkup}
          </div>
        </div>
      </section>
    `;

    // SECTION 6: Proven Execution in Production (Featured Case Studies)
    const featuredCardsMarkup = featuredCaseStudies
      .map(
        (proj) => `
        <a href="${proj.route}" class="services-featured__card" aria-label="View case study for ${proj.title}">
          <span class="services-featured__category">${proj.category}</span>
          <h3 class="services-featured__title">${proj.title}</h3>
          <div class="services-featured__tagline">${proj.tagline}</div>
          <p class="services-featured__desc">${proj.description}</p>
          <div class="services-featured__tech-row">
            ${proj.tech
              .map(
                (t) => `
              <span class="services-featured__tech-tag">${t}</span>
            `
              )
              .join('')}
          </div>
          <div class="services-featured__action">
            <span>Read Case Study</span>
            <span aria-hidden="true">→</span>
          </div>
        </a>
      `
      )
      .join('');

    const featuredSectionMarkup = `
      <section class="services-featured-section" aria-labelledby="services-featured-heading">
        <div class="services-container">
          <div class="services-section-header services-section-header--center">
            <span class="services-eyebrow">VERIFIED WORK</span>
            <h2 class="services-section-title" id="services-featured-heading">Proven Execution in Production</h2>
            <p class="services-section-subtitle">
              Explore real-world software platforms engineered and delivered by the KodMates team.
            </p>
          </div>
          <div class="services-featured__grid">
            ${featuredCardsMarkup}
          </div>
        </div>
      </section>
    `;

    // SECTION 7: Frequently Asked Questions (Compact Accordion)
    const faqsMarkup = faqs
      .map(
        (faq, idx) => `
        <div class="services-faq__item" id="faq-item-${idx}">
          <button
            type="button"
            class="services-faq__trigger"
            id="faq-btn-${idx}"
            aria-expanded="false"
            aria-controls="faq-panel-${idx}"
            data-faq-index="${idx}"
          >
            <span>${faq.question}</span>
            <span class="services-faq__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </button>
          <div
            class="services-faq__panel"
            id="faq-panel-${idx}"
            role="region"
            aria-labelledby="faq-btn-${idx}"
          >
            <div class="services-faq__panel-inner">
              <p class="services-faq__answer">${faq.answer}</p>
            </div>
          </div>
        </div>
      `
      )
      .join('');

    const faqSectionMarkup = `
      <section class="services-faq-section" id="faq" aria-labelledby="services-faq-heading">
        <div class="services-container services-faq__container">
          <div class="services-section-header services-section-header--center">
            <span class="services-eyebrow">COMMON QUESTIONS</span>
            <h2 class="services-section-title" id="services-faq-heading">Frequently Asked Questions</h2>
            <p class="services-section-subtitle">
              Straightforward answers about our engagement workflows, technical approach, timelines, and ongoing support.
            </p>
          </div>
          <div class="services-faq__accordion" role="region" aria-label="Frequently Asked Questions Accordion">
            ${faqsMarkup}
          </div>
        </div>
      </section>
    `;

    // SECTION 8: Final Contact CTA
    const finalCtaMarkup = `
      <section class="services-cta-section" id="contact" aria-labelledby="services-cta-headline">
        <div class="services-container">
          <div class="services-cta__banner">
            <span class="services-eyebrow" style="margin-bottom: 10px;">LET’S COLLABORATE</span>
            <h2 class="services-cta__headline" id="services-cta-headline">${finalCta.headline}</h2>
            <p class="services-cta__copy">
              ${finalCta.supportingCopy}
            </p>
            <div class="services-cta__actions">
              <a href="${finalCta.primaryCta.href}" class="services-btn-primary services-anchor-link">
                <span>${finalCta.primaryCta.label}</span>
                <span aria-hidden="true">→</span>
              </a>
              <a href="${finalCta.secondaryCta.href}" class="services-btn-secondary services-anchor-link">
                <span>${finalCta.secondaryCta.label}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    `;

    return `
      <div class="services-page" id="services-page">
        ${heroMarkup}
        ${offeringsSectionMarkup}
        ${techSectionMarkup}
        ${processSectionMarkup}
        ${whySectionMarkup}
        ${featuredSectionMarkup}
        ${faqSectionMarkup}
        ${finalCtaMarkup}
      </div>
    `;
  }

  /**
   * Mounts the component into the container element and binds listeners.
   */
  mount(container = null) {
    const parent = container || this.target;
    if (!parent) return null;

    const existing = document.getElementById('services-page');
    if (existing) {
      this.pageEl = existing;
      this.bindEvents();
      return this.pageEl;
    }

    const temp = document.createElement('div');
    temp.innerHTML = this.renderHTML().trim();
    this.pageEl = temp.firstElementChild;
    parent.appendChild(this.pageEl);

    this.bindEvents();
    updateServicesSEO();
    return this.pageEl;
  }

  /**
   * Attaches event listeners for expandable service cards, FAQs, and anchor smooth scrolling.
   */
  bindEvents() {
    if (!this.pageEl) return;

    // 1. Expandable Service Cards
    this._cardExpandButtons = Array.from(this.pageEl.querySelectorAll('.services-card__expand-btn'));
    this._cardExpandButtons.forEach((btn) => {
      btn.addEventListener('click', this._handleCardToggle);
    });

    // 2. FAQ Accordion
    this._faqButtons = Array.from(this.pageEl.querySelectorAll('.services-faq__trigger'));
    this._faqButtons.forEach((btn) => {
      btn.addEventListener('click', this._handleFaqClick);
      btn.addEventListener('keydown', this._handleFaqKeyDown);
    });

    // 3. Anchor Links Smooth Scrolling
    this._anchorLinks = Array.from(this.pageEl.querySelectorAll('.services-anchor-link'));
    this._anchorLinks.forEach((link) => {
      link.addEventListener('click', this._handleAnchorClick);
    });
  }

  /**
   * Toggles the expandable service card details.
   */
  _handleCardToggle(event) {
    const btn = event.currentTarget;
    if (!btn) return;

    const card = btn.closest('.services-card');
    if (!card) return;

    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    const nextState = !isExpanded;

    btn.setAttribute('aria-expanded', String(nextState));
    card.classList.toggle('is-expanded', nextState);

    const btnText = btn.querySelector('.services-card__expand-btn-text');
    if (btnText) {
      btnText.textContent = nextState ? 'Hide Details' : 'View Details';
    }
  }

  /**
   * Toggles the clicked FAQ question accordion state.
   */
  _handleFaqClick(event) {
    const btn = event.currentTarget;
    if (!btn) return;

    const item = btn.closest('.services-faq__item');
    if (!item) return;

    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    const nextState = !isExpanded;

    btn.setAttribute('aria-expanded', String(nextState));
    item.classList.toggle('is-open', nextState);
  }

  /**
   * Accessible keyboard navigation for the FAQ accordion.
   * Supports ArrowUp, ArrowDown, Home, End navigation between questions.
   */
  _handleFaqKeyDown(event) {
    const btn = event.currentTarget;
    const currentIndex = this._faqButtons.indexOf(btn);
    if (currentIndex === -1) return;

    let targetIndex = null;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      targetIndex = (currentIndex + 1) % this._faqButtons.length;
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      targetIndex = (currentIndex - 1 + this._faqButtons.length) % this._faqButtons.length;
    } else if (event.key === 'Home') {
      event.preventDefault();
      targetIndex = 0;
    } else if (event.key === 'End') {
      event.preventDefault();
      targetIndex = this._faqButtons.length - 1;
    }

    if (targetIndex !== null && this._faqButtons[targetIndex]) {
      this._faqButtons[targetIndex].focus();
    }
  }

  /**
   * Smoothly scrolls to on-page anchor targets.
   */
  _handleAnchorClick(event) {
    const link = event.currentTarget;
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    const targetElement = document.querySelector(href);
    if (targetElement) {
      event.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  /**
   * Lifecycle cleanup to prevent memory leaks and dangling listeners.
   */
  destroy() {
    if (this._cardExpandButtons) {
      this._cardExpandButtons.forEach((btn) => {
        btn.removeEventListener('click', this._handleCardToggle);
      });
      this._cardExpandButtons = [];
    }

    if (this._faqButtons) {
      this._faqButtons.forEach((btn) => {
        btn.removeEventListener('click', this._handleFaqClick);
        btn.removeEventListener('keydown', this._handleFaqKeyDown);
      });
      this._faqButtons = [];
    }

    if (this._anchorLinks) {
      this._anchorLinks.forEach((link) => {
        link.removeEventListener('click', this._handleAnchorClick);
      });
      this._anchorLinks = [];
    }

    if (this.pageEl && this.pageEl.parentNode) {
      this.pageEl.parentNode.removeChild(this.pageEl);
    }
    this.pageEl = null;
  }
}

/**
 * Convenience initializer for the Services Page
 */
export function initServicesPage(options = {}) {
  const page = new ServicesPage(options);
  page.mount();
  return page;
}

export default ServicesPage;
