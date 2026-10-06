import { createCapabilityRow } from './CapabilityRow.js';

/**
 * Kodmates Homepage Hero Component
 * Assembles Left typography/actions, Right 3D software ecosystem, and bottom capability indicators.
 * Implements code-splitting and dynamic import for Three.js to guarantee immediate text render.
 */
export class Hero {
  constructor(options = {}) {
    this.target = options.target || document.getElementById('main-content');
    this.heroEl = null;
    this.ecosystem3D = null;
  }

  renderHTML() {
    const capabilityRowHtml = createCapabilityRow();

    return `
      <section class="hero-section" id="hero" aria-label="Kodmates Hero">
        <!-- Subtle dark landscape horizon & ambient warm atmospheric illumination -->
        <div class="hero-ambient-glow" aria-hidden="true"></div>
        <div class="hero-ambient-landscape" aria-hidden="true">
          <img src="/assets/hero-bg-landscape.jpg" alt="" class="hero-landscape-img" loading="eager" />
        </div>

        <div class="hero-container">
          <div class="hero-main-grid">
            <!-- Left Column: Typography & CTAs (~46%) -->
            <div class="hero-content-col">
              <div class="hero-eyebrow">
                DIGITAL SYSTEMS • WEB • MOBILE • SOFTWARE
              </div>

              <h1 class="hero-title">
                Software Built Around <span class="hero-title-accent">Your Business.</span>
              </h1>

              <p class="hero-description">
                We design and develop software, web applications, Android apps and business systems that solve real operational problems.
              </p>

              <div class="hero-actions">
                <a href="#contact" class="cta-button hero-cta-primary" id="hero-primary-cta">
                  <span>Start a Project</span>
                  <span class="cta-arrow" aria-hidden="true">→</span>
                </a>

                <a href="#projects" class="hero-cta-secondary" id="hero-secondary-cta">
                  <span>View Our Work</span>
                </a>
              </div>
            </div>

            <!-- Right Column: Interactive 3D Software Ecosystem (~54%) -->
            <div class="hero-visual-col">
              <div class="hero-3d-wrapper" id="hero-3d-wrapper">
                <!-- Static Fallback (active on slow connections, reduced motion, or WebGL absence) -->
                <div class="hero-fallback" id="hero-fallback">
                  <img 
                    src="/assets/hero-fallback.jpg" 
                    alt="Kodmates Interactive Software Ecosystem" 
                    class="hero-fallback-img"
                    width="620" 
                    height="620" 
                    loading="eager" 
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom Capability Row -->
          ${capabilityRowHtml}
        </div>
      </section>
    `;
  }

  mount(container = null) {
    const parent = container || this.target;
    if (!parent) return null;

    const existing = document.getElementById('hero');
    if (existing) {
      this.heroEl = existing;
    } else {
      const temp = document.createElement('div');
      temp.innerHTML = this.renderHTML().trim();
      this.heroEl = temp.firstElementChild;
      parent.appendChild(this.heroEl);
    }

    this.init3D();
    return this.heroEl;
  }

  async init3D() {
    const wrapper = this.heroEl.querySelector('#hero-3d-wrapper');
    const fallback = this.heroEl.querySelector('#hero-fallback');

    if (wrapper) {
      try {
        // Dynamic import / lazy-loading so Three.js does not block critical HTML text
        const { HeroEcosystem3D } = await import('./HeroEcosystem3D.js');
        this.ecosystem3D = new HeroEcosystem3D({
          container: wrapper,
          fallbackEl: fallback
        });
        this.ecosystem3D.init();
      } catch (err) {
        console.warn('Failed to load 3D module, displaying static fallback:', err);
        if (fallback) fallback.style.display = 'block';
      }
    }
  }

  destroy() {
    if (this.ecosystem3D) {
      this.ecosystem3D.destroy();
    }
    if (this.heroEl && this.heroEl.parentNode) {
      this.heroEl.parentNode.removeChild(this.heroEl);
    }
  }
}

export function initHero(options = {}) {
  const hero = new Hero(options);
  hero.mount();
  return hero;
}
