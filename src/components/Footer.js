/**
 * KodMates Shared Footer Component
 * Accessible, beautifully styled site footer matching KodMates dark canvas and gold accents.
 */

import { createLogo } from './Logo.js';

export function createFooterHTML() {
  const logoHtml = createLogo({ withTagline: true });

  return `
    <footer class="site-footer" id="site-footer" aria-label="Site Footer">
      <div class="site-footer__ambient" aria-hidden="true"></div>
      <div class="site-footer__container">
        <div class="site-footer__top">
          <!-- Col 1: Brand & Philosophy -->
          <div class="site-footer__brand-col">
            ${logoHtml}
            <p class="site-footer__tagline-text">
              We engineer software, web applications, Android apps, and business systems designed to solve real operational problems.
            </p>
            <div class="site-footer__status-badge">
              <span class="status-indicator-dot" aria-hidden="true"></span>
              <span>Available for Technical Scoping & Development</span>
            </div>
          </div>

          <!-- Col 2: Navigation Links -->
          <div class="site-footer__nav-col">
            <span class="site-footer__col-heading">NAVIGATION</span>
            <ul class="site-footer__link-list">
              <li><a href="/" data-nav-id="home" class="footer-link">Home</a></li>
              <li><a href="#services" data-nav-id="services" class="footer-link">Services</a></li>
              <li><a href="/projects" data-nav-id="projects" class="footer-link">Projects</a></li>
              <li><a href="/blog" data-nav-id="blog" class="footer-link">Engineering Blog</a></li>
              <li><a href="/contact" data-nav-id="contact" class="footer-link">Contact & Inquiries</a></li>
            </ul>
          </div>

          <!-- Col 3: Capabilities -->
          <div class="site-footer__nav-col">
            <span class="site-footer__col-heading">DISCIPLINES</span>
            <ul class="site-footer__link-list">
              <li><span class="footer-static-item">Web Applications</span></li>
              <li><span class="footer-static-item">Android Development</span></li>
              <li><span class="footer-static-item">Cloud APIs & Backend</span></li>
              <li><span class="footer-static-item">Database Architecture</span></li>
              <li><span class="footer-static-item">Business Automation</span></li>
            </ul>
          </div>

          <!-- Col 4: Quick Action -->
          <div class="site-footer__cta-col">
            <span class="site-footer__col-heading">START A CONVERSATION</span>
            <p class="site-footer__cta-desc">
              Have a digital system or mobile product requirement? Let's discuss architecture and feasibility.
            </p>
            <a href="/contact" class="cta-button footer-cta-btn" id="footer-cta-contact">
              <span>Start a Project</span>
              <span class="cta-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div class="site-footer__bottom">
          <div class="site-footer__copyright">
            © 2026 KodMates. Digital Systems Engineered for the Real World.
          </div>
          <div class="site-footer__meta">
            <span>Built with semantic HTML & modern CSS</span>
          </div>
        </div>
      </div>
    </footer>
  `;
}

export class Footer {
  constructor(options = {}) {
    this.target = options.target || document.getElementById('app') || document.body;
    this.footerEl = null;
  }

  mount() {
    const existing = document.getElementById('site-footer');
    if (existing) {
      this.footerEl = existing;
      return this.footerEl;
    }

    const temp = document.createElement('div');
    temp.innerHTML = createFooterHTML().trim();
    this.footerEl = temp.firstElementChild;
    this.target.appendChild(this.footerEl);
    return this.footerEl;
  }
}

export function initFooter(options = {}) {
  const footer = new Footer(options);
  footer.mount();
  return footer;
}
