/**
 * Kodmates Capability Row Component
 * 5 capability indicators: Web Applications, Android Apps, Business Software, APIs & Backend, SEO & Growth.
 * Clean, subtle warm ivory/gold iconography with dark pill/card containers.
 */

export const CAPABILITY_ITEMS = [
  {
    id: 'web',
    label: 'Web Applications',
    iconSvg: `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="2.5" y="4" width="19" height="15" rx="3" stroke="#FEEFB8" stroke-width="1.6"/>
        <path d="M2.5 9H21.5" stroke="#FEEFB8" stroke-width="1.4" stroke-opacity="0.6"/>
        <circle cx="6" cy="6.5" r="1" fill="#FEEFB8"/>
        <circle cx="9" cy="6.5" r="1" fill="#FEEFB8" fill-opacity="0.6"/>
        <circle cx="12" cy="6.5" r="1" fill="#FEEFB8" fill-opacity="0.3"/>
        <path d="M6 13H11" stroke="#FEEFB8" stroke-width="1.4" stroke-linecap="round"/>
        <path d="M6 16H14" stroke="#FEEFB8" stroke-width="1.4" stroke-linecap="round" stroke-opacity="0.7"/>
      </svg>
    `
  },
  {
    id: 'android',
    label: 'Android Apps',
    iconSvg: `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="5.5" y="3" width="13" height="18" rx="3" stroke="#FEEFB8" stroke-width="1.6"/>
        <path d="M10 6H14" stroke="#FEEFB8" stroke-width="1.4" stroke-linecap="round" stroke-opacity="0.7"/>
        <circle cx="12" cy="18" r="1.1" fill="#FEEFB8"/>
        <path d="M9 10L15 10" stroke="#FEEFB8" stroke-width="1.4" stroke-linecap="round" stroke-opacity="0.5"/>
        <path d="M9 13L13 13" stroke="#FEEFB8" stroke-width="1.4" stroke-linecap="round" stroke-opacity="0.5"/>
      </svg>
    `
  },
  {
    id: 'business',
    label: 'Business Software',
    iconSvg: `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="3" y="3.5" width="8" height="8" rx="2" stroke="#FEEFB8" stroke-width="1.5"/>
        <rect x="13" y="3.5" width="8" height="8" rx="2" stroke="#FEEFB8" stroke-width="1.5"/>
        <rect x="3" y="13.5" width="8" height="8" rx="2" stroke="#FEEFB8" stroke-width="1.5"/>
        <rect x="13" y="13.5" width="8" height="8" rx="2" stroke="#FEEFB8" stroke-width="1.5"/>
        <path d="M7 7.5H7.01M17 7.5H17.01M7 17.5H7.01M17 17.5H17.01" stroke="#FEEFB8" stroke-width="2.5" stroke-linecap="round"/>
      </svg>
    `
  },
  {
    id: 'api',
    label: 'APIs & Backend',
    iconSvg: `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M7 6C7 4.89543 7.89543 4 9 4H15C16.1046 4 17 4.89543 17 6V8C17 9.10457 16.1046 10 15 10H9C7.89543 10 7 9.10457 7 8V6Z" stroke="#FEEFB8" stroke-width="1.5"/>
        <path d="M7 16C7 14.8954 7.89543 14 9 14H15C16.1046 14 17 14.8954 17 16V18C17 19.1046 16.1046 20 15 20H9C7.89543 20 7 19.1046 7 18V16Z" stroke="#FEEFB8" stroke-width="1.5"/>
        <path d="M12 10V14" stroke="#FEEFB8" stroke-width="1.5"/>
        <circle cx="12" cy="12" r="1.5" fill="#FEEFB8"/>
        <path d="M4 8L7 8M17 8L20 8M4 16L7 16M17 16L20 16" stroke="#FEEFB8" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    `
  },
  {
    id: 'growth',
    label: 'SEO & Growth',
    iconSvg: `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M3.5 19.5H20.5" stroke="#FEEFB8" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M6 15.5L10.5 10L14.5 13.5L20 6.5" stroke="#FEEFB8" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16 6.5H20V10.5" stroke="#FEEFB8" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `
  }
];

export function createCapabilityRow() {
  const itemsHtml = CAPABILITY_ITEMS.map((item) => `
    <div class="capability-item" data-capability-id="${item.id}">
      <div class="capability-icon" aria-hidden="true">
        ${item.iconSvg}
      </div>
      <span class="capability-label">${item.label}</span>
    </div>
  `).join('');

  return `
    <div class="hero-capabilities-container" aria-label="Core Capabilities">
      <div class="hero-capabilities-track">
        ${itemsHtml}
      </div>
    </div>
  `;
}
