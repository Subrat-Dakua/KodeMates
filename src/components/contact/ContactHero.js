/**
 * ContactHero Component
 * Step 02: Eyebrow: "LET'S TALK", Heading: "Let's Build Something Meaningful."
 */

export function createContactHero() {
  return `
    <section class="contact-hero" aria-label="Contact Header">
      <div class="contact-hero__ambient" aria-hidden="true"></div>
      <div class="contact-hero__container">
        <div class="contact-hero__eyebrow">
          <span class="contact-hero__eyebrow-pulse" aria-hidden="true"></span>
          LET'S TALK
        </div>

        <h1 class="contact-hero__title">
          Let's Build Something <span class="km-text-gradient">Meaningful.</span>
        </h1>

        <p class="contact-hero__description">
          Whether you are launching a new digital product, modernizing core business systems, or scaling backend infrastructure, our engineering team is here to understand your requirements and evaluate technical pathways.
        </p>

        <div class="contact-hero__quick-nav">
          <a href="#contact-form-section" class="cta-button contact-hero__cta" id="contact-scroll-to-form">
            <span>Jump to Inquiry Form</span>
            <span class="cta-arrow" aria-hidden="true">↓</span>
          </a>
          <a href="#inquiry-process" class="contact-hero__link">
            <span>How our process works</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  `;
}
