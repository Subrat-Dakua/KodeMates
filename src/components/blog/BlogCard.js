/**
 * BlogCard Component
 * Editorial card representing an article in the listing grid.
 */

export function createBlogCard(article) {
  if (!article) return '';

  const href = `/blog/${article.slug}`;
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // Generates tailored SVG vector graphics based on category to prevent broken external images
  const getCategoryIconSvg = (cat) => {
    switch (cat) {
      case 'Web Development':
        return `
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="blog-card-art-svg">
            <rect x="6" y="8" width="36" height="28" rx="4" stroke="#FEEFB8" stroke-width="2"/>
            <path d="M6 16H42" stroke="#FEEFB8" stroke-width="1.6"/>
            <circle cx="12" cy="12" r="1.5" fill="#FEEFB8"/>
            <circle cx="17" cy="12" r="1.5" fill="#FEEFB8"/>
            <path d="M14 26L18 30L14 34" stroke="#FEEFB8" stroke-width="2" stroke-linecap="round"/>
            <path d="M22 34H30" stroke="#FEEFB8" stroke-width="2" stroke-linecap="round"/>
          </svg>
        `;
      case 'APIs & Backend':
        return `
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="blog-card-art-svg">
            <rect x="8" y="10" width="32" height="12" rx="3" stroke="#FEEFB8" stroke-width="2"/>
            <rect x="8" y="26" width="32" height="12" rx="3" stroke="#FEEFB8" stroke-width="2"/>
            <circle cx="14" cy="16" r="2" fill="#FEEFB8"/>
            <circle cx="14" cy="32" r="2" fill="#FEEFB8"/>
            <path d="M26 16H34M26 32H34" stroke="#FEEFB8" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
        `;
      case 'Databases':
        return `
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="blog-card-art-svg">
            <ellipse cx="24" cy="12" rx="16" ry="6" stroke="#FEEFB8" stroke-width="2"/>
            <path d="M8 12V24C8 27.3 15.2 30 24 30C32.8 30 40 27.3 40 24V12" stroke="#FEEFB8" stroke-width="2"/>
            <path d="M8 24V36C8 39.3 15.2 42 24 42C32.8 42 40 39.3 40 36V24" stroke="#FEEFB8" stroke-width="2"/>
          </svg>
        `;
      case 'Android Development':
        return `
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="blog-card-art-svg">
            <rect x="12" y="6" width="24" height="36" rx="4" stroke="#FEEFB8" stroke-width="2"/>
            <circle cx="24" cy="36" r="2" fill="#FEEFB8"/>
            <path d="M20 10H28" stroke="#FEEFB8" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
        `;
      default:
        return `
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="blog-card-art-svg">
            <circle cx="24" cy="24" r="16" stroke="#FEEFB8" stroke-width="2"/>
            <path d="M24 16V24L29 29" stroke="#FEEFB8" stroke-width="2" stroke-linecap="round"/>
          </svg>
        `;
    }
  };

  return `
    <article class="blog-card" data-slug="${article.slug}">
      <div class="blog-card__thumbnail" style="background: ${article.coverGradient || 'linear-gradient(135deg, rgba(254, 239, 184, 0.12) 0%, #101414 100%)'};">
        <div class="blog-card__art-wrapper" aria-hidden="true">
          ${getCategoryIconSvg(article.category)}
        </div>
        <div class="blog-card__tag-bar">
          <span class="blog-category-tag">${article.category}</span>
          <span class="blog-read-time">${article.readTime || '5 min read'}</span>
        </div>
      </div>

      <div class="blog-card__body">
        <h3 class="blog-card__title">
          <a href="${href}" class="blog-card__link" data-article-slug="${article.slug}">
            ${article.title}
          </a>
        </h3>

        <p class="blog-card__summary">
          ${article.summary}
        </p>

        <div class="blog-card__footer">
          <div class="blog-card__author-wrap">
            <span class="blog-card__author">${article.author?.name || 'KodMates Technical Team'}</span>
            <span class="blog-card__date">${formattedDate}</span>
          </div>

          <a href="${href}" class="blog-card__cta" aria-label="Read ${article.title}" data-article-slug="${article.slug}">
            <span class="blog-card__cta-text">Read</span>
            <span class="cta-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </article>
  `;
}
