import { useEffect, useRef } from 'react';
import { projects } from '../data/portfolioData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import DetailFooter from './DetailFooter';

// Komponen ini menampilkan halaman koleksi daftar project/karya terpilih (Underlayer).
// Setiap item project mematuhi aturan editorial:
// 1. Gambar project dan informasi project bersisian (side-by-side) pada desktop dengan layout berselang-seling.
// 2. Gambar memiliki nomor editorial terintegrasi di sudut kanan bawah (Kuon style reference).
// 3. Deskripsi singkat, kategori (UI/UX DESIGN · 2026), dan tombol "VIEW PROJECT →".
// 4. Klik pada gambar atau tombol membuka halaman studi kasus detail untuk project tersebut.
export default function ProjectsCollection({
  onSelectProject,
  onClose,
  onNavigateHome,
  onNavigateAbout,
  onNavigateProjects,
  onNavigateExperience,
  onNavigateContact,
}) {
  const containerRef = useRef(null);
  const contentWrapperRef = useRef(null);

  // Scroll ke posisi paling atas saat halaman pertama kali dibuka
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

  // Hook scroll reveal untuk memunculkan kartu project secara bertahap saat di-scroll
  useScrollReveal(containerRef, [projects]);

  const scrollToContent = () => {
    if (contentWrapperRef.current) {
      contentWrapperRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="underlayer-view is-visible"
      ref={containerRef}
      role="main"
      aria-label="Projects Collection"
    >
      {/* -------------------------------------------------------------
          1. INTRODUKSI HALAMAN DEDIKASI (.page-top)
          Memuat tombol panah kembali, indikator SCROLLDOWN, judul PROJECT,
          dan area visual dengan teks WORKS
          ------------------------------------------------------------- */}
      <section className="page-top" aria-label="Projects Page Introduction">
        <div className="page-top__inner">
          {/* Tombol panah kembali ke tampilan slide utama */}
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

          {/* Area judul kiri: PROJECT + Garis aksen koral + Subjudul */}
          <div className="title">
            <h1 className="title__text">PROJECT</h1>
            <div className="border js-toRight">
              <span></span>
              <span></span>
            </div>
            <p className="title__lead">
              SELECTED WORKS &amp; EXPLORATIONS
            </p>
            <div className="btn-wrap">
              <button
                type="button"
                className="btn"
                onClick={scrollToContent}
                aria-label="Explore selected projects list"
              >
                <span>EXPLORE WORKS</span>
              </button>
            </div>
          </div>

          {/* Area visual kanan dengan overlay tipografi WORKS */}
          <div
            className="image image--projects-hero"
            style={{ backgroundImage: "url('/images/project-nusa-bot.jpg')" }}
            onClick={scrollToContent}
            role="button"
            tabIndex={0}
            aria-label="Scroll down into projects collection"
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
              WORKS
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          2. DAFTAR KARYA TERPILIH (SELECTED WORKS)
          Format komposisi bersisian selang-seling (Alternating Layout)
          ------------------------------------------------------------- */}
      <section
        className="wrapper wrapper--detail-page"
        ref={contentWrapperRef}
        aria-label="Projects Collection List"
      >
        <div className="container" style={{ marginTop: '4rem' }}>
          {/* Judul Bagian Karya Terpilih */}
          <div className="text text--top reveal-on-scroll">
            <div className="text__wrap text__wrap--top content">
              <h2 className="heading heading--top">SELECTED WORKS</h2>
              <div className="border js-toRight" style={{ margin: '1.2rem 0 1.8rem' }}>
                <span></span>
                <span></span>
              </div>
              <p className="projects-collection-lead">
                Selected works, design concepts, and interface explorations designed for engagement and clarity.
              </p>
            </div>
          </div>

          {/* Daftar kartu project editorial berselang-seling */}
          <div className="content projects-collection-list">
            {projects.map((proj, idx) => {
              const isImageLeft = idx % 2 === 0;

              return (
                <article
                  key={proj.id}
                  className={`project-collection-item ${
                    isImageLeft ? '' : 'project-collection-item--reverse'
                  } reveal-on-scroll`}
                  style={{ animationDelay: `${idx * 0.12}s` }}
                >
                  {/* GAMBAR PROJECT */}
                  <div
                    className="project-collection-preview"
                    onClick={() => onSelectProject(proj)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Open ${proj.name} case study`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectProject(proj);
                      }
                    }}
                  >
                    <div className="editorial-img-container project-collection-img-wrap">
                      <img
                        src={proj.image}
                        alt={`${proj.name} Interface Preview`}
                        className="editorial-img-reveal"
                        loading="lazy"
                      />
                      <div className="project-collection-img-overlay">
                        <span>VIEW CASE STUDY</span>
                      </div>
                      <div className="project-collection-edge-num" aria-hidden="true">
                        {proj.number}
                      </div>
                    </div>
                  </div>

                  {/* INFORMASI PROJECT MINIMAL */}
                  <div className="project-collection-meta">
                    <div className="project-collection-top">
                      <span className="project-collection-num">PROJECT {proj.number}</span>
                    </div>
                    <h3 className="project-collection-title">{proj.name}</h3>
                    <p className="project-collection-category">
                      {proj.category} &middot; {proj.year}
                    </p>
                    <p className="project-collection-desc">{proj.shortDescription}</p>
                    <div className="project-collection-action">
                      <button
                        type="button"
                        className="btn btn--project-view"
                        onClick={() => onSelectProject(proj)}
                        aria-label={`View project details for ${proj.name}`}
                      >
                        <span>VIEW PROJECT</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
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
