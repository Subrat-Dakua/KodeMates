/**
 * BlogHero Component
 * Step 06: Eyebrow: "INSIGHTS & IDEAS", Heading: "Ideas That Move Technology Forward."
 * Matches KodMates cinematic visual language with champagne-gold highlights.
 */

export function createBlogHero() {
  return `
    <section class="blog-hero" aria-label="Blog Header">
      <div class="blog-hero__ambient" aria-hidden="true"></div>
      <div class="blog-hero__container">
        <div class="blog-hero__content">
          <div class="blog-hero__eyebrow">
            <span class="blog-hero__eyebrow-dot"></span>
            INSIGHTS & IDEAS
          </div>
          <h1 class="blog-hero__title">
            Ideas That Move <span class="km-text-gradient">Technology Forward.</span>
          </h1>
          <p class="blog-hero__description">
            Practical guidance, architectural patterns, and engineering lessons learned from building web applications, Android systems, and cloud infrastructure for real business operations.
          </p>
        </div>
        
        <div class="blog-hero__metrics" aria-label="Blog Topics Overview">
          <div class="blog-hero__metric-item">
            <span class="blog-hero__metric-val">100%</span>
            <span class="blog-hero__metric-lbl">Practical Engineering</span>
          </div>
          <div class="blog-hero__metric-item">
            <span class="blog-hero__metric-val">5+</span>
            <span class="blog-hero__metric-lbl">Core Disciplines</span>
          </div>
          <div class="blog-hero__metric-item">
            <span class="blog-hero__metric-val">Zero</span>
            <span class="blog-hero__metric-lbl">Fluff or Filler</span>
          </div>
        </div>
      </div>
    </section>
  `;
}
