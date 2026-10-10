/**
 * BlogArticlePage Component
 * Step 09: Individual Article Page
 * Renders complete deep dive with table of contents, semantic sections,
 * copy code blocks, related articles recommendation, and CTA.
 */

import { getArticleBySlug, getRelatedArticles } from '../data/blog/index.js';
import { createBlogCard } from '../components/blog/BlogCard.js';
import { updateArticleSEO } from '../components/blog/BlogSEO.js';

export class BlogArticlePage {
  constructor(options = {}) {
    this.target = options.target || document.getElementById('main-content');
    this.slug = options.slug || '';
    this.article = options.article || getArticleBySlug(this.slug);
    this.pageEl = null;
    this._observer = null;
  }

  renderHTML() {
    if (!this.article) {
      return `
        <div class="blog-not-found" id="blog-article-page">
          <div class="blog-not-found__card">
            <span class="blog-not-found__eyebrow">ARTICLE NOT FOUND</span>
            <h1 class="blog-not-found__title">Publication Unavailable</h1>
            <p class="blog-not-found__desc">
              The article you are looking for may have been moved, renamed, or is currently in draft review.
            </p>
            <a href="/blog" class="cta-button" id="blog-back-btn">
              <span>← Back to Blog</span>
            </a>
          </div>
        </div>
      `;
    }

    const formattedDate = new Date(this.article.publishedAt).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    // Table of contents
    const tocItems = (this.article.sections || []).map((sec) => `
      <li class="article-toc__item">
        <a href="#${sec.id}" class="article-toc__link" data-toc-target="${sec.id}">
          ${sec.title}
        </a>
      </li>
    `).join('');

    // Article body sections
    const sectionsMarkup = (this.article.sections || []).map((sec) => `
      <section class="article-section" id="${sec.id}">
        <h2 class="article-section__title">${sec.title}</h2>
        <div class="article-section__content">
          ${sec.content}
        </div>
      </section>
    `).join('');

    // Tags
    const tagsMarkup = (this.article.tags || []).map((tag) => `
      <span class="article-tag-item">#${tag}</span>
    `).join('');

    // Related articles
    const related = getRelatedArticles(this.article.slug, this.article.category, 2);
    const relatedCardsMarkup = related.map((art) => createBlogCard(art)).join('');

    return `
      <div class="blog-article-page" id="blog-article-page">
        <!-- Breadcrumb / Back Link -->
        <div class="article-top-bar">
          <div class="article-top-bar__container">
            <a href="/blog" class="article-back-link" id="article-back-to-blog">
              <span class="cta-arrow" aria-hidden="true">←</span>
              <span>Back to all insights</span>
            </a>
            <div class="article-breadcrumbs" aria-label="Breadcrumbs">
              <a href="/">Home</a>
              <span class="breadcrumb-sep">/</span>
              <a href="/blog">Blog</a>
              <span class="breadcrumb-sep">/</span>
              <span class="breadcrumb-current">${this.article.category}</span>
            </div>
          </div>
        </div>

        <!-- Article Header Hero -->
        <header class="article-header">
          <div class="article-header__container">
            <div class="article-header__meta-top">
              <span class="blog-category-tag">${this.article.category}</span>
              <span class="article-header__read-time">${this.article.readTime}</span>
            </div>

            <h1 class="article-header__title">
              ${this.article.title}
            </h1>

            <p class="article-header__summary">
              ${this.article.summary}
            </p>

            <div class="article-author-bar">
              <div class="article-author-avatar">KM</div>
              <div class="article-author-details">
                <span class="article-author-name">${this.article.author?.name || 'KodMates Technical Team'}</span>
                <span class="article-author-role">${this.article.author?.role || 'Systems Engineering'} • Published on ${formattedDate}</span>
              </div>
            </div>
          </div>
        </header>

        <!-- Main Content Area with Sticky TOC Sidebar and Article Body -->
        <div class="article-layout-container">
          <div class="article-layout-grid">
            <!-- Sidebar: Table of Contents -->
            <aside class="article-sidebar" aria-label="Table of Contents">
              <div class="article-sidebar__sticky">
                <div class="article-toc-box">
                  <span class="article-toc__heading">TABLE OF CONTENTS</span>
                  <nav aria-label="In this article">
                    <ul class="article-toc__list">
                      ${tocItems}
                    </ul>
                  </nav>
                </div>

                <div class="article-sidebar-cta">
                  <span class="sidebar-cta__eyebrow">NEED ADVICE?</span>
                  <p class="sidebar-cta__text">Discuss this architecture for your stack.</p>
                  <a href="/contact" class="sidebar-cta__btn">Talk to Engineers →</a>
                </div>
              </div>
            </aside>

            <!-- Main Editorial Body -->
            <main class="article-main-body">
              <div class="article-content">
                ${sectionsMarkup}
              </div>

              <!-- Tags Row -->
              <div class="article-tags-wrapper" aria-label="Article Tags">
                <span class="article-tags-label">Categorized under:</span>
                <div class="article-tags-list">
                  ${tagsMarkup}
                </div>
              </div>

              <!-- Post Article Action / Consultation Banner -->
              <section class="article-end-cta" aria-label="Consultation Call to Action">
                <div class="article-end-cta__inner">
                  <div class="article-end-cta__content">
                    <span class="article-end-cta__eyebrow">ENGINEERING COLLABORATION</span>
                    <h3 class="article-end-cta__title">Building software that demands this level of discipline?</h3>
                    <p class="article-end-cta__desc">
                      Whether you are planning a modern web platform, designing APIs, or refining database architecture, KodMates engineers can partner with your team.
                    </p>
                  </div>
                  <div class="article-end-cta__actions">
                    <a href="/contact" class="cta-button" id="article-contact-cta">
                      <span>Start a Discussion</span>
                      <span class="cta-arrow" aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>

        <!-- Related Deep Dives -->
        ${related.length > 0 ? `
          <section class="article-related-section" aria-label="Related Publications">
            <div class="article-related__container">
              <div class="article-related__header">
                <span class="blog-section-eyebrow">FURTHER READING</span>
                <h2 class="blog-section-title">Related Technical Insights</h2>
              </div>
              <div class="blog-grid blog-grid--related">
                ${relatedCardsMarkup}
              </div>
            </div>
          </section>
        ` : ''}
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

    if (this.article) {
      updateArticleSEO(this.article);
    }
    this.bindEvents();
    window.scrollTo({ top: 0, behavior: 'instant' });
    return this.pageEl;
  }

  bindEvents() {
    if (!this.pageEl) return;

    // Code copy buttons insertion
    const codeBlocks = this.pageEl.querySelectorAll('pre.code-block');
    codeBlocks.forEach((block) => {
      const copyBtn = document.createElement('button');
      copyBtn.type = 'button';
      copyBtn.className = 'code-copy-btn';
      copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
      copyBtn.innerHTML = `
        <span class="copy-icon">⧉</span>
        <span class="copy-text">Copy</span>
      `;

      copyBtn.addEventListener('click', async () => {
        const code = block.querySelector('code')?.innerText || block.innerText;
        try {
          await navigator.clipboard.writeText(code);
          copyBtn.classList.add('is-copied');
          copyBtn.querySelector('.copy-text').textContent = 'Copied!';
          setTimeout(() => {
            copyBtn.classList.remove('is-copied');
            copyBtn.querySelector('.copy-text').textContent = 'Copy';
          }, 2000);
        } catch {
          copyBtn.querySelector('.copy-text').textContent = 'Copied';
        }
      });

      block.style.position = 'relative';
      block.appendChild(copyBtn);
    });

    // Active TOC Spy via IntersectionObserver
    const sections = this.pageEl.querySelectorAll('.article-section');
    const tocLinks = this.pageEl.querySelectorAll('.article-toc__link');

    if (sections.length > 0 && tocLinks.length > 0 && 'IntersectionObserver' in window) {
      this._observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            tocLinks.forEach((link) => {
              const matches = link.getAttribute('data-toc-target') === id;
              link.classList.toggle('is-active', matches);
            });
          }
        });
      }, {
        rootMargin: '-10% 0px -70% 0px'
      });

      sections.forEach((sec) => this._observer.observe(sec));
    }
  }

  destroy() {
    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }
    if (this.pageEl && this.pageEl.parentNode) {
      this.pageEl.parentNode.removeChild(this.pageEl);
    }
    this.pageEl = null;
  }
}

export function initBlogArticlePage(options = {}) {
  const page = new BlogArticlePage(options);
  page.mount();
  return page;
}
