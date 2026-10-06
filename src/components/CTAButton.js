/**
 * Kodmates CTA Button Component
 * "Start a Project →" in warm-gold #FEEFB8 with near-black text
 */
export function createCTAButton({ 
  label = 'Start a Project', 
  href = '#contact', 
  extraClass = '', 
  id = 'header-cta-btn' 
} = {}) {
  return `
    <div class="header-cta ${extraClass}">
      <a href="${href}" class="cta-button" id="${id}">
        <span>${label}</span>
        <span class="cta-arrow" aria-hidden="true">→</span>
      </a>
    </div>
  `;
}
