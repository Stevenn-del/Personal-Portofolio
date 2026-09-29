import { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';

export default function KuonHeader({
  onNavigateHome,
  onNavigateProjects,
  onNavigateAbout,
  onNavigateExperience,
  onNavigateContact,
  isUnderlayerOpen,
  onCloseUnderlayer
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const handleNav = (destination) => {
    setMenuOpen(false);
    if (destination === 'home') {
      if (onCloseUnderlayer) onCloseUnderlayer();
      if (onNavigateHome) onNavigateHome();
    } else if (destination === 'projects') {
      if (onNavigateProjects) onNavigateProjects();
    } else if (destination === 'about') {
      if (onNavigateAbout) onNavigateAbout();
    } else if (destination === 'experience') {
      if (onNavigateExperience) onNavigateExperience();
    } else if (destination === 'contact') {
      if (onCloseUnderlayer) onCloseUnderlayer();
      if (onNavigateContact) onNavigateContact();
    }
  };

  return (
    <header className={`kuon-header ${menuOpen ? 'is-nav-open' : ''} ${isUnderlayerOpen ? 'is-underlayer-mode' : ''}`}>
      <div className="header-left">
        {isUnderlayerOpen && (
          <button
            type="button"
            className="header-back-btn"
            onClick={() => {
              if (onCloseUnderlayer) onCloseUnderlayer();
            }}
            aria-label="Back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="18" viewBox="0 0 67 34">
              <g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" transform="translate(2 1)">
                <path strokeWidth="2.5" d="M0,15.5533333 L64,15.5533333" />
                <polyline strokeWidth="2.5" points="15.556 0 0 15.556 15.556 31.111" />
              </g>
            </svg>
            <span>BACK</span>
          </button>
        )}
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
      </div>

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

      {/* Global Navigation Overlay - Kuon Yagi Aesthetic */}
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
              CONTACT
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
