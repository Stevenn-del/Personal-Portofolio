import { useState, useEffect, useCallback } from 'react';
import { projects } from './data/portfolioData';

// Kuon Yagi Slide Presentation Mode Components
import KuonBackground from './components/KuonBackground';
import KuonHeader from './components/KuonHeader';
import KuonPagination from './components/KuonPagination';
import KuonSlide from './components/KuonSlide';
import KuonProjectsCollection from './components/KuonProjectsCollection';
import KuonUnderlayerProject from './components/KuonUnderlayerProject';
import KuonUnderlayerAbout from './components/KuonUnderlayerAbout';
import KuonUnderlayerExperience from './components/KuonUnderlayerExperience';

// Accessories
import CustomCursor from './components/CustomCursor';

// Styles
import './App.css';
import './kuon.css';

export default function App() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isProjectsCollectionOpen, setIsProjectsCollectionOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isAboutUnderlayerOpen, setIsAboutUnderlayerOpen] = useState(false);
  const [isExperienceUnderlayerOpen, setIsExperienceUnderlayerOpen] = useState(false);

  // Transition state: 'idle' | 'to-underlayer' | 'to-slide'
  const [transitionPhase, setTransitionPhase] = useState('idle');

  // 0: Top/Home, 1: Projects introduction, 2: About Me, 3: Experience, 4: Contact
  const totalSlides = 5;

  // Set dark theme data attribute for aesthetics
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  // Hash route listener for initial load and URL navigation
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#projects' || hash === '#works') {
        setActiveSlide(1);
        setIsProjectsCollectionOpen(true);
        setSelectedProject(null);
        setIsAboutUnderlayerOpen(false);
        setIsExperienceUnderlayerOpen(false);
      } else if (hash === '#nusa-bot') {
        setActiveSlide(1);
        setIsProjectsCollectionOpen(false);
        setSelectedProject(projects[0]);
        setIsAboutUnderlayerOpen(false);
        setIsExperienceUnderlayerOpen(false);
      } else if (hash.startsWith('#project-')) {
        const found = projects.find((p) => `#${p.id}` === hash || `#${p.slug}` === hash);
        if (found) {
          setActiveSlide(1);
          setIsProjectsCollectionOpen(false);
          setSelectedProject(found);
          setIsAboutUnderlayerOpen(false);
          setIsExperienceUnderlayerOpen(false);
        }
      } else if (hash === '#about') {
        setActiveSlide(2);
        setIsAboutUnderlayerOpen(true);
        setIsProjectsCollectionOpen(false);
        setSelectedProject(null);
        setIsExperienceUnderlayerOpen(false);
      } else if (hash === '#experience') {
        setActiveSlide(3);
        setIsExperienceUnderlayerOpen(true);
        setIsProjectsCollectionOpen(false);
        setSelectedProject(null);
        setIsAboutUnderlayerOpen(false);
      } else if (hash === '#contact') {
        setActiveSlide(4);
        setIsProjectsCollectionOpen(false);
        setSelectedProject(null);
        setIsAboutUnderlayerOpen(false);
        setIsExperienceUnderlayerOpen(false);
      } else if (hash === '#top' || hash === '#home') {
        setActiveSlide(0);
        setIsProjectsCollectionOpen(false);
        setSelectedProject(null);
        setIsAboutUnderlayerOpen(false);
        setIsExperienceUnderlayerOpen(false);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const isUnderlayerActive = Boolean(
    isProjectsCollectionOpen || selectedProject || isAboutUnderlayerOpen || isExperienceUnderlayerOpen
  );

  // Slide navigation with wheel (throttled for smooth Kuon Yagi transitions)
  useEffect(() => {
    if (isUnderlayerActive || transitionPhase !== 'idle') return;

    let isThrottled = false;
    const handleWheel = (e) => {
      if (isThrottled) return;
      if (Math.abs(e.deltaY) < 25) return;

      isThrottled = true;
      setTimeout(() => {
        isThrottled = false;
      }, 700);

      if (e.deltaY > 0) {
        setActiveSlide((prev) => Math.min(prev + 1, totalSlides - 1));
      } else {
        setActiveSlide((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isUnderlayerActive, transitionPhase, totalSlides]);

  // Slide navigation with keyboard arrow keys
  useEffect(() => {
    if (isUnderlayerActive || transitionPhase !== 'idle') return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        setActiveSlide((prev) => Math.min(prev + 1, totalSlides - 1));
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        setActiveSlide((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Home') {
        e.preventDefault();
        setActiveSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setActiveSlide(totalSlides - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isUnderlayerActive, transitionPhase, totalSlides]);

  // Touch swipe support for mobile
  useEffect(() => {
    if (isUnderlayerActive || transitionPhase !== 'idle') return;

    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      if (Math.abs(diff) > 45) {
        if (diff > 0) {
          setActiveSlide((prev) => Math.min(prev + 1, totalSlides - 1));
        } else {
          setActiveSlide((prev) => Math.max(prev - 1, 0));
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isUnderlayerActive, transitionPhase, totalSlides]);

  // Helper for smooth editorial page transitions
  const performTransitionToUnderlayer = useCallback((changeStateCallback, targetHash) => {
    setTransitionPhase('to-underlayer');
    setTimeout(() => {
      changeStateCallback();
      if (targetHash) window.history.replaceState(null, '', targetHash);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setTimeout(() => {
        setTransitionPhase('idle');
      }, 50);
    }, 250);
  }, []);

  const performTransitionToSlide = useCallback((changeStateCallback, targetHash) => {
    setTransitionPhase('to-slide');
    setTimeout(() => {
      changeStateCallback();
      if (targetHash) window.history.replaceState(null, '', targetHash);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setTimeout(() => {
        setTransitionPhase('idle');
      }, 50);
    }, 240);
  }, []);

  // Navigation handlers with editorial transition
  const handleCloseAllUnderlayers = useCallback(() => {
    performTransitionToSlide(() => {
      setIsProjectsCollectionOpen(false);
      setSelectedProject(null);
      setIsAboutUnderlayerOpen(false);
      setIsExperienceUnderlayerOpen(false);
    }, '#top');
  }, [performTransitionToSlide]);

  const handleNavigateHome = useCallback(() => {
    performTransitionToSlide(() => {
      setIsProjectsCollectionOpen(false);
      setSelectedProject(null);
      setIsAboutUnderlayerOpen(false);
      setIsExperienceUnderlayerOpen(false);
      setActiveSlide(0);
    }, '#top');
  }, [performTransitionToSlide]);

  const handleOpenProjectsCollection = useCallback(() => {
    performTransitionToUnderlayer(() => {
      setSelectedProject(null);
      setIsAboutUnderlayerOpen(false);
      setIsExperienceUnderlayerOpen(false);
      setIsProjectsCollectionOpen(true);
      setActiveSlide(1);
    }, '#projects');
  }, [performTransitionToUnderlayer]);

  const handleSelectProject = useCallback((proj) => {
    performTransitionToUnderlayer(() => {
      setIsProjectsCollectionOpen(false);
      setIsAboutUnderlayerOpen(false);
      setIsExperienceUnderlayerOpen(false);
      setSelectedProject(proj);
    }, `#${proj.slug || proj.id}`);
  }, [performTransitionToUnderlayer]);

  const handleCloseProjectDetail = useCallback(() => {
    performTransitionToUnderlayer(() => {
      setSelectedProject(null);
      setIsProjectsCollectionOpen(true);
    }, '#projects');
  }, [performTransitionToUnderlayer]);

  const handleCloseProjectsCollection = useCallback(() => {
    performTransitionToSlide(() => {
      setIsProjectsCollectionOpen(false);
    }, '#projects');
  }, [performTransitionToSlide]);

  const handleOpenAbout = useCallback(() => {
    performTransitionToUnderlayer(() => {
      setIsProjectsCollectionOpen(false);
      setSelectedProject(null);
      setIsExperienceUnderlayerOpen(false);
      setIsAboutUnderlayerOpen(true);
      setActiveSlide(2);
    }, '#about');
  }, [performTransitionToUnderlayer]);

  const handleCloseAbout = useCallback(() => {
    performTransitionToSlide(() => {
      setIsAboutUnderlayerOpen(false);
    }, '#about');
  }, [performTransitionToSlide]);

  const handleOpenExperience = useCallback(() => {
    performTransitionToUnderlayer(() => {
      setIsProjectsCollectionOpen(false);
      setSelectedProject(null);
      setIsAboutUnderlayerOpen(false);
      setIsExperienceUnderlayerOpen(true);
      setActiveSlide(3);
    }, '#experience');
  }, [performTransitionToUnderlayer]);

  const handleCloseExperience = useCallback(() => {
    performTransitionToSlide(() => {
      setIsExperienceUnderlayerOpen(false);
    }, '#experience');
  }, [performTransitionToSlide]);

  const handleNavigateContact = useCallback(() => {
    performTransitionToSlide(() => {
      setIsProjectsCollectionOpen(false);
      setSelectedProject(null);
      setIsAboutUnderlayerOpen(false);
      setIsExperienceUnderlayerOpen(false);
      setActiveSlide(4);
    }, '#contact');
  }, [performTransitionToSlide]);

  const handleSelectSlide = useCallback((index) => {
    setIsProjectsCollectionOpen(false);
    setSelectedProject(null);
    setIsAboutUnderlayerOpen(false);
    setIsExperienceUnderlayerOpen(false);
    setActiveSlide(index);
    if (index === 0) window.history.replaceState(null, '', '#top');
    else if (index === 1) window.history.replaceState(null, '', '#projects');
    else if (index === 2) window.history.replaceState(null, '', '#about');
    else if (index === 3) window.history.replaceState(null, '', '#experience');
    else if (index === 4) window.history.replaceState(null, '', '#contact');
  }, []);

  return (
    <div
      className={`portfolio-app-root is-slide-mode ${
        transitionPhase === 'to-underlayer' ? 'is-transitioning-to-underlayer' : ''
      } ${transitionPhase === 'to-slide' ? 'is-transitioning-to-slide' : ''}`}
    >
      {/* Custom Trailing Cursor for Desktop */}
      <CustomCursor />

      <div className="kuon-presentation-root">
        {/* Celestial Parallax Moon, Stars & Sky */}
        <KuonBackground
          activeSlideIndex={activeSlide}
          isUnderlayerOpen={isUnderlayerActive}
        />

        {/* Kuon Fixed Header Navigation with Hamburger in Top-Right Corner */}
        <KuonHeader
          isUnderlayerOpen={isUnderlayerActive}
          onNavigateHome={handleNavigateHome}
          onNavigateProjects={handleOpenProjectsCollection}
          onNavigateAbout={handleOpenAbout}
          onNavigateExperience={handleOpenExperience}
          onNavigateContact={handleNavigateContact}
          onCloseUnderlayer={() => {
            if (selectedProject) {
              handleCloseProjectDetail();
            } else {
              handleCloseAllUnderlayers();
            }
          }}
        />

        {/* Slide Progress Pagination Indicator */}
        <KuonPagination
          currentSlide={activeSlide}
          totalSlides={totalSlides}
          onSelectSlide={handleSelectSlide}
          isUnderlayerOpen={isUnderlayerActive}
        />

        {/* Main Slide Deck Viewport */}
        <main className="kuon-slider-viewport">
          {/* 00: Top / Hero Slide */}
          <KuonSlide
            type="top"
            isActive={activeSlide === 0}
          />

          {/* 01: Project Introduction Slide (Strict: Minimal, 01, PROJECT, SHOW ME MORE) */}
          <KuonSlide
            type="project"
            isActive={activeSlide === 1}
            onOpenProjects={handleOpenProjectsCollection}
          />

          {/* 02: About Me Slide */}
          <KuonSlide
            type="about"
            isActive={activeSlide === 2}
            onOpenAbout={handleOpenAbout}
          />

          {/* 03: Experience Slide (Certificates & Learning) */}
          <KuonSlide
            type="experience"
            isActive={activeSlide === 3}
            onOpenExperience={handleOpenExperience}
          />

          {/* 04: Contact Slide */}
          <KuonSlide
            type="contact"
            isActive={activeSlide === 4}
          />
        </main>

        {/* Dedicated Multiple Projects Collection Page */}
        {isProjectsCollectionOpen && !selectedProject && (
          <KuonProjectsCollection
            onSelectProject={handleSelectProject}
            onClose={handleCloseProjectsCollection}
          />
        )}

        {/* Dedicated Individual Project Detail Page (Nusa Bot & others) */}
        {selectedProject && (
          <KuonUnderlayerProject
            project={selectedProject}
            onClose={handleCloseProjectDetail}
          />
        )}

        {/* Dedicated About Me Detail Page */}
        {isAboutUnderlayerOpen && (
          <KuonUnderlayerAbout
            onClose={handleCloseAbout}
          />
        )}

        {/* Dedicated Experience / Certificates & Learning Page */}
        {isExperienceUnderlayerOpen && (
          <KuonUnderlayerExperience
            onClose={handleCloseExperience}
          />
        )}
      </div>
    </div>
  );
}
