import './styles/tokens.css';
import './styles/base.css';
import './styles/header.css';
import './styles/hero.css';
import './styles/projects.css';
import './styles/project-case-study.css';
import './styles/services.css';
import { initHeader } from './components/Header.js';
import { initHero } from './components/Hero.js';
import { initProjectsPage } from './pages/ProjectsPage.js';
import { initProjectCaseStudyPage } from './pages/ProjectCaseStudyPage.js';
import { initServicesPage } from './pages/ServicesPage.js';
import { getProjectBySlug } from './data/projects/index.js';
import { resetProjectSEO } from './components/projects/ProjectSEO.js';
import { resetServicesSEO } from './components/services/ServicesSEO.js';

// Step 01: Initialize Kodmates Header (Locked)
const header = initHeader({ activePage: 'Home' });

// Step 02: Initialize Kodmates Homepage Hero & 3D Ecosystem
const hero = initHero();

// Step 03: Projects, Case Study & Services Route Integration
let activeProjectsPage = null;
let activeCaseStudyPage = null;
let activeServicesPage = null;

function parseRoute() {
  const path = window.location.pathname;
  const hash = window.location.hash;

  // Hash-based route check
  if (hash.startsWith('#/projects/')) {
    const slug = hash.replace(/^#\/projects\//, '').split('/')[0].split('?')[0];
    return { type: 'case-study', slug };
  }
  if (hash === '#projects' || hash === '#/projects') {
    return { type: 'projects-list' };
  }
  if (hash === '#services' || hash === '#/services') {
    return { type: 'services' };
  }

  // Pathname-based route check
  if (path.startsWith('/projects/')) {
    const slug = path.replace(/^\/projects\//, '').split('/')[0].split('?')[0];
    if (slug) {
      return { type: 'case-study', slug };
    }
    return { type: 'projects-list' };
  }

  if (path === '/projects' || path === '/projects/') {
    return { type: 'projects-list' };
  }

  if (path === '/services' || path === '/services/') {
    return { type: 'services' };
  }

  return { type: 'home' };
}

function renderRoute() {
  const route = parseRoute();
  const heroEl = document.getElementById('hero');
  const mainContent = document.getElementById('main-content');

  if (route.type === 'services') {
    header.setActivePage('Services');
    if (heroEl) heroEl.style.display = 'none';

    if (activeProjectsPage) {
      activeProjectsPage.destroy();
      activeProjectsPage = null;
    }
    if (activeCaseStudyPage) {
      activeCaseStudyPage.destroy();
      activeCaseStudyPage = null;
    }
    if (!activeServicesPage && mainContent) {
      activeServicesPage = initServicesPage({ target: mainContent });
    }
  } else if (route.type === 'case-study') {
    header.setActivePage('Projects');
    if (heroEl) heroEl.style.display = 'none';

    if (activeServicesPage) {
      activeServicesPage.destroy();
      activeServicesPage = null;
      resetServicesSEO();
    }
    if (activeProjectsPage) {
      activeProjectsPage.destroy();
      activeProjectsPage = null;
    }
    if (activeCaseStudyPage) {
      activeCaseStudyPage.destroy();
      activeCaseStudyPage = null;
    }

    if (mainContent) {
      const project = getProjectBySlug(route.slug);
      activeCaseStudyPage = initProjectCaseStudyPage({
        target: mainContent,
        project,
        slug: route.slug
      });
    }
  } else if (route.type === 'projects-list') {
    header.setActivePage('Projects');
    if (heroEl) heroEl.style.display = 'none';

    if (activeServicesPage) {
      activeServicesPage.destroy();
      activeServicesPage = null;
      resetServicesSEO();
    }
    if (activeCaseStudyPage) {
      activeCaseStudyPage.destroy();
      activeCaseStudyPage = null;
    }
    if (!activeProjectsPage && mainContent) {
      activeProjectsPage = initProjectsPage({ target: mainContent });
    }
  } else {
    header.setActivePage('Home');
    if (activeServicesPage) {
      activeServicesPage.destroy();
      activeServicesPage = null;
      resetServicesSEO();
    }
    if (activeProjectsPage) {
      activeProjectsPage.destroy();
      activeProjectsPage = null;
    }
    if (activeCaseStudyPage) {
      activeCaseStudyPage.destroy();
      activeCaseStudyPage = null;
    }
    if (heroEl) heroEl.style.display = '';
    resetProjectSEO();
  }
}

// Navigation interactions & lightweight SPA routing
function setupNavigation() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    const target = link.getAttribute('target');
    const targetId = link.getAttribute('data-nav-id') || link.getAttribute('data-mobile-nav-id');

    if (!href || target === '_blank') return;

    if (
      href.startsWith('/projects') ||
      href.startsWith('/services') ||
      href === '/' ||
      href === '#projects' ||
      href === '#/projects' ||
      href.startsWith('#/projects/') ||
      href === '#services' ||
      href === '#/services' ||
      targetId === 'projects' ||
      targetId === 'services' ||
      targetId === 'home'
    ) {
      e.preventDefault();
      let destination = href;
      if (href === '#projects' || href === '#/projects' || targetId === 'projects') {
        destination = '/projects';
      } else if (href === '#services' || href === '#/services' || targetId === 'services') {
        destination = '/services';
      } else if (href === '#home' || targetId === 'home') {
        destination = '/';
      }
      window.history.pushState({}, '', destination);
      renderRoute();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (targetId) {
      header.setActivePage(targetId);
    }
  });

  window.addEventListener('popstate', renderRoute);
  renderRoute();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupNavigation);
} else {
  setupNavigation();
}


