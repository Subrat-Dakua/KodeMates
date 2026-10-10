/**
 * ContactFAQ Component
 * Step 05: Frequently Asked Questions accordions with keyboard accessibility,
 * cross-links to Services and Blog, and final service advisory CTA.
 */

export function createContactFAQ() {
  const faqs = [
    {
      id: 'faq-nda',
      question: 'Do you execute Non-Disclosure Agreements (NDAs) prior to discovery?',
      answer: 'Yes. We routinely sign standard bilateral NDAs before reviewing proprietary workflows, proprietary algorithms, or sensitive enterprise data structures.'
    },
    {
      id: 'faq-specs',
      question: 'What level of technical specification do I need before contacting you?',
      answer: 'A high-level overview of your business problem, desired user flows, and target deliverables is sufficient. Our engineers assist in formalizing wireframes, data models, and API contracts during the discovery phase.'
    },
    {
      id: 'faq-ip',
      question: 'Who retains intellectual property rights and codebase ownership?',
      answer: 'You retain 100% full intellectual property ownership of all custom software, design assets, database schemas, and documentation created upon completion of project milestones.'
    },
    {
      id: 'faq-collaboration',
      question: 'Can KodMates collaborate with an existing in-house engineering team?',
      answer: 'Yes. We frequently embed with existing technical teams to build specialized modules (such as Android client apps, high-throughput backend APIs, or database refactoring) using your established git workflows and CI/CD pipelines.'
    },
    {
      id: 'faq-timelines',
      question: 'What is a typical timeline for custom software systems?',
      answer: 'Focused MVPs and targeted micro-systems typically deploy within 4 to 8 weeks. Comprehensive business automation platforms or multi-platform systems typically follow 3 to 6-month milestone releases.'
    }
  ];

  const faqItemsMarkup = faqs.map((faq, idx) => `
    <div class="faq-item" id="${faq.id}">
      <button 
        type="button" 
        class="faq-trigger" 
        id="trigger-${faq.id}" 
        aria-expanded="${idx === 0 ? 'true' : 'false'}" 
        aria-controls="panel-${faq.id}"
      >
        <span class="faq-question">${faq.question}</span>
        <span class="faq-chevron" aria-hidden="true">+</span>
      </button>
      <div 
        id="panel-${faq.id}" 
        class="faq-panel ${idx === 0 ? 'is-open' : ''}" 
        role="region" 
        aria-labelledby="trigger-${faq.id}"
      >
        <div class="faq-panel__content">
          <p>${faq.answer}</p>
        </div>
      </div>
    </div>
  `).join('');

  return `
    <section class="contact-faq-section" aria-label="Frequently Asked Questions">
      <div class="contact-faq__container">
        <div class="contact-section-heading">
          <span class="contact-section-eyebrow">CLEAR ANSWERS</span>
          <h2 class="contact-section-title">Frequently Asked Questions</h2>
          <p class="contact-section-sub">
            Common questions regarding engagement models, codebase ownership, and project collaboration.
          </p>
        </div>

        <div class="faq-accordion" id="contact-faq-accordion">
          ${faqItemsMarkup}
        </div>

        <!-- Cross-Links to Services and Blog (Step 05 Requirement) -->
        <div class="contact-resource-cards">
          <div class="contact-resource-card">
            <span class="contact-resource-eyebrow">SERVICE CATALOG</span>
            <h3 class="contact-resource-title">Explore Core Capabilities</h3>
            <p class="contact-resource-desc">
              Review full details on our web development, native Android apps, cloud architecture, and database consulting services.
            </p>
            <a href="#services" class="contact-resource-link" id="link-to-services">
              <span>View Services Overview</span>
              <span class="cta-arrow" aria-hidden="true">→</span>
            </a>
          </div>

          <div class="contact-resource-card">
            <span class="contact-resource-eyebrow">ENGINEERING INSIGHTS</span>
            <h3 class="contact-resource-title">Read Architecture Deep Dives</h3>
            <p class="contact-resource-desc">
              Understand our technical philosophy through practical articles on web application scoping, RESTful APIs, and database design.
            </p>
            <a href="/blog" class="contact-resource-link" id="link-to-blog">
              <span>Browse Blog Articles</span>
              <span class="cta-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <!-- Final Consultation Advisory CTA (Step 05 Requirement) -->
        <div class="contact-final-cta-card">
          <div class="contact-final-cta__text">
            <span class="contact-final-cta__eyebrow">TECHNICAL GUIDANCE</span>
            <h3 class="contact-final-cta__title">Need Help Choosing the Right Architecture?</h3>
            <p class="contact-final-cta__desc">
              If you are unsure whether your project requires a custom web application, native mobile app, or backend microservices, talk with our systems engineers.
            </p>
          </div>
          <div class="contact-final-cta__action">
            <a href="#contact-form-section" class="cta-button" id="final-cta-request">
              <span>Request Technical Advice</span>
              <span class="cta-arrow" aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  `;
}
