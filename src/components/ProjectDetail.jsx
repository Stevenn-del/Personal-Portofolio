import { useEffect, useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import DetailFooter from './DetailFooter';

// Komponen ini menampilkan halaman studi kasus detail untuk setiap project (Underlayer).
// Mematuhi alur halaman studi kasus Kuon Yagi:
// 1. Introduksi Halaman (.page-top): Nama Project, Kategori, Role, Tahun, tombol panah kembali, dan visual kanan.
// 2. Gambar Utama Project (Full Main Mockup Image).
// 3. 01 OVERVIEW: Ringkasan tujuan dan latar belakang project.
// 4. 02 CONCEPT: Landasan konsep desain.
// 5. Visual Banner Lebar (Big Image).
// 6. 03 DESIGN PROCESS: Tahapan perancangan (Research, User Flow, Wireframing, UI Design, Prototype).
// 7. 04 KEY FEATURES: Fitur-fitur utama antarmuka.
// 8. Tampilan Layar Bersisian (Dual Screen Previews / Kamp).
// 9. 05 FINAL RESULT & 06 REFLECTION.
// 10. GET IN TOUCH, Footer, dan tombol BACK.
export default function ProjectDetail({
  project,
  onClose,
  onNavigateHome,
  onNavigateAbout,
  onNavigateProjects,
  onNavigateExperience,
  onNavigateContact,
}) {
  const containerRef = useRef(null);
  const contentWrapperRef = useRef(null);

  // Scroll ke posisi paling atas saat halaman studi kasus dibuka
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
  }, [project, onClose]);

  // Hook scroll reveal untuk memunculkan teks dan gambar secara halus saat di-scroll
  useScrollReveal(containerRef, [project]);

  const scrollToContent = () => {
    if (contentWrapperRef.current) {
      contentWrapperRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!project) return null;

  return (
    <div
      className="underlayer-view is-visible"
      ref={containerRef}
      role="main"
      aria-label={`Project details for ${project.name}`}
    >
      {/* -------------------------------------------------------------
          1. INTRODUKSI HALAMAN STUDI KASUS (.page-top)
          Memuat tombol panah kembali, indikator SCROLLDOWN, judul project,
          kategori, peran, tahun, dan visual artwork di sebelah kanan
          ------------------------------------------------------------- */}
      <section className="page-top" aria-label="Project Page Introduction">
        <div className="page-top__inner">
          {/* Tombol panah kembali ke tampilan sebelumnya */}
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

          {/* Area judul kiri: Nama Project, Garis Koral, Kategori, Role, Tahun */}
          <div className="title">
            <h1 className="title__text">{project.name}</h1>
            <div className="border js-toRight">
              <span></span>
              <span></span>
            </div>
            <p className="title__lead">{project.category}</p>

            <div className="page-top__meta-row">
              <div className="page-top__meta-item">
                <span className="meta-label">ROLE</span>
                <span className="meta-val">{project.role}</span>
              </div>
              <span className="meta-divider">/</span>
              <div className="page-top__meta-item">
                <span className="meta-label">YEAR</span>
                <span className="meta-val">{project.year}</span>
              </div>
            </div>

            <div className="btn-wrap">
              <button
                type="button"
                className="btn"
                onClick={scrollToContent}
                aria-label={`Explore case study for ${project.name}`}
              >
                <span>EXPLORE CASE STUDY</span>
              </button>
            </div>
          </div>

          {/* Area visual kanan dengan artwork project */}
          <div
            className="image image--project-hero"
            style={{ backgroundImage: `url(${project.image})` }}
            onClick={scrollToContent}
            role="button"
            tabIndex={0}
            aria-label="Scroll down into case study"
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
            <div className="page-num">
              <p>{project.number || '01'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          2. KONTEN STUDI KASUS DETAIL
          Alur terstruktur: Gambar Utama -> 01 Overview -> 02 Concept ->
          Visual Banner -> 03 Design Process -> 04 Key Features ->
          Dual Screens -> 05 Final Result -> 06 Reflection
          ------------------------------------------------------------- */}
      <section
        className="wrapper wrapper--detail-page"
        ref={contentWrapperRef}
        aria-label="Project Editorial Case Study"
      >
        {/* Ruang bernafas editorial sebelum gambar utama */}
        <div className="content project-intro-breathing-space">
          <div className="editorial-eyebrow-divider">
            <span className="eyebrow-dot"></span>
            <span className="eyebrow-text">CASE STUDY &middot; {project.category}</span>
          </div>
        </div>

        {/* GAMBAR UTAMA PROJECT — Mockup antarmuka berukuran besar */}
        <div className="content project-featured-image-wrapper reveal-on-scroll">
          <div className="editorial-img-container">
            <img
              src={project.image}
              alt={`${project.name} Featured Interface Preview`}
              className="editorial-img-reveal"
              loading="eager"
            />
          </div>
        </div>

        {/* 01 OVERVIEW */}
        <div className="text reveal-on-scroll">
          <p className="heading-num">01</p>
          <div className="text__wrap">
            <h2 className="heading">OVERVIEW</h2>
            <div className="text__works">
              <p className="editorial-lead-body">
                {project.overview ||
                  "A regional-language learning interface designed to help young users explore Indonesian regional languages through a simple, interactive, and enjoyable experience."}
              </p>
            </div>
          </div>
        </div>

        {/* 02 CONCEPT */}
        {project.conceptText && (
          <div className="text reveal-on-scroll">
            <p className="heading-num">02</p>
            <div className="text__wrap">
              <h2 className="heading">{project.conceptTitle || 'CONCEPT'}</h2>
              <div className="text__works">
                <p className="editorial-lead-body">
                  {project.conceptText}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* VISUAL BANNER LEBAR (BIG IMAGE) */}
        <div className="big-image-wrap reveal-on-scroll">
          <div
            className="big-image editorial-img-container"
            style={{
              backgroundImage: `url(${project.image})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
            aria-hidden="true"
          ></div>
        </div>

        {/* 03 DESIGN PROCESS */}
        {project.devProcessSteps && project.devProcessSteps.length > 0 && (
          <div className="text reveal-on-scroll">
            <p className="heading-num">03</p>
            <div className="text__wrap">
              <h2 className="heading heading--left">{project.devTitle || 'DESIGN PROCESS'}</h2>
              <div className="text__works">
                <ul className="editorial-bullet-list">
                  {project.devProcessSteps.map((step, idx) => (
                    <li key={idx} className="process-step-row">
                      <span className="bullet-dot"></span>
                      <div className="process-step-content">
                        <strong className="process-step-phase">{step.phase}:</strong>
                        <span className="process-step-detail"> {step.detail}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 04 KEY FEATURES */}
        {project.keyFeatures && project.keyFeatures.length > 0 && (
          <div className="text reveal-on-scroll">
            <p className="heading-num">04</p>
            <div className="text__wrap">
              <h2 className="heading heading--left">{project.keyFeaturesTitle || 'KEY FEATURES'}</h2>
              <div className="text__works">
                <ul className="editorial-bullet-list">
                  {project.keyFeatures.map((feat, idx) => (
                    <li key={idx} className="process-step-row">
                      <span className="bullet-dot"></span>
                      <span className="feature-item-text">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAMPILAN PREVIEW BERSIHAN (DUAL SCREEN / KAMP) */}
        <div className="kamp reveal-on-scroll">
          <ul>
            <li className="editorial-img-container">
              <img
                src={project.image}
                alt={`${project.name} UI Preview 1`}
                className="editorial-img-reveal"
                loading="lazy"
              />
            </li>
            <li className="editorial-img-container">
              <img
                src={project.image}
                alt={`${project.name} UI Preview 2`}
                className="editorial-img-reveal"
                loading="lazy"
              />
            </li>
          </ul>
        </div>

        {/* 05 FINAL RESULT */}
        {project.resultText && (
          <div className="text reveal-on-scroll">
            <p className="heading-num">05</p>
            <div className="text__wrap">
              <h2 className="heading">{project.resultTitle || 'FINAL RESULT'}</h2>
              <div className="text__works">
                <p className="editorial-lead-body">
                  {project.resultText}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 06 REFLECTION */}
        {project.reflectionText && (
          <div className="text reveal-on-scroll">
            <p className="heading-num">06</p>
            <div className="text__wrap">
              <h2 className="heading">{project.reflectionTitle || 'REFLECTION'}</h2>
              <div className="text__works">
                <p className="editorial-lead-body">
                  {project.reflectionText}
                </p>
              </div>
            </div>
          </div>
        )}

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
