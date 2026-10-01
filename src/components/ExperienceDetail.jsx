import { useState, useEffect, useRef } from 'react';
import { certificates, activities, currentlyLearning } from '../data/portfolioData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import DetailFooter from './DetailFooter';

// Komponen ini menampilkan halaman detail Pengalaman, Sertifikat, dan Pembelajaran (Underlayer).
// Struktur halaman mencakup:
// 1. Introduksi Halaman (.page-top): Judul EXPERIENCE, Subjudul CERTIFICATES & LEARNING, dan visual LEARNING.
// 2. 01 CERTIFICATES & LEARNING: Setiap sertifikat memuat Nomor, Info Sertifikat, Gambar Sertifikat, dan tombol View.
//    Gambar dan teks berada dalam satu baris komposisi visual pada desktop (tidak terpisah).
// 3. 02 COMPETITIONS & ACTIVITIES: Menampilkan aktivitas kompetisi nyata (IITC UI/UX Competition).
// 4. 03 CURRENTLY LEARNING: Fokus bidang yang sedang dipelajari secara aktif.
// 5. GET IN TOUCH, Footer, dan tombol BACK.
export default function ExperienceDetail({
  onClose,
  onNavigateHome,
  onNavigateAbout,
  onNavigateProjects,
  onNavigateExperience,
  onNavigateContact,
}) {
  const containerRef = useRef(null);
  const contentWrapperRef = useRef(null);
  const [selectedCert, setSelectedCert] = useState(null);

  // Scroll ke posisi paling atas saat halaman dibuka & pasang tombol Escape
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedCert) {
          setSelectedCert(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, selectedCert]);

  // Hook scroll reveal untuk memunculkan elemen secara bertahap saat di-scroll
  useScrollReveal(containerRef, [selectedCert]);

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
      aria-label="Certificates and Learning"
    >
      {/* -------------------------------------------------------------
          1. INTRODUKSI HALAMAN DEDIKASI (.page-top)
          Memuat tombol panah kembali, indikator SCROLLDOWN, judul EXPERIENCE,
          dan area visual dengan teks LEARNING
          ------------------------------------------------------------- */}
      <section className="page-top" aria-label="Experience Page Introduction">
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

          {/* Area judul kiri: EXPERIENCE + Garis aksen koral + Subjudul */}
          <div className="title">
            <h1 className="title__text">EXPERIENCE</h1>
            <div className="border js-toRight">
              <span></span>
              <span></span>
            </div>
            <p className="title__lead">
              CERTIFICATES &amp; LEARNING
            </p>
            <div className="page-top__meta-row">
              <div className="page-top__meta-item">
                <span className="meta-label">FOCUS</span>
                <span className="meta-val">UI/UX &amp; WEB DEV</span>
              </div>
              <span className="meta-divider">/</span>
              <div className="page-top__meta-item">
                <span className="meta-label">YEAR</span>
                <span className="meta-val">2026</span>
              </div>
            </div>
            <div className="btn-wrap">
              <button
                type="button"
                className="btn"
                onClick={scrollToContent}
                aria-label="Explore certificates and learning record"
              >
                <span>VIEW CERTIFICATES</span>
              </button>
            </div>
          </div>

          {/* Area visual kanan dengan overlay tipografi LEARNING */}
          <div
            className="image image--experience-hero"
            style={{ backgroundImage: "url('/images/project-arvion.jpg')" }}
            onClick={scrollToContent}
            role="button"
            tabIndex={0}
            aria-label="Scroll down into certificates list"
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
              LEARNING
            </div>
            <div className="page-num">
              <p>03</p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          2. KONTEN DETAIL SERTIFIKAT & PEMBELAJARAN
          ------------------------------------------------------------- */}
      <section
        className="wrapper wrapper--detail-page"
        ref={contentWrapperRef}
        aria-label="Certificates and Learning Details"
      >
        <div className="container" style={{ marginTop: '4rem' }}>
          {/* Header Bagian Experience */}
          <div className="text text--top reveal-on-scroll">
            <p className="heading-num">03</p>
            <div className="text__wrap text__wrap--top content">
              <h2 className="heading heading--top">EXPERIENCE</h2>
              <div className="border js-toRight" style={{ margin: '1.2rem 0 1.8rem' }}>
                <span></span>
                <span></span>
              </div>
              <p className="projects-collection-lead">
                Documenting coursework, certificates, skill validations, and continuous exploration in UI/UX design and front-end development.
              </p>
            </div>
          </div>

          {/* 3 Kolom Horizontal Editorial: Learning | Certificates | Competitions */}
          <div className="content experience-editorial-columns reveal-on-scroll">
            {/* KOLOM 1: CURRENTLY LEARNING */}
            <div className="exp-editorial-col exp-editorial-col--learning">
              <div className="exp-col-header">
                <span className="exp-col-num">01</span>
                <h3 className="exp-col-title">CURRENTLY LEARNING</h3>
              </div>
              <div className="exp-col-divider" />
              <ul className="exp-learning-list">
                <li>
                  <span className="exp-learning-bullet" />
                  <span className="exp-learning-name">UI/UX Design</span>
                </li>
                <li>
                  <span className="exp-learning-bullet" />
                  <span className="exp-learning-name">Figma</span>
                </li>
                <li>
                  <span className="exp-learning-bullet" />
                  <span className="exp-learning-name">Front-End Development</span>
                </li>
                <li>
                  <span className="exp-learning-bullet" />
                  <span className="exp-learning-name">JavaScript</span>
                </li>
                <li>
                  <span className="exp-learning-bullet" />
                  <span className="exp-learning-name">React</span>
                </li>
              </ul>
            </div>

            {/* KOLOM 2: CERTIFICATES */}
            <div className="exp-editorial-col exp-editorial-col--certs">
              <div className="exp-col-header">
                <span className="exp-col-num">02</span>
                <h3 className="exp-col-title">CERTIFICATES</h3>
              </div>
              <div className="exp-col-divider" />
              <div className="exp-certs-list">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="exp-cert-item"
                    onClick={() => setSelectedCert(cert)}
                    role="button"
                    tabIndex={0}
                    aria-label={`View certificate ${cert.title}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedCert(cert);
                      }
                    }}
                  >
                    <div className="exp-cert-thumb">
                      <img
                        src={cert.image}
                        alt={`${cert.title} preview`}
                        loading="lazy"
                      />
                    </div>
                    <div className="exp-cert-body">
                      <span className="exp-cert-num">{cert.number}</span>
                      <h4 className="exp-cert-title">{cert.title}</h4>
                      <p className="exp-cert-meta">
                        {cert.issuer} &middot; {cert.year}
                      </p>
                      <span className="exp-cert-action">VIEW &rarr;</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* KOLOM 3: COMPETITIONS & ACTIVITIES */}
            <div className="exp-editorial-col exp-editorial-col--competitions">
              <div className="exp-col-header">
                <span className="exp-col-num">03</span>
                <h3 className="exp-col-title">COMPETITIONS &amp; ACTIVITIES</h3>
              </div>
              <div className="exp-col-divider" />
              <div className="exp-activities-list">
                {activities.map((act) => (
                  <div key={act.id} className="exp-activity-item">
                    <span className="exp-activity-role">{act.role}</span>
                    <h4 className="exp-activity-title">{act.title}</h4>
                    <p className="exp-activity-meta">
                      {act.category} &middot; {act.year}
                    </p>
                    <p className="exp-activity-desc">{act.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Overlay Preview Sertifikat Terpilih */}
          {selectedCert && (
            <div
              className="cert-modal-overlay"
              role="dialog"
              aria-modal="true"
              onClick={() => setSelectedCert(null)}
            >
              <div className="cert-modal-backdrop" />
              <div className="cert-modal-card exp-cert-lightbox-card" onClick={(e) => e.stopPropagation()}>
                <div className="cert-modal-header" style={{ borderBottomColor: 'rgba(7, 33, 66, 0.1)' }}>
                  <div className="cert-detail-meta" style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                    <span className="cert-num-badge" style={{ fontFamily: 'var(--font-kuon-serif)', fontSize: '1.4rem', color: 'var(--kuon-coral)' }}>{selectedCert.number}</span>
                    <span className="cert-category-badge" style={{ fontFamily: 'var(--font-kuon-futura)', fontSize: '0.85rem', color: 'var(--kuon-coral)', letterSpacing: '0.1em' }}>{selectedCert.category}</span>
                  </div>
                  <button
                    type="button"
                    className="btn-cert-close"
                    onClick={() => setSelectedCert(null)}
                    aria-label="Close certificate preview"
                  >
                    CLOSE [ESC] &times;
                  </button>
                </div>

                <div className="cert-modal-body">
                  <h3 className="cert-detail-title" style={{ fontFamily: 'var(--font-kuon-futura)', fontSize: '1.4rem', margin: '0 0 1rem', color: '#072142' }}>
                    {selectedCert.title}
                  </h3>

                  <div className="cert-detail-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', margin: '1rem 0 1.5rem' }}>
                    <div className="cert-field">
                      <span className="cert-field-label" style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', fontWeight: 'bold' }}>ISSUED BY:</span>
                      <span className="cert-field-val" style={{ fontSize: '0.9rem', color: '#072142' }}>{selectedCert.issuer}</span>
                    </div>
                    <div className="cert-field">
                      <span className="cert-field-label" style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', fontWeight: 'bold' }}>DATE / YEAR:</span>
                      <span className="cert-field-val" style={{ fontSize: '0.9rem', color: '#072142' }}>{selectedCert.year}</span>
                    </div>
                    <div className="cert-field">
                      <span className="cert-field-label" style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', fontWeight: 'bold' }}>CATEGORY:</span>
                      <span className="cert-field-val" style={{ fontSize: '0.9rem', color: '#072142' }}>{selectedCert.category}</span>
                    </div>
                  </div>

                  <p className="cert-desc-text" style={{ fontSize: '1rem', lineHeight: '1.7', color: '#475569', margin: '0 0 1.5rem' }}>
                    {selectedCert.description}
                  </p>

                  <div className="editorial-img-container cert-preview-frame" style={{ borderRadius: '4px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(7, 33, 66, 0.15)' }}>
                    <img
                      src={selectedCert.image}
                      alt={selectedCert.title}
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                      loading="eager"
                    />
                  </div>
                </div>

                <div className="cert-modal-footer" style={{ marginTop: '1.8rem', textAlign: 'right' }}>
                  <button
                    type="button"
                    className="btn btn--editorial-reveal"
                    onClick={() => setSelectedCert(null)}
                  >
                    <span>CLOSE PREVIEW</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER DETAIL TANPA GET IN TOUCH (Sesuai panduan editorial: Get In Touch tidak berada di dalam Experience) */}
        <DetailFooter
          hideContact={true}
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
