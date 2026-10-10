/**
 * BlogFilters Component
 * Category filtering pills, live search bar, and active results count.
 */

import { BLOG_CATEGORIES } from '../../data/blog/index.js';

export function createBlogFilters({ activeCategory = 'All', searchValue = '', count = 0 } = {}) {
  const categoryPills = BLOG_CATEGORIES.map((cat) => {
    const isActive = cat.toLowerCase() === activeCategory.toLowerCase();
    const activeClass = isActive ? 'blog-filter-btn is-active' : 'blog-filter-btn';
    const ariaPressed = isActive ? 'true' : 'false';

    return `
      <button 
        type="button" 
        class="${activeClass}" 
        data-blog-category="${cat}" 
        aria-pressed="${ariaPressed}"
      >
        ${cat}
      </button>
    `;
  }).join('');

  return `
    <div class="blog-filters-toolbar" role="search" aria-label="Filter blog articles">
      <div class="blog-filters-search-wrapper">
        <label for="blog-search-input" class="sr-only">Search articles by title, topic, or keyword</label>
        <div class="blog-search-input-box">
          <svg class="blog-search-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="9" cy="9" r="6" stroke="#FEEFB8" stroke-width="1.6"/>
            <path d="M13.5 13.5L17.5 17.5" stroke="#FEEFB8" stroke-width="1.6" stroke-linecap="round"/>
          </svg>
          <input 
            type="search" 
            id="blog-search-input" 
            class="blog-search-input" 
            placeholder="Search engineering articles, APIs, databases..." 
            value="${searchValue}"
            autocomplete="off"
            spellcheck="false"
          />
          ${searchValue ? `
            <button type="button" class="blog-search-clear-btn" id="blog-search-clear" aria-label="Clear search">
              ×
            </button>
          ` : ''}
        </div>
      </div>

      <div class="blog-categories-scroll" tabindex="0" role="region" aria-label="Filter by category">
        <div class="blog-categories-track">
          ${categoryPills}
        </div>
      </div>

      <div class="blog-results-meta" aria-live="polite">
        <span class="blog-results-count">${count} article${count === 1 ? '' : 's'} available</span>
      </div>
    </div>
  `;
}
