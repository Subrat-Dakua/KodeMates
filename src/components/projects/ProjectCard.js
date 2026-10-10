/**
 * Helper to generate a 2-character monogram for visual fallback
 * @param {string} title 
 * @returns {string}
 */
export function getProjectInitials(title) {
  if (!title) return 'KM';
  const words = title.trim().split(/\s+/);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return title.slice(0, 2).toUpperCase();
}

/**
 * ProjectCard Component (Phase 05 Refined)
 * Reusable, semantic, data-driven project card.
 *
 * Information Hierarchy:
 * 1. Visual area (verified image or abstract identity fallback)
 * 2. Meta row (category + featured indicator when verified)
 * 3. Project title
 * 4. Short description / tagline when verified
 * 5. Technologies / services when verified
 * 6. Action area with primary case study link & verified secondary external links
 *
 * @param {object} project - Project schema object
 * @returns {string} HTML markup string
 */
export function createProjectCard(project = {}) {
  const {
    slug = '',
    title = '',
    category = '',
    tagline = '',
    shortDescription = '',
    featured = false,
    technologies = [],
    services = [],
    screenshots = [],
    links = {}
  } = project;

  // 1. Description resolution: prefer shortDescription, fallback to tagline, omit if empty
  const description = (shortDescription || tagline || '').trim();
  const isFeatured = Boolean(featured);
  const initials = getProjectInitials(title);

  // 2. Visual presentation
  const hasScreenshot = Array.isArray(screenshots) && screenshots.length > 0 && Boolean(screenshots[0]);
  const visualMarkup = hasScreenshot
    ? `<img src="${screenshots[0]}" alt="${title} project preview" class="project-card__image" loading="lazy" decoding="async" />`
    : `
      <div class="project-card__visual-fallback" aria-hidden="true">
        <div class="project-card__fallback-grid"></div>
        <div class="project-card__fallback-glow"></div>
        <div class="project-card__fallback-center">
          <div class="project-card__fallback-badge">
            <span class="project-card__fallback-monogram">${initials}</span>
          </div>
          <span class="project-card__fallback-title">${title}</span>
        </div>
        <div class="project-card__fallback-footer">
          <span class="project-card__fallback-code">REF // ${slug.toUpperCase()}</span>
          ${category ? `<span class="project-card__fallback-cat">${category}</span>` : ''}
        </div>
      </div>
    `;

  // 3. Category & Featured Meta
  const categoryMarkup = category
    ? `<span class="project-card__category">${category}</span>`
    : '';

  const featuredMarkup = isFeatured
    ? `<span class="project-card__featured-badge" aria-label="Featured System">Featured</span>`
    : '';

  const metaMarkup = (categoryMarkup || featuredMarkup)
    ? `
      <div class="project-card__meta">
        ${categoryMarkup}
        ${featuredMarkup}
      </div>
    `
    : '';

  // 4. Description (Conditional)
  const descriptionMarkup = description
    ? `<p class="project-card__description">${description}</p>`
    : '';

  // 5. Technologies & Services (Conditional - only if verified data exists)
  const techMarkup = Array.isArray(technologies) && technologies.length > 0
    ? `
      <ul class="project-card__tech-list" aria-label="Technologies used">
        ${technologies.map((t) => `<li class="project-card__tech-item">${t}</li>`).join('')}
      </ul>
    `
    : '';

  const servicesMarkup = Array.isArray(services) && services.length > 0
    ? `
      <ul class="project-card__services-list" aria-label="Services provided">
        ${services.map((s) => `<li class="project-card__service-item">${s}</li>`).join('')}
      </ul>
    `
    : '';

  // 6. Secondary External Link (Conditional - only if verified live URL or repo URL exists)
  let secondaryLinkMarkup = '';
  if (links && links.live) {
    secondaryLinkMarkup = `
      <a href="${links.live}" target="_blank" rel="noopener noreferrer" class="project-card__secondary-link" aria-label="Visit ${title} live website (opens in new tab)">
        <span>Live Site</span>
        <svg class="project-card__external-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M3.5 1.5H10.5V8.5M10.5 1.5L1.5 10.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
    `;
  } else if (links && links.repository) {
    secondaryLinkMarkup = `
      <a href="${links.repository}" target="_blank" rel="noopener noreferrer" class="project-card__secondary-link" aria-label="View ${title} repository (opens in new tab)">
        <span>Repository</span>
        <svg class="project-card__external-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M3.5 1.5H10.5V8.5M10.5 1.5L1.5 10.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
    `;
  }

  return `
    <article class="project-card ${isFeatured ? 'project-card--featured' : ''}" data-project-slug="${slug}">
      <div class="project-card__visual">
        ${visualMarkup}
      </div>

      <div class="project-card__content">
        ${metaMarkup}

        <h3 class="project-card__title">${title}</h3>

        ${descriptionMarkup}
        ${servicesMarkup}
        ${techMarkup}

        <div class="project-card__actions">
          <a href="/projects/${slug}" class="project-card__link" aria-label="Explore ${title} Case Study">
            <span class="project-card__link-text">Explore Case Study</span>
            <svg class="project-card__link-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3.333 8h9.334M8.667 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
          ${secondaryLinkMarkup}
        </div>
      </div>
    </article>
  `;
}

export default createProjectCard;
