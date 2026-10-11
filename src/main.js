import './styles/tokens.css';
import './styles/base.css';
import './styles/header.css';
import './styles/hero.css';
import './styles/sections.css';
import { initHeader } from './components/Header.js';
import { initHero } from './components/Hero.js';
import { initProjectsSection } from './components/ProjectsSection.js';
import { initBlogSection } from './components/BlogSection.js';
import { initContactSection } from './components/ContactSection.js';
import { initFooterSection } from './components/FooterSection.js';

// Step 01: Initialize Kodmates Header (Locked)
const header = initHeader({ activePage: 'Home' });

// Step 02: Initialize Kodmates Homepage Hero & 3D Ecosystem (Preserved)
const hero = initHero();

// Step 10: Initialize Integrated Website Sections
initProjectsSection();
initBlogSection();
initContactSection();
initFooterSection();

// Navigation interactions & Scroll-Spy
document.addEventListener('DOMContentLoaded', () => {
  const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  allNavLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('data-nav-id') || link.getAttribute('data-mobile-nav-id');
      if (targetId) {
        header.setActivePage(targetId);
      }
    });
  });

  // IntersectionObserver Scroll-Spy to dynamically update active header state as user scrolls
  const sectionIds = ['home', 'services', 'projects', 'process', 'about', 'blog', 'contact'];
  const sectionsToObserve = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sectionsToObserve.length > 0) {
    const scrollSpyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            header.setActivePage(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-25% 0px -65% 0px',
        threshold: 0
      }
    );

    sectionsToObserve.forEach(sec => scrollSpyObserver.observe(sec));
  }

  // Capability row shortcuts: click to scroll smoothly to services section
  const capabilityItems = document.querySelectorAll('.capability-item');
  capabilityItems.forEach((item) => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', () => {
      const servicesSection = document.getElementById('services');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Service card inquiry links: pre-select corresponding system type in contact form
  const serviceInquiryLinks = document.querySelectorAll('.service-card .service-link');
  serviceInquiryLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const card = link.closest('.service-card');
      if (!card) return;
      const srvTitle = card.querySelector('.service-title')?.textContent.trim();
      const contactSelect = document.getElementById('contact-type');
      if (!contactSelect || !srvTitle) return;

      // Map service title to select option
      const options = Array.from(contactSelect.options);
      const match = options.find(opt => 
        srvTitle.toLowerCase().includes(opt.value.toLowerCase().split(' ')[0]) ||
        opt.value.toLowerCase().includes(srvTitle.toLowerCase().split(' ')[0])
      );
      if (match) {
        contactSelect.value = match.value;
        contactSelect.style.borderColor = 'var(--km-accent-primary)';
        contactSelect.style.boxShadow = '0 0 16px rgba(254, 239, 184, 0.4)';
        setTimeout(() => {
          contactSelect.style.borderColor = '';
          contactSelect.style.boxShadow = '';
        }, 2400);
      }
    });
  });
});

