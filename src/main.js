/**
 * KodMates Main Application Entrypoint
 * Integrates Header, Homepage Hero & 3D Ecosystem,
 * Contact Page, Blog Experience, and Shared Footer.
 */

import './styles/tokens.css';
import './styles/base.css';
import './styles/header.css';
import './styles/hero.css';
import './styles/contact.css';
import './styles/blog.css';
import './styles/blog-article.css';
import './styles/footer.css';

import { initHeader } from './components/Header.js';
import { initHero } from './components/Hero.js';
import { initFooter } from './components/Footer.js';
import { initContactPage } from './pages/ContactPage.js';
import { initBlogPage } from './pages/BlogPage.js';
import { initBlogArticlePage } from './pages/BlogArticlePage.js';
import { resetBlogSEO } from './components/blog/BlogSEO.js';

// Step 01: Initialize Kodmates Header
const header = initHeader({ activePage: 'Home' });

// Step 02: Initialize Kodmates Homepage Hero & 3D Ecosystem
initHero();

// Shared Footer
initFooter();

// Route state management
let activePageInstance = null;

/**
 * Parses the current URL pathname and hash to determine the target route.
 * Supports both clean path routing (/blog, /contact) and hash routing (#blog, #contact, #/blog/slug)
 * for maximum server/static deployment compatibility.
 */
export function parseRoute() {
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();

  // Hash route checks
  if (hash.startsWith('#/blog/') || hash.startsWith('#blog/')) {
    const slug = hash.replace(/^#\/?blog\//, '').split('/')[0].split('?')[0];
    return { type: 'blog-article', slug };
  }
  if (hash === '#blog' || hash === '#/blog') {
    return { type: 'blog' };
  }
  if (hash === '#contact' || hash === '#/contact') {
    return { type: 'contact' };
  }

  // Path route checks
  if (path.startsWith('/blog/')) {
    const slug = path.replace(/^\/blog\//, '').split('/')[0].split('?')[0];
    if (slug) {
      return { type: 'blog-article', slug };
    }
    return { type: 'blog' };
  }
  if (path === '/blog' || path === '/blog/') {
    return { type: 'blog' };
  }
  if (path === '/contact' || path === '/contact/') {
    return { type: 'contact' };
  }

  // Default to home
  return { type: 'home' };
}

/**
 * Mounts the appropriate page view based on active route
 */
export function renderRoute() {
  const route = parseRoute();
  const heroEl = document.getElementById('hero');
  const mainContent = document.getElementById('main-content');

  // Tear down any existing active sub-page
  if (activePageInstance) {
    activePageInstance.destroy();
    activePageInstance = null;
  }

  if (route.type === 'contact') {
    header.setActivePage('Contact');
    if (heroEl) heroEl.style.display = 'none';
    if (mainContent) {
      activePageInstance = initContactPage({ target: mainContent });
    }
  } else if (route.type === 'blog') {
    header.setActivePage('Blog');
    if (heroEl) heroEl.style.display = 'none';
    if (mainContent) {
      activePageInstance = initBlogPage({ target: mainContent });
    }
  } else if (route.type === 'blog-article') {
    header.setActivePage('Blog');
    if (heroEl) heroEl.style.display = 'none';
    if (mainContent) {
      activePageInstance = initBlogArticlePage({ target: mainContent, slug: route.slug });
    }
  } else {
    // Home view
    header.setActivePage('Home');
    if (heroEl) heroEl.style.display = '';
    resetBlogSEO();
  }
}

/**
 * Intercepts navigation clicks for smooth client-side SPA transitions
 */
function setupNavigation() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    const target = link.getAttribute('target');
    const targetId = link.getAttribute('data-nav-id') || link.getAttribute('data-mobile-nav-id');

    // Ignore external or new-tab links
    if (!href || target === '_blank') return;

    // Check if link matches internal route targets
    const isBlogLink = href === '/blog' || href === '#blog' || href === '#/blog' || href.startsWith('/blog/') || href.startsWith('#/blog/') || href.startsWith('/blog?') || targetId === 'blog';
    const isContactLink = href === '/contact' || href === '#contact' || href === '#/contact' || targetId === 'contact';
    const isHomeLink = href === '/' || href === '#home' || href === '#/' || targetId === 'home';

    if (isBlogLink || isContactLink || isHomeLink) {
      e.preventDefault();
      let destination = href;

      if (isContactLink) {
        destination = '/contact';
      } else if (isBlogLink) {
        if (link.getAttribute('data-article-slug')) {
          destination = `/blog/${link.getAttribute('data-article-slug')}`;
        } else if (href.startsWith('/blog/') || href.startsWith('#/blog/')) {
          const slug = href.replace(/^#?\/?blog\//, '').split('/')[0].split('?')[0];
          destination = `/blog/${slug}`;
        } else if (href.startsWith('/blog?')) {
          destination = href;
        } else {
          destination = '/blog';
        }
      } else if (isHomeLink) {
        destination = '/';
      }

      window.history.pushState({}, '', destination);
      renderRoute();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // Handle browser back and forward
  window.addEventListener('popstate', renderRoute);
  
  // Render initial route on boot
  renderRoute();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupNavigation);
} else {
  setupNavigation();
}
