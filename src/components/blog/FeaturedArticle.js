/**
 * FeaturedArticle Component
 * Highlights the premier technical article in a spacious, cinematic editorial banner.
 */

export function createFeaturedArticle(article) {
  if (!article) return '';

  const href = `/blog/${article.slug}`;
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return `
    <section class="blog-featured" aria-label="Featured Article">
      <div class="blog-featured__card">
        <div class="blog-featured__visual-col">
          <div class="blog-featured__graphic" style="background: ${article.coverGradient || 'linear-gradient(135deg, rgba(254, 239, 184, 0.2) 0%, #101414 100%)'};">
            <!-- Geometric Tech Motif -->
            <div class="blog-featured__motif" aria-hidden="true">
              <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="80" cy="80" r="68" stroke="#FEEFB8" stroke-width="1.5" stroke-dasharray="4 6" opacity="0.45"/>
                <rect x="42" y="42" width="76" height="76" rx="8" stroke="#FEEFB8" stroke-width="1.8" opacity="0.85"/>
                <path d="M56 80H104M80 56V104" stroke="#FEEFB8" stroke-width="1.5" stroke-linecap="round"/>
                <circle cx="80" cy="80" r="6" fill="#FEEFB8"/>
              </svg>
            </div>
            <span class="blog-featured__pill">FEATURED DEEP DIVE</span>
          </div>
        </div>

        <div class="blog-featured__content-col">
          <div class="blog-featured__meta-row">
            <span class="blog-category-tag">${article.category}</span>
            <span class="blog-meta-sep" aria-hidden="true">•</span>
            <span class="blog-read-time">${article.readTime || '6 min read'}</span>
          </div>

          <h2 class="blog-featured__title">
            <a href="${href}" class="blog-featured__link" data-article-slug="${article.slug}">
              ${article.title}
            </a>
          </h2>

          <p class="blog-featured__summary">
            ${article.summary}
          </p>

          <div class="blog-featured__footer">
            <div class="blog-author-block">
              <div class="blog-author-avatar" aria-hidden="true">KM</div>
              <div class="blog-author-info">
                <span class="blog-author-name">${article.author?.name || 'KodMates Technical Team'}</span>
                <span class="blog-author-date">${formattedDate}</span>
              </div>
            </div>

            <a href="${href}" class="blog-read-cta" data-article-slug="${article.slug}">
              <span>Read Deep Dive</span>
              <span class="cta-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  `;
}
