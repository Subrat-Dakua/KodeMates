/**
 * ContactInfo Component
 * Step 03: Inquiry Channels, Configurable Details, and Verified Information Policy.
 */

import { CONTACT_CONFIG } from './ContactConfig.js';

export function createContactInfo() {
  const channelCards = CONTACT_CONFIG.channels.map((ch) => `
    <div class="contact-channel-card" id="channel-${ch.id}">
      <div class="contact-channel-card__header">
        <span class="contact-channel-badge">${ch.badge}</span>
      </div>
      <h3 class="contact-channel-title">${ch.title}</h3>
      <p class="contact-channel-desc">${ch.description}</p>
      <a href="${ch.actionHref}" class="contact-channel-link">
        <span>${ch.actionLabel}</span>
        <span class="cta-arrow" aria-hidden="true">→</span>
      </a>
    </div>
  `).join('');

  return `
    <section class="contact-info-section" aria-label="Inquiry Channels">
      <div class="contact-info__container">
        <div class="contact-section-heading">
          <span class="contact-section-eyebrow">CHANNELS & COMMUNICATION</span>
          <h2 class="contact-section-title">How to Reach the Team</h2>
          <p class="contact-section-sub">
            Direct your project inquiry through the appropriate channel to ensure immediate routing to the relevant technical lead.
          </p>
        </div>

        <div class="contact-channels-grid">
          ${channelCards}
        </div>

        <!-- Response Policy & Project Lead Configuration Callout -->
        <div class="contact-policy-card">
          <div class="contact-policy-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="9" stroke="#FEEFB8" stroke-width="1.6"/>
              <path d="M12 7V12L15 15" stroke="#FEEFB8" stroke-width="1.6" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="contact-policy-content">
            <h4 class="contact-policy-title">Response & Scoping Cadence</h4>
            <p class="contact-policy-text">
              ${CONTACT_CONFIG.responsePolicy.notice}
            </p>
            <div class="contact-policy-lead-note" role="note">
              <span class="lead-note-badge">PROJECT LEAD NOTICE</span>
              <span class="lead-note-text">
                Direct phone numbers, office locations, and guaranteed response SLAs will be populated here once officially approved by the team.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
