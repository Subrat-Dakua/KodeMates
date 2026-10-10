/**
 * BlogPage Component
 * Step 06 - Step 11:
 * Comprehensive Blog Listing Experience with editorial Hero, Featured Deep Dive,
 * Category Filter Pills, Live Search, Responsive Grid, and Accessible State.
 */

import { getAllArticles, filterArticles, getFeaturedArticle } from '../data/blog/index.js';
import { createBlogHero } from '../components/blog/BlogHero.js';
import { createFeaturedArticle } from '../components/blog/FeaturedArticle.js';
import { createBlogFilters } from '../components/blog/BlogFilters.js';
import { createBlogCard } from '../components/blog/BlogCard.js';
import { updateBlogListingSEO } from '../components/blog/BlogSEO.js';

export class BlogPage {
  constructor(options = {}) {
    this.target = options.target || document.getElementById('main-content');
    this.pageEl = null;
    this.activeCategory = 'All';
    this.searchQuery = '';
    this.allArticles = getAllArticles();
    this.featuredArticle = getFeaturedArticle();

    this._handleCategoryClick = this._handleCategoryClick.bind(this);
    this._handleSearchInput = this._handleSearchInput.bind(this);
    this._handleSearchClear = this._handleSearchClear.bind(this);
  }

  getFilteredList() {
    return filterArticles(this.allArticles, {
      category: this.activeCategory,
      search: this.searchQuery
    });
  }

  renderHTML() {
    const heroMarkup = createBlogHero();
    const featuredMarkup = (!this.searchQuery && this.activeCategory === 'All' && this.featuredArticle)
      ? createFeaturedArticle(this.featuredArticle)
      : '';

    const filtered = this.getFilteredList();
    const filtersMarkup = createBlogFilters({
      activeCategory: this.activeCategory,
      searchValue: this.searchQuery,
      count: filtered.length
    });

    const cardsMarkup = filtered.length > 0
      ? filtered.map((art) => createBlogCard(art)).join('')
      : `
        <div class="blog-empty-state" role="status">
          <div class="blog-empty-state__icon" aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="20" stroke="#FEEFB8" stroke-width="1.8" stroke-dasharray="3 4"/>
              <path d="M18 24H30M24 18V30" stroke="#FEEFB8" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
          </div>
          <h3 class="blog-empty-state__title">No articles found</h3>
          <p class="blog-empty-state__desc">
            No engineering publications matched the filter "${this.searchQuery || this.activeCategory}". Try adjusting your keywords or clearing the category filter.
          </p>
          <button type="button" class="cta-button blog-empty-state__reset" id="blog-reset-filters-btn">
            Reset Filters
          </button>
        </div>
      `;

    return `
      <div class="blog-page" id="blog-page">
        ${heroMarkup}
        
        <div class="blog-page__container">
          ${featuredMarkup}
          
          <section class="blog-listing-section" aria-label="Engineering Articles">
            <div class="blog-listing-section__header">
              <div class="blog-listing-section__title-group">
                <span class="blog-section-eyebrow">EXPLORE PUBLICATIONS</span>
                <h2 class="blog-section-title">All Technical Articles</h2>
              </div>
            </div>

            <div id="blog-filters-container">
              ${filtersMarkup}
            </div>

            <div class="blog-grid" id="blog-grid" role="region" aria-label="Articles list">
              ${cardsMarkup}
            </div>
          </section>

          <!-- Bottom Topic Advisory CTA -->
          <section class="blog-advisory-cta" aria-label="Suggest a Topic">
            <div class="blog-advisory-cta__card">
              <div class="blog-advisory-cta__text">
                <span class="blog-advisory-eyebrow">TECHNICAL DISCUSSIONS</span>
                <h3 class="blog-advisory-title">Facing a Specific Engineering Hurdle?</h3>
                <p class="blog-advisory-desc">
                  Our core team regularly collaborates with businesses to solve distributed system bottlenecks, API architecture, and database performance.
                </p>
              </div>
              <div class="blog-advisory-cta__action">
                <a href="/contact" class="cta-button" id="blog-consult-cta">
                  <span>Consult With Us</span>
                  <span class="cta-arrow" aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    `;
  }

  mount() {
    this.destroy();

    const temp = document.createElement('div');
    temp.innerHTML = this.renderHTML().trim();
    this.pageEl = temp.firstElementChild;

    if (this.target) {
      this.target.appendChild(this.pageEl);
    }

    this.bindEvents();
    updateBlogListingSEO();
    window.scrollTo({ top: 0, behavior: 'instant' });
    return this.pageEl;
  }

  bindEvents() {
    if (!this.pageEl) return;

    // Category pills click delegation
    this.pageEl.addEventListener('click', this._handleCategoryClick);

    // Live search input
    const searchInput = this.pageEl.querySelector('#blog-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', this._handleSearchInput);
    }

    // Clear search button
    const clearBtn = this.pageEl.querySelector('#blog-search-clear');
    if (clearBtn) {
      clearBtn.addEventListener('click', this._handleSearchClear);
    }

    // Reset filters button in empty state
    const resetBtn = this.pageEl.querySelector('#blog-reset-filters-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.activeCategory = 'All';
        this.searchQuery = '';
        this.updateFilteredView();
      });
    }
  }

  _handleCategoryClick(e) {
    const btn = e.target.closest('[data-blog-category]');
    if (!btn) return;

    const selectedCategory = btn.getAttribute('data-blog-category');
    if (!selectedCategory || selectedCategory === this.activeCategory) return;

    this.activeCategory = selectedCategory;
    this.updateFilteredView();
  }

  _handleSearchInput(e) {
    this.searchQuery = e.target.value;
    this.updateFilteredView();
  }

  _handleSearchClear() {
    this.searchQuery = '';
    const searchInput = this.pageEl?.querySelector('#blog-search-input');
    if (searchInput) {
      searchInput.value = '';
      searchInput.focus();
    }
    this.updateFilteredView();
  }

  updateFilteredView() {
    if (!this.pageEl) return;

    // Update filters toolbar
    const filtersContainer = this.pageEl.querySelector('#blog-filters-container');
    const filtered = this.getFilteredList();

    if (filtersContainer) {
      filtersContainer.innerHTML = createBlogFilters({
        activeCategory: this.activeCategory,
        searchValue: this.searchQuery,
        count: filtered.length
      });

      // Re-bind search input & clear button inside updated toolbar
      const searchInput = filtersContainer.querySelector('#blog-search-input');
      if (searchInput) {
        searchInput.addEventListener('input', this._handleSearchInput);
        searchInput.focus();
        // Restore cursor to end of text
        const len = searchInput.value.length;
        searchInput.setSelectionRange(len, len);
      }
      const clearBtn = filtersContainer.querySelector('#blog-search-clear');
      if (clearBtn) {
        clearBtn.addEventListener('click', this._handleSearchClear);
      }
    }

    // Update Grid
    const grid = this.pageEl.querySelector('#blog-grid');
    if (grid) {
      if (filtered.length > 0) {
        grid.innerHTML = filtered.map((art) => createBlogCard(art)).join('');
      } else {
        grid.innerHTML = `
          <div class="blog-empty-state" role="status">
            <div class="blog-empty-state__icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="20" stroke="#FEEFB8" stroke-width="1.8" stroke-dasharray="3 4"/>
                <path d="M18 24H30M24 18V30" stroke="#FEEFB8" stroke-width="1.8" stroke-linecap="round"/>
              </svg>
            </div>
            <h3 class="blog-empty-state__title">No articles found</h3>
            <p class="blog-empty-state__desc">
              No engineering publications matched the query "${this.searchQuery || this.activeCategory}". Try adjusting your keywords or clearing the category filter.
            </p>
            <button type="button" class="cta-button blog-empty-state__reset" id="blog-reset-filters-btn">
              Reset Filters
            </button>
          </div>
        `;
        const resetBtn = grid.querySelector('#blog-reset-filters-btn');
        if (resetBtn) {
          resetBtn.addEventListener('click', () => {
            this.activeCategory = 'All';
            this.searchQuery = '';
            this.updateFilteredView();
          });
        }
      }
    }
  }

  destroy() {
    if (this.pageEl && this.pageEl.parentNode) {
      this.pageEl.parentNode.removeChild(this.pageEl);
    }
    this.pageEl = null;
  }
}

export function initBlogPage(options = {}) {
  const page = new BlogPage(options);
  page.mount();
  return page;
}
