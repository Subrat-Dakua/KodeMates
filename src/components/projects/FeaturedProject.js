import { getProjectInitials } from './ProjectCard.js';

/**
 * Creates the HTML markup for an individual featured project card
 * Follows an editorial, widescreen layout for elevated visual hierarchy
 *
 * @param {object} project - Project data schema object
 * @returns {string} HTML markup string
 */
export function createFeaturedProjectCard(project = {}) {
  const {
    slug = '',
    title = '',
    category = '',
    tagline = '',
    shortDescription = '',
    technologies = [],
    services = [],
    screenshots = [],
    links = {}
  } = project;

  const description = (shortDescription || tagline || '').trim();
  const initials = getProjectInitials(title);

  // Visual presentation: real verified screenshot or polished abstract fallback
  const hasScreenshot = Array.isArray(screenshots) && screenshots.length > 0 && Boolean(screenshots[0]);
  const visualMarkup = hasScreenshot
    ? `<img src="${screenshots[0]}" alt="${title} featured project preview" class="featured-project__image" loading="lazy" decoding="async" />`
    : `
      <div class="featured-project__visual-fallback" aria-hidden="true">
        <div class="featured-project__fallback-grid"></div>
        <div class="featured-project__fallback-glow"></div>
        <div class="featured-project__fallback-center">
          <div class="featured-project__fallback-badge">
            <span class="featured-project__fallback-monogram">${initials}</span>
          </div>
          <span class="featured-project__fallback-title">${title}</span>
        </div>
        <div class="featured-project__fallback-footer">
          <span class="featured-project__fallback-code">REF // ${slug.toUpperCase()}</span>
          ${category ? `<span class="featured-project__fallback-cat">${category}</span>` : ''}
        </div>
      </div>
    `;

  // Category badge (conditional)
  const categoryMarkup = category
    ? `<span class="featured-project__category">${category}</span>`
    : '';

  // Description (conditional)
  const descriptionMarkup = description
    ? `<p class="featured-project__description">${description}</p>`
    : '';

  // Technologies (conditional)
  const techMarkup = Array.isArray(technologies) && technologies.length > 0
    ? `
      <ul class="featured-project__tech-list" aria-label="Technologies used">
        ${technologies.map((t) => `<li class="featured-project__tech-item">${t}</li>`).join('')}
      </ul>
    `
    : '';

  // Services (conditional)
  const servicesMarkup = Array.isArray(services) && services.length > 0
    ? `
      <ul class="featured-project__services-list" aria-label="Services provided">
        ${services.map((s) => `<li class="featured-project__service-item">${s}</li>`).join('')}
      </ul>
    `
    : '';

  // Secondary external links (conditional)
  let secondaryLinkMarkup = '';
  if (links && links.live) {
    secondaryLinkMarkup = `
      <a href="${links.live}" target="_blank" rel="noopener noreferrer" class="featured-project__secondary-link" aria-label="Visit ${title} live website (opens in new tab)">
        <span>Live Site</span>
        <svg class="featured-project__external-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M3.5 1.5H10.5V8.5M10.5 1.5L1.5 10.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
    `;
  } else if (links && links.repository) {
    secondaryLinkMarkup = `
      <a href="${links.repository}" target="_blank" rel="noopener noreferrer" class="featured-project__secondary-link" aria-label="View ${title} repository (opens in new tab)">
        <span>Repository</span>
        <svg class="featured-project__external-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M3.5 1.5H10.5V8.5M10.5 1.5L1.5 10.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
    `;
  }

  return `
    <article class="featured-project" data-project-slug="${slug}">
      <div class="featured-project__visual">
        ${visualMarkup}
      </div>

      <div class="featured-project__content">
        <div class="featured-project__header">
          <span class="featured-project__eyebrow-tag">FEATURED SYSTEM</span>
          ${categoryMarkup}
        </div>

        <h3 class="featured-project__title">${title}</h3>

        ${descriptionMarkup}
        ${servicesMarkup}
        ${techMarkup}

        <div class="featured-project__actions">
          <a href="/projects/${slug}" class="featured-project__link" aria-label="Explore ${title} Case Study">
            <span class="featured-project__link-text">Explore Case Study</span>
            <svg class="featured-project__link-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3.333 8h9.334M8.667 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
          ${secondaryLinkMarkup}
        </div>
      </div>
    </article>
  `;
}

/**
 * FeaturedProject Component (Phase 06)
 * Generates the Featured Projects section markup.
 * Gracefully handles 0, 1, or multiple featured projects.
 *
 * @param {Array<object>} featuredProjects - Array of featured project objects
 * @returns {string} HTML markup string or empty string if no featured projects
 */
export function createFeaturedSection(featuredProjects = []) {
  if (!Array.isArray(featuredProjects) || featuredProjects.length === 0) {
    return '';
  }

  const sectionTitle = featuredProjects.length === 1 ? 'Featured Project' : 'Featured Projects';
  const cardsMarkup = featuredProjects.map((p) => createFeaturedProjectCard(p)).join('');

  return `
    <section class="featured-projects-section" aria-labelledby="featured-section-heading">
      <div class="featured-projects__container">
        <div class="featured-projects__section-header">
          <span class="featured-projects__section-label">SPOTLIGHT</span>
          <h2 class="featured-projects__section-title" id="featured-section-heading">${sectionTitle}</h2>
        </div>

        <div class="featured-projects__collection ${featuredProjects.length > 1 ? 'featured-projects__collection--multi' : ''}">
          ${cardsMarkup}
        </div>
      </div>
    </section>
  `;
}

export default createFeaturedSection;
