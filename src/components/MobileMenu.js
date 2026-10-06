import { NAV_ITEMS } from './Navigation.js';

/**
 * Kodmates Mobile Menu & Drawer Component
 * Includes accessible toggle button and slide/fade drawer.
 */
export function createMobileMenu({ activePage = 'Home' } = {}) {
  const normalizedActive = activePage.toLowerCase();

  const navLinks = NAV_ITEMS.map((item) => {
    const isActive = item.id === normalizedActive || item.label.toLowerCase() === normalizedActive;
    const activeClass = isActive ? 'mobile-nav-link is-active' : 'mobile-nav-link';
    const ariaCurrent = isActive ? 'aria-current="page"' : '';

    return `
      <li class="mobile-nav-item">
        <a href="${item.href}" class="${activeClass}" ${ariaCurrent} data-mobile-nav-id="${item.id}">
          ${item.label}
        </a>
      </li>
    `;
  }).join('');

  const toggleButtonHtml = `
    <button 
      type="button" 
      class="mobile-toggle" 
      id="mobile-nav-toggle" 
      aria-label="Toggle navigation menu" 
      aria-expanded="false" 
      aria-controls="mobile-nav-drawer"
    >
      <span class="hamburger-icon" aria-hidden="true">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </span>
    </button>
  `;

  const drawerHtml = `
    <div 
      class="mobile-drawer" 
      id="mobile-nav-drawer" 
      role="dialog" 
      aria-modal="true" 
      aria-label="Mobile Navigation"
    >
      <ul class="mobile-nav-list">
        ${navLinks}
      </ul>
      <div class="mobile-cta-wrapper">
        <a href="#contact" class="cta-button mobile-cta-button" id="mobile-cta-btn">
          <span>Start a Project</span>
          <span class="cta-arrow" aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  `;

  return {
    toggleButtonHtml,
    drawerHtml,
  };
}
