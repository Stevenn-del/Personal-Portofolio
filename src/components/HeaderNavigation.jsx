import { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';

// Komponen ini mengatur navigasi header tetap (fixed header) di bagian atas layar.
// Berisi nama Steven Wang di pojok kiri atas dan tombol hamburger menu di pojok kanan atas.
// Menu navigasi mencakup: HOME, ABOUT ME, PROJECT, EXPERIENCE, GET IN TOUCH.
export default function HeaderNavigation({
  isHome,
  onNavigateHome,
  onNavigateAbout,
  onNavigateProjects,
  onNavigateExperience,
  onNavigateContact,
  isUnderlayerOpen,
  onCloseUnderlayer
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Kunci scroll halaman saat menu navigasi overlay sedang terbuka
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  // Tutup menu navigasi saat tombol Escape ditekan pada keyboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  // Handler perpindahan halaman/bagian dari menu navigasi
  const handleNav = (destination) => {
    setMenuOpen(false);
    if (destination === 'home') {
      if (onCloseUnderlayer) onCloseUnderlayer();
      if (onNavigateHome) onNavigateHome();
    } else if (destination === 'about') {
      if (onNavigateAbout) onNavigateAbout();
    } else if (destination === 'projects') {
      if (onCloseUnderlayer) onCloseUnderlayer();
      if (onNavigateProjects) onNavigateProjects();
    } else if (destination === 'experience') {
      if (onCloseUnderlayer) onCloseUnderlayer();
      if (onNavigateExperience) onNavigateExperience();
    } else if (destination === 'contact') {
      if (onCloseUnderlayer) onCloseUnderlayer();
      if (onNavigateContact) onNavigateContact();
    }
  };

  return (
    <header className={`portfolio-header ${menuOpen ? 'is-nav-open' : ''} ${isUnderlayerOpen ? 'is-underlayer-mode' : ''}`}>
      {/* Identitas nama Steven Wang di pojok kiri atas - HANYA tampil pada HOME/Landing Page */}
      <div className="header-left">
        {isHome && (
          <a
            className="name"
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              handleNav('home');
            }}
            aria-label="Steven Wang Portfolio Home"
          >
            {personalInfo.name}
          </a>
        )}
      </div>

      {/* Tombol hamburger menu di pojok kanan atas */}
      <div className="wrap">
        <button
          type="button"
          className={`menuIcon js-menuBtn ${menuOpen ? 'is-active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Menu navigasi layar penuh bergaya editorial */}
      <nav
        className={`global-nav ${menuOpen ? 'is-open' : ''}`}
        aria-hidden={!menuOpen}
        onClick={(e) => {
          if (e.target === e.currentTarget) setMenuOpen(false);
        }}
      >
        <ul className="global-nav__list">
          <li>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                handleNav('home');
              }}
            >
              HOME
            </a>
          </li>
          <li>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                handleNav('about');
              }}
            >
              ABOUT ME
            </a>
          </li>
          <li>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                handleNav('projects');
              }}
            >
              PROJECT
            </a>
          </li>
          <li>
            <a
              href="#experience"
              onClick={(e) => {
                e.preventDefault();
                handleNav('experience');
              }}
            >
              EXPERIENCE
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="js-contact"
              onClick={(e) => {
                e.preventDefault();
                handleNav('contact');
              }}
            >
              GET IN TOUCH
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
