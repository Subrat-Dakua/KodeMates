import './styles/tokens.css';
import './styles/base.css';
import './styles/header.css';
import './styles/hero.css';
import { initHeader } from './components/Header.js';
import { initHero } from './components/Hero.js';

// Step 01: Initialize Kodmates Header (Locked)
const header = initHeader({ activePage: 'Home' });

// Step 02: Initialize Kodmates Homepage Hero & 3D Ecosystem
const hero = initHero();

// Navigation interactions
document.addEventListener('DOMContentLoaded', () => {
  const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  allNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const targetId = link.getAttribute('data-nav-id') || link.getAttribute('data-mobile-nav-id');
      if (targetId) {
        header.setActivePage(targetId);
      }
    });
  });
});
