import { useState, useEffect, useCallback } from 'react';
import { projects } from './data/portfolioData';

// Komponen Mode Presentasi Editorial Steven Wang
import PortfolioBackground from './components/PortfolioBackground';
import HeaderNavigation from './components/HeaderNavigation';
import PaginationIndicator from './components/PaginationIndicator';
import PortfolioSlide from './components/PortfolioSlide';
import ProjectsCollection from './components/ProjectsCollection';
import ProjectDetail from './components/ProjectDetail';
import AboutDetail from './components/AboutDetail';
import ExperienceDetail from './components/ExperienceDetail';

// Aksesori kursor desktop
import CustomCursor from './components/CustomCursor';

// Gaya CSS Editorial & Aplikasi
import './App.css';
import './editorial.css';

// Komponen utama aplikasi portofolio Steven Wang.
// Mengatur alur presentasi editorial:
// HOME -> ABOUT ME -> PROJECT -> EXPERIENCE -> GET IN TOUCH / FOOTER
export default function App() {
  // State nomor slide aktif (Total 5 slide berurutan sesuai alur master yang diminta)
  // 0: HOME
  // 1: ABOUT ME (Section WHO I AM / ABOUT ME dengan SHOW ME MORE -> membuka About Detail)
  // 2: PROJECT (Section Preview minimal dengan SHOW ME MORE -> membuka Projects Collection)
  // 3: EXPERIENCE (Section Preview dengan SHOW ME MORE -> membuka Experience Detail)
  // 4: GET IN TOUCH & FOOTER (Komposisi penutup: kontak di kiri, visual di kanan, diikuti footer normal terpisah)
  const [activeSlide, setActiveSlide] = useState(0);

  // State tampilan halaman detail (Underlayer)
  const [isProjectsCollectionOpen, setIsProjectsCollectionOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isAboutUnderlayerOpen, setIsAboutUnderlayerOpen] = useState(false);
  const [isExperienceUnderlayerOpen, setIsExperienceUnderlayerOpen] = useState(false);

  // Fase transisi halaman editorial: 'idle' | 'to-underlayer' | 'to-slide'
  const [transitionPhase, setTransitionPhase] = useState('idle');

  // Total 5 slide berurutan sesuai alur master yang diminta
  const totalSlides = 5;

  // Pasang tema gelap secara default untuk tampilan editorial
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  // Menandai apakah salah satu halaman detail sedang aktif
  const isUnderlayerActive = Boolean(
    isProjectsCollectionOpen || selectedProject || isAboutUnderlayerOpen || isExperienceUnderlayerOpen
  );

  // Tentukan apakah user sedang berada di halaman Home / Landing Page
  const isHome = activeSlide === 0 && !isUnderlayerActive;

  // Sinkronisasi rute hash URL saat halaman dimuat atau hash berubah
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#about') {
        setActiveSlide(1);
        setIsAboutUnderlayerOpen(false);
        setIsProjectsCollectionOpen(false);
        setSelectedProject(null);
        setIsExperienceUnderlayerOpen(false);
      } else if (hash === '#about-detail' || hash === '#who-i-am') {
        setIsAboutUnderlayerOpen(true);
        setIsProjectsCollectionOpen(false);
        setSelectedProject(null);
        setIsExperienceUnderlayerOpen(false);
      } else if (hash === '#projects' || hash === '#works' || hash === '#project') {
        setActiveSlide(2);
        setIsProjectsCollectionOpen(false);
        setSelectedProject(null);
        setIsAboutUnderlayerOpen(false);
        setIsExperienceUnderlayerOpen(false);
      } else if (hash === '#experience') {
        setActiveSlide(3);
        setIsExperienceUnderlayerOpen(false);
        setIsProjectsCollectionOpen(false);
        setSelectedProject(null);
        setIsAboutUnderlayerOpen(false);
      } else if (hash === '#contact' || hash === '#get-in-touch') {
        setActiveSlide(4);
        setIsProjectsCollectionOpen(false);
        setSelectedProject(null);
        setIsAboutUnderlayerOpen(false);
        setIsExperienceUnderlayerOpen(false);
      } else if (hash === '#top' || hash === '#home' || hash === '') {
        setActiveSlide(0);
        setIsProjectsCollectionOpen(false);
        setSelectedProject(null);
        setIsAboutUnderlayerOpen(false);
        setIsExperienceUnderlayerOpen(false);
      } else if (hash === '#nusa-bot' || hash === '#project-01') {
        setIsProjectsCollectionOpen(false);
        setIsAboutUnderlayerOpen(false);
        setIsExperienceUnderlayerOpen(false);
        setSelectedProject(projects[0]);
      } else if (hash === '#arvion' || hash === '#project-02') {
        setIsProjectsCollectionOpen(false);
        setIsAboutUnderlayerOpen(false);
        setIsExperienceUnderlayerOpen(false);
        setSelectedProject(projects[1]);
      } else if (hash === '#iitc' || hash === '#iitc-competition' || hash === '#project-03') {
        setIsProjectsCollectionOpen(false);
        setIsAboutUnderlayerOpen(false);
        setIsExperienceUnderlayerOpen(false);
        setSelectedProject(projects[2]);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Reset posisi scroll Slide 4 (GET IN TOUCH & FOOTER) ke paling atas saat slide aktif
  useEffect(() => {
    if (activeSlide === 4) {
      const contactSlide = document.querySelector('.slide--contact');
      if (contactSlide) contactSlide.scrollTop = 0;
    }
  }, [activeSlide]);

  // Navigasi perpindahan slide dengan mouse wheel (dibatasi throttle agar transisi terasa tenang & halus)
  useEffect(() => {
    if (isUnderlayerActive || transitionPhase !== 'idle') return;

    let isThrottled = false;
    const handleWheel = (e) => {
      if (isThrottled) return;
      if (Math.abs(e.deltaY) < 25) return;

      // Khusus slide 4 (GET IN TOUCH & FOOTER): Izinkan scroll vertikal internal ke footer
      if (activeSlide === 4) {
        const contactSlide = document.querySelector('.slide--contact');
        if (contactSlide) {
          const maxScroll = contactSlide.scrollHeight - contactSlide.clientHeight;
          if (e.deltaY > 0) {
            // Scroll ke bawah menuju footer
            if (contactSlide.scrollTop < maxScroll - 15) {
              contactSlide.scrollBy({ top: 320, behavior: 'smooth' });
              isThrottled = true;
              setTimeout(() => { isThrottled = false; }, 300);
              return;
            }
          } else {
            // Scroll ke atas menuju Get In Touch
            if (contactSlide.scrollTop > 15) {
              contactSlide.scrollBy({ top: -320, behavior: 'smooth' });
              isThrottled = true;
              setTimeout(() => { isThrottled = false; }, 300);
              return;
            }
          }
        }
      }

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
  }, [isUnderlayerActive, transitionPhase, totalSlides, activeSlide]);

  // Navigasi perpindahan slide menggunakan tombol panah keyboard
  useEffect(() => {
    if (isUnderlayerActive || transitionPhase !== 'idle') return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        if (activeSlide === 4) {
          const contactSlide = document.querySelector('.slide--contact');
          if (contactSlide && contactSlide.scrollTop < contactSlide.scrollHeight - contactSlide.clientHeight - 20) {
            contactSlide.scrollBy({ top: 350, behavior: 'smooth' });
            return;
          }
        }
        setActiveSlide((prev) => Math.min(prev + 1, totalSlides - 1));
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        if (activeSlide === 4) {
          const contactSlide = document.querySelector('.slide--contact');
          if (contactSlide && contactSlide.scrollTop > 20) {
            contactSlide.scrollBy({ top: -350, behavior: 'smooth' });
            return;
          }
        }
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
  }, [isUnderlayerActive, transitionPhase, totalSlides, activeSlide]);

  // Navigasi gestur geser (swipe) untuk layar sentuh ponsel
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
          // Swipe up (scroll ke bawah)
          if (activeSlide === 4) {
            const contactSlide = document.querySelector('.slide--contact');
            if (contactSlide && contactSlide.scrollTop < contactSlide.scrollHeight - contactSlide.clientHeight - 20) {
              return; // Biarkan browser scroll natural di dalam slide
            }
          }
          setActiveSlide((prev) => Math.min(prev + 1, totalSlides - 1));
        } else {
          // Swipe down (scroll ke atas)
          if (activeSlide === 4) {
            const contactSlide = document.querySelector('.slide--contact');
            if (contactSlide && contactSlide.scrollTop > 20) {
              return; // Biarkan browser scroll natural di dalam slide
            }
          }
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
  }, [isUnderlayerActive, transitionPhase, totalSlides, activeSlide]);

  // Fungsi pembantu transisi animasi membuka halaman detail
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

  // Fungsi pembantu transisi animasi kembali ke mode slide
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

  // Handler menutup semua halaman detail
  const handleCloseAllUnderlayers = useCallback(() => {
    performTransitionToSlide(() => {
      setIsProjectsCollectionOpen(false);
      setSelectedProject(null);
      setIsAboutUnderlayerOpen(false);
      setIsExperienceUnderlayerOpen(false);
    }, '#top');
  }, [performTransitionToSlide]);

  // Handler kembali ke halaman awal (Home)
  const handleNavigateHome = useCallback(() => {
    performTransitionToSlide(() => {
      setIsProjectsCollectionOpen(false);
      setSelectedProject(null);
      setIsAboutUnderlayerOpen(false);
      setIsExperienceUnderlayerOpen(false);
      setActiveSlide(0);
    }, '#top');
  }, [performTransitionToSlide]);

  // Handler membuka halaman detail About Me (Underlayer)
  const handleOpenAbout = useCallback(() => {
    performTransitionToUnderlayer(() => {
      setIsProjectsCollectionOpen(false);
      setSelectedProject(null);
      setIsExperienceUnderlayerOpen(false);
      setIsAboutUnderlayerOpen(true);
    }, '#about');
  }, [performTransitionToUnderlayer]);

  // Handler menutup halaman detail About Me
  const handleCloseAbout = useCallback(() => {
    performTransitionToSlide(() => {
      setIsAboutUnderlayerOpen(false);
    }, '#top');
  }, [performTransitionToSlide]);

  // Handler membuka halaman koleksi daftar project
  const handleOpenProjectsCollection = useCallback(() => {
    performTransitionToUnderlayer(() => {
      setSelectedProject(null);
      setIsAboutUnderlayerOpen(false);
      setIsExperienceUnderlayerOpen(false);
      setIsProjectsCollectionOpen(true);
    }, '#projects');
  }, [performTransitionToUnderlayer]);

  // Handler menutup halaman koleksi project
  const handleCloseProjectsCollection = useCallback(() => {
    performTransitionToSlide(() => {
      setIsProjectsCollectionOpen(false);
    }, '#projects');
  }, [performTransitionToSlide]);

  // Handler memilih project tertentu untuk melihat studi kasus detail
  const handleSelectProject = useCallback((proj) => {
    performTransitionToUnderlayer(() => {
      setIsProjectsCollectionOpen(false);
      setIsAboutUnderlayerOpen(false);
      setIsExperienceUnderlayerOpen(false);
      setSelectedProject(proj);
    }, `#${proj.slug || proj.id}`);
  }, [performTransitionToUnderlayer]);

  // Handler menutup studi kasus project dan kembali ke mode slide
  const handleCloseProjectDetail = useCallback(() => {
    performTransitionToSlide(() => {
      setSelectedProject(null);
    }, '#project');
  }, [performTransitionToSlide]);

  // Handler membuka halaman detail Experience (Sertifikat & Pembelajaran)
  const handleOpenExperience = useCallback(() => {
    performTransitionToUnderlayer(() => {
      setIsProjectsCollectionOpen(false);
      setSelectedProject(null);
      setIsAboutUnderlayerOpen(false);
      setIsExperienceUnderlayerOpen(true);
    }, '#experience');
  }, [performTransitionToUnderlayer]);

  // Handler menutup halaman detail Experience
  const handleCloseExperience = useCallback(() => {
    performTransitionToSlide(() => {
      setIsExperienceUnderlayerOpen(false);
    }, '#experience');
  }, [performTransitionToSlide]);

  // Handler memilih slide melalui indikator pagination titik
  const handleSelectSlide = useCallback((index) => {
    setIsProjectsCollectionOpen(false);
    setSelectedProject(null);
    setIsAboutUnderlayerOpen(false);
    setIsExperienceUnderlayerOpen(false);
    setActiveSlide(index);
    if (index === 0) window.history.replaceState(null, '', '#top');
    else if (index === 1) window.history.replaceState(null, '', '#about');
    else if (index === 2) window.history.replaceState(null, '', '#project');
    else if (index === 3) window.history.replaceState(null, '', '#experience');
    else if (index === 4) window.history.replaceState(null, '', '#contact');
  }, []);

  // Handler navigasi dari menu hamburger utama
  const handleNavMenuHome = useCallback(() => {
    handleNavigateHome();
  }, [handleNavigateHome]);

  const handleNavMenuAbout = useCallback(() => {
    if (isUnderlayerActive) {
      performTransitionToSlide(() => {
        setIsProjectsCollectionOpen(false);
        setSelectedProject(null);
        setIsAboutUnderlayerOpen(false);
        setIsExperienceUnderlayerOpen(false);
        setActiveSlide(1);
      }, '#about');
    } else {
      handleSelectSlide(1);
    }
  }, [isUnderlayerActive, performTransitionToSlide, handleSelectSlide]);

  const handleNavMenuProjects = useCallback(() => {
    if (isUnderlayerActive) {
      performTransitionToSlide(() => {
        setIsProjectsCollectionOpen(false);
        setSelectedProject(null);
        setIsAboutUnderlayerOpen(false);
        setIsExperienceUnderlayerOpen(false);
        setActiveSlide(2);
      }, '#project');
    } else {
      handleSelectSlide(2);
    }
  }, [isUnderlayerActive, performTransitionToSlide, handleSelectSlide]);

  const handleNavMenuExperience = useCallback(() => {
    if (isUnderlayerActive) {
      performTransitionToSlide(() => {
        setIsProjectsCollectionOpen(false);
        setSelectedProject(null);
        setIsAboutUnderlayerOpen(false);
        setIsExperienceUnderlayerOpen(false);
        setActiveSlide(3);
      }, '#experience');
    } else {
      handleSelectSlide(3);
    }
  }, [isUnderlayerActive, performTransitionToSlide, handleSelectSlide]);

  const handleNavMenuContact = useCallback(() => {
    if (isUnderlayerActive) {
      performTransitionToSlide(() => {
        setIsProjectsCollectionOpen(false);
        setSelectedProject(null);
        setIsAboutUnderlayerOpen(false);
        setIsExperienceUnderlayerOpen(false);
        setActiveSlide(4);
      }, '#contact');
    } else {
      handleSelectSlide(4);
    }
  }, [isUnderlayerActive, performTransitionToSlide, handleSelectSlide]);

  return (
    <div
      className={`portfolio-app-root is-slide-mode ${
        transitionPhase === 'to-underlayer' ? 'is-transitioning-to-underlayer' : ''
      } ${transitionPhase === 'to-slide' ? 'is-transitioning-to-slide' : ''}`}
    >
      {/* Kursor desktop kustom interaktif */}
      <CustomCursor />

      <div className="portfolio-presentation-root">
        {/* Latar belakang selestial atmosfer bulan dan bintang */}
        <PortfolioBackground
          activeSlideIndex={activeSlide}
          isUnderlayerOpen={isUnderlayerActive}
        />

        {/* Navigasi header tetap: Nama Steven Wang HANYA muncul pada halaman HOME */}
        <HeaderNavigation
          isHome={isHome}
          isUnderlayerOpen={isUnderlayerActive}
          onNavigateHome={handleNavMenuHome}
          onNavigateAbout={handleNavMenuAbout}
          onNavigateProjects={handleNavMenuProjects}
          onNavigateExperience={handleNavMenuExperience}
          onNavigateContact={handleNavMenuContact}
          onCloseUnderlayer={() => {
            if (selectedProject) {
              handleCloseProjectDetail();
            } else {
              handleCloseAllUnderlayers();
            }
          }}
        />

        {/* Indikator titik kemajuan slide di sebelah kiri */}
        <PaginationIndicator
          currentSlide={activeSlide}
          totalSlides={totalSlides}
          onSelectSlide={handleSelectSlide}
          isUnderlayerOpen={isUnderlayerActive}
        />

        {/* Viewport Deck Slide Utama (Sesuai Urutan Master Editorial: HOME -> ABOUT ME -> PROJECT -> EXPERIENCE -> GET IN TOUCH / FOOTER) */}
        <main className="portfolio-slider-viewport">
          {/* 00: HOME / HERO SLIDE */}
          <PortfolioSlide
            type="top"
            isActive={activeSlide === 0}
          />

          {/* 01: ABOUT ME SLIDE (Muncul SEBELUM Project) */}
          <PortfolioSlide
            type="about"
            isActive={activeSlide === 1}
            onOpenAbout={handleOpenAbout}
          />

          {/* 02: PROJECT SLIDE (Muncul SETELAH About Me, preview minimal) */}
          <PortfolioSlide
            type="project"
            isActive={activeSlide === 2}
            onOpenProjects={handleOpenProjectsCollection}
          />

          {/* 03: EXPERIENCE SLIDE (Muncul SETELAH Project) */}
          <PortfolioSlide
            type="experience"
            isActive={activeSlide === 3}
            onOpenExperience={handleOpenExperience}
          />

          {/* 04: GET IN TOUCH & FOOTER SLIDE */}
          <PortfolioSlide
            type="contact"
            isActive={activeSlide === 4}
            onOpenFeaturedProject={() => handleSelectProject(projects[0])}
            onNavigateHome={handleNavigateHome}
            onNavigateAboutNav={() => handleSelectSlide(1)}
            onNavigateProjectsNav={() => handleSelectSlide(2)}
            onNavigateExperienceNav={() => handleSelectSlide(3)}
            onNavigateContact={() => handleSelectSlide(4)}
          />
        </main>

        {/* Halaman Dedikasi About Me (Underlayer - dapat diakses via navigasi) */}
        {isAboutUnderlayerOpen && (
          <AboutDetail
            onClose={handleCloseAbout}
            onNavigateHome={handleNavigateHome}
            onNavigateAbout={handleOpenAbout}
            onNavigateProjects={handleOpenProjectsCollection}
            onNavigateExperience={handleOpenExperience}
            onNavigateContact={() => handleSelectSlide(4)}
          />
        )}

        {/* Halaman Dedikasi Koleksi Project (Underlayer) */}
        {isProjectsCollectionOpen && !selectedProject && (
          <ProjectsCollection
            onSelectProject={handleSelectProject}
            onClose={handleCloseProjectsCollection}
            onNavigateHome={handleNavigateHome}
            onNavigateAbout={handleOpenAbout}
            onNavigateProjects={handleOpenProjectsCollection}
            onNavigateExperience={handleOpenExperience}
            onNavigateContact={() => handleSelectSlide(4)}
          />
        )}

        {/* Halaman Dedikasi Studi Kasus Project (Nusa Bot, Arvion, IITC) */}
        {selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onClose={handleCloseProjectDetail}
            onNavigateHome={handleNavigateHome}
            onNavigateAbout={handleOpenAbout}
            onNavigateProjects={handleOpenProjectsCollection}
            onNavigateExperience={handleOpenExperience}
            onNavigateContact={() => handleSelectSlide(4)}
          />
        )}

        {/* Halaman Dedikasi Experience (Sertifikat & Pembelajaran) */}
        {isExperienceUnderlayerOpen && (
          <ExperienceDetail
            onClose={handleCloseExperience}
            onNavigateHome={handleNavigateHome}
            onNavigateAbout={handleOpenAbout}
            onNavigateProjects={handleOpenProjectsCollection}
            onNavigateExperience={handleOpenExperience}
            onNavigateContact={() => handleSelectSlide(4)}
          />
        )}
      </div>
    </div>
  );
}
