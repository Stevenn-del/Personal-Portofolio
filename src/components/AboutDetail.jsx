import { useState, useEffect, useRef } from 'react';
import { personalInfo, personalityInterests, skillSetColumns } from '../data/portfolioData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import DetailFooter from './DetailFooter';

// Ikon representasi visual untuk setiap skill teknis
const skillIcons = {
  html: (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
      <path d="M4 3l1.6 17 6.4 2 6.4-2L20 3H4z" fill="#E34F26"/>
      <path d="M12 4.6v15.7l5.2-1.6L18.4 4.6H12z" fill="#EF652A"/>
      <path d="M12 8.6H8.2l.2 2.6H12v2.6H8.5l.3 3.6 3.2 1 3.2-1 .4-4.8H12" fill="#fff"/>
    </svg>
  ),
  css: (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
      <path d="M4 3l1.6 17 6.4 2 6.4-2L20 3H4z" fill="#1572B6"/>
      <path d="M12 4.6v15.7l5.2-1.6L18.4 4.6H12z" fill="#33A9DC"/>
      <path d="M12 8.6H8.2l.2 2.6H12v2.6H8.5l.3 3.6 3.2 1 3.2-1 .4-4.8H12" fill="#fff"/>
    </svg>
  ),
  js: (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#F7DF1E"/>
      <path d="M12.5 17.5c.8.5 1.7.8 2.6.8 1.4 0 2.2-.7 2.2-1.8 0-1.2-.8-1.7-2.3-2.3-2.1-.8-3.5-1.9-3.5-3.8 0-1.9 1.5-3.3 3.8-3.3 1.3 0 2.3.4 3 .8l-.8 1.8c-.6-.4-1.3-.7-2.2-.7-1.1 0-1.8.6-1.8 1.4 0 1 .7 1.4 2.2 2 2.2.9 3.6 2 3.6 4.1 0 2.2-1.7 3.6-4.3 3.6-1.5 0-2.8-.4-3.7-1l.7-1.8zm-6.2.2c.7.4 1.5.7 2.4.7 1.2 0 2-.6 2-2.3v-8h2.3v8.1c0 2.8-1.7 4.2-4.3 4.2-1.3 0-2.4-.4-3.1-.9l.7-1.8z" fill="#000"/>
    </svg>
  ),
  react: (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 12 12)"/>
      <circle cx="12" cy="12" r="2" fill="#61DAFB"/>
    </svg>
  ),
  mysql: (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="6" rx="8" ry="3" stroke="#00758F" strokeWidth="1.6"/>
      <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" stroke="#00758F" strokeWidth="1.6"/>
      <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" stroke="#00758F" strokeWidth="1.6"/>
    </svg>
  ),
  figma: (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
      <path d="M8 2h4v4H8a2 2 0 1 1 0-4z" fill="#F24E1E"/>
      <path d="M12 2h4a2 2 0 1 1 0 4h-4V2z" fill="#FF7262"/>
      <path d="M8 6h4v4H8a2 2 0 1 1 0-4z" fill="#A259FF"/>
      <path d="M12 6h4a2 2 0 1 1 0 4h-4V6z" fill="#1ABCFE"/>
      <path d="M8 10h4v4a2 2 0 1 1-4 0v-4z" fill="#0ACF83"/>
      <circle cx="14" cy="12" r="2" fill="#1ABCFE"/>
    </svg>
  )
};

// Komponen halaman detail About Me (Underlayer).
// Mengikuti tata letak editorial asimetris Kuon Yagi:
// 1. Introduksi halaman (.page-top) dengan tombol Back dan SCROLLDOWN.
// 2. 01 WHO I AM: Nomor & judul di kiri, teks biografi + foto profil bersisian di kanan.
// 3. 02 PASSION: Tiga kolom editorial (Design, Technology, Story).
// 4. 03 SKILL SET: Dua kolom kemampuan dengan animasi angka persentase.
// 5. GET IN TOUCH, Footer, dan tombol BACK.
export default function AboutDetail({
  onClose,
  onNavigateHome,
  onNavigateAbout,
  onNavigateProjects,
  onNavigateExperience,
  onNavigateContact,
}) {
  const containerRef = useRef(null);
  const contentWrapperRef = useRef(null);
  const skillsRef = useRef(null);
  const [animatedRatio, setAnimatedRatio] = useState(0);
  const [hasAnimatedSkills, setHasAnimatedSkills] = useState(false);

  // Scroll ke posisi paling atas saat halaman dibuka & pasang shortcut Escape
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Hook animasi scroll reveal untuk memunculkan elemen saat terlihat di layar
  useScrollReveal(containerRef);

  // Fungsi scroll halus menuju konten utama
  const scrollToContent = () => {
    if (contentWrapperRef.current) {
      contentWrapperRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Animasi angka dan bilah persentase skill (dijalankan 1 kali selama 1.45 detik)
  useEffect(() => {
    if (hasAnimatedSkills || !skillsRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimatedSkills) {
          setHasAnimatedSkills(true);
          const duration = 1450;
          const startTime = performance.now();
          const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

          const step = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            setAnimatedRatio(easeOutCubic(progress));
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setAnimatedRatio(1);
            }
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      {
        root: containerRef.current,
        threshold: 0.15
      }
    );

    observer.observe(skillsRef.current);
    return () => observer.disconnect();
  }, [hasAnimatedSkills]);

  return (
    <div
      className="underlayer-view is-visible"
      ref={containerRef}
      role="main"
      aria-label="About Steven Wang"
    >
      {/* -------------------------------------------------------------
          1. INTRODUKSI HALAMAN DEDIKASI (.page-top)
          Memuat tombol panah kembali, indikator SCROLLDOWN, judul besar,
          dan komposisi visual dengan teks DESIGN di sebelah kanan
          ------------------------------------------------------------- */}
      <section className="page-top" aria-label="About Me Page Introduction">
        <div className="page-top__inner">
          {/* Tombol panah kembali di pojok kiri atas */}
          <button
            type="button"
            className="back-arrow"
            onClick={onClose}
            aria-label="Back to previous page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="34" viewBox="0 0 67 34">
              <g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" transform="translate(2 1)">
                <path strokeWidth="2.5" d="M0,15.5533333 L64,15.5533333" />
                <polyline strokeWidth="2.5" points="15.556 0 0 15.556 15.556 31.111" />
              </g>
            </svg>
          </button>

          {/* Indikator scroll vertikal SCROLLDOWN */}
          <p className="scrollDown" onClick={scrollToContent} role="button" tabIndex={0}>
            SCROLLDOWN
          </p>

          {/* Area judul kiri: About Me + Garis aksen koral + Subjudul */}
          <div className="title">
            <h1 className="title__text">About<br />Me</h1>
            <div className="border js-toRight">
              <span></span>
              <span></span>
            </div>
            <p className="title__lead">
              I love Design, Technology,<br />and Story.
            </p>
            <div className="btn-wrap">
              <button
                type="button"
                className="btn btn--scout"
                onClick={scrollToContent}
                aria-label="Explore About Steven Wang profile"
              >
                <span>EXPLORE</span>
              </button>
            </div>
          </div>

          {/* Area visual kanan: Tipografi besar DESIGN dengan latar foto portrait Steven */}
          <div
            className="image image--about-hero"
            onClick={scrollToContent}
            role="button"
            tabIndex={0}
            aria-label="Scroll down into profile"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollToContent();
              }
            }}
          >
            <div className="image__over">
              <div className="image__cover"></div>
              <div className="image__cover"></div>
            </div>
            <div className="hero-text-overlay" aria-hidden="true">
              DESIGN
            </div>
            <div className="page-num">
              <p>01</p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          2. KONTEN DETAIL EDITORIAL
          Struktur terorganisir tanpa teks/subtitle redundan
          ------------------------------------------------------------- */}
      <section
        className="wrapper wrapper--detail-page"
        ref={contentWrapperRef}
        aria-label="Steven Wang Biography and Background"
      >
        {/* Ruang bernafas editorial sebelum konten utama */}
        <div className="content project-intro-breathing-space">
          <div className="editorial-eyebrow-divider">
            <span className="eyebrow-dot"></span>
            <span className="eyebrow-text">PROFILE &middot; BIOGRAPHY &middot; PERSPECTIVE</span>
          </div>
        </div>

        {/* -------------------------------------------------------------
            01 WHO I AM — Tata Letak Asimetris Editorial (Requirement 4 & 5)
            KIRI: Nomor section (01) + Judul (WHO I AM)
            KANAN: Komposisi bersisian (Side-by-side)
                   - Kiri kanan: Teks biografi ringkas Steven Wang
                   - Kanan kanan: Foto profil Steven Wang
            Foto TIDAK berada di bawah teks pada layar desktop.
            ------------------------------------------------------------- */}
        <div className="who container">
          <div className="text text--top reveal-on-scroll who__section">
            <p className="heading-num">01</p>
            <div className="who__main-col">
              <div className="who__header">
                <h2 className="heading heading--top">WHO<br />I AM</h2>
              </div>
              
              {/* Komposisi bersisian antara teks biografi di bawah judul dan foto profil di sebelah kanan */}
              <div className="who__editorial-grid">
                <div className="who__content-pane">
                  <div className="who__name">
                    <h3 className="who__jp">{personalInfo.name.toUpperCase()}</h3>
                    <p className="who__en">{personalInfo.roleTitle}</p>
                  </div>
                  <div className="who__text">
                    {personalInfo.bioParagraphs.map((para, idx) => (
                      <p key={idx} className="bio-para">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Foto Profil Steven Wang di sisi kanan komposisi */}
                <div className="who__visual-pane">
                  <div className="editorial-img-container who__portrait-frame">
                    <img
                      src="/images/steven-portrait.jpg"
                      alt="Steven Wang - Student & Aspiring UI/UX Designer"
                      className="editorial-img-reveal"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------
            02 PASSION — Tiga Kolom Editorial (Design, Technology, Story)
            ------------------------------------------------------------- */}
        <div className="passion container">
          <div className="text reveal-on-scroll">
            <p className="heading-num">02</p>
            <div className="text__wrap content">
              <h2 className="heading">PASSION</h2>
            </div>
          </div>

          <div className="content content--mlarge">
            <ul className="passion__list">
              {personalityInterests.map((interest, idx) => (
                <li
                  key={interest.category}
                  className="passion__item reveal-on-scroll"
                  style={{ animationDelay: `${idx * 0.15}s` }}
                >
                  <div className="passion__image" aria-hidden="true">
                    {interest.category === 'DESIGN' && (
                      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--editorial-coral)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" strokeDasharray="3 3"></circle>
                        <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                        <circle cx="11" cy="11" r="2"></circle>
                      </svg>
                    )}
                    {interest.category === 'TECHNOLOGY' && (
                      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--editorial-coral)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="16 18 22 12 16 6"></polyline>
                        <polyline points="8 6 2 12 8 18"></polyline>
                        <line x1="14" y1="4" x2="10" y2="20"></line>
                        <rect x="2" y="2" width="20" height="20" rx="3" strokeOpacity="0.4"></rect>
                      </svg>
                    )}
                    {interest.category === 'STORY' && (
                      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--editorial-coral)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                        <line x1="9" y1="7" x2="15" y2="7"></line>
                        <line x1="9" y1="11" x2="13" y2="11"></line>
                      </svg>
                    )}
                  </div>
                  <h3 className="sub-title">{interest.category}</h3>
                  <p className="passion__text">{interest.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* -------------------------------------------------------------
            03 SKILL SET — Daftar Kemampuan dalam 2 Kolom dengan Animasi Persentase
            ------------------------------------------------------------- */}
        <div className="skill-set container" ref={skillsRef}>
          <div className="text reveal-on-scroll">
            <p className="heading-num">03</p>
            <div className="text__wrap content">
              <h2 className="heading">SKILL SET</h2>
            </div>
          </div>

          <div className="content content--mlarge skill-set__flex">
            {/* Kolom 1: HTML 85%, CSS 70%, JavaScript 50% */}
            <ul className="skill-set__list">
              {skillSetColumns.column1.map((skill, idx) => {
                const currentVal = Math.round(skill.percentage * animatedRatio);
                const currentWidth = (skill.percentage * animatedRatio).toFixed(1);
                return (
                  <li
                    key={skill.name}
                    className="skill-set__item reveal-on-scroll"
                    style={{ animationDelay: `${idx * 0.12}s` }}
                  >
                    <div className="skill-set__icon">
                      {skillIcons[skill.icon]}
                    </div>
                    <div className="skill-set__detail">
                      <div className="skill-set__meta">
                        <div className="skill-set__name">
                          <h4 className="small-title small-title--skill">{skill.name}</h4>
                          <p className="skill-set__year">{skill.level.toUpperCase()}</p>
                        </div>
                        <div className="skill-set__ratio">
                          <span className="skill-set__high">{currentVal}</span>%
                        </div>
                      </div>
                      <div className="skill-set__bar">
                        <div
                          className="skill-set__bar-fill"
                          style={{ width: `${currentWidth}%` }}
                        ></div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Kolom 2: React 30%, MySQL 50%, Figma 80% */}
            <ul className="skill-set__list">
              {skillSetColumns.column2.map((skill, idx) => {
                const currentVal = Math.round(skill.percentage * animatedRatio);
                const currentWidth = (skill.percentage * animatedRatio).toFixed(1);
                return (
                  <li
                    key={skill.name}
                    className="skill-set__item reveal-on-scroll"
                    style={{ animationDelay: `${(idx + 3) * 0.12}s` }}
                  >
                    <div className="skill-set__icon">
                      {skillIcons[skill.icon]}
                    </div>
                    <div className="skill-set__detail">
                      <div className="skill-set__meta">
                        <div className="skill-set__name">
                          <h4 className="small-title small-title--skill">{skill.name}</h4>
                          <p className="skill-set__year">{skill.level.toUpperCase()}</p>
                        </div>
                        <div className="skill-set__ratio">
                          <span className="skill-set__high">{currentVal}</span>%
                        </div>
                      </div>
                      <div className="skill-set__bar">
                        <div
                          className="skill-set__bar-fill"
                          style={{ width: `${currentWidth}%` }}
                        ></div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* FOOTER DETAIL DENGAN KONTAK DAN TOMBOL KEMBALI */}
        <DetailFooter
          onClose={onClose}
          onNavigateHome={onNavigateHome}
          onNavigateAbout={onNavigateAbout}
          onNavigateProjects={onNavigateProjects}
          onNavigateExperience={onNavigateExperience}
          onNavigateContact={onNavigateContact}
        />
      </section>
    </div>
  );
}
