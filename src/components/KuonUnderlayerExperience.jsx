import { useState, useEffect, useRef } from 'react';
import { certificates, currentlyLearning } from '../data/portfolioData';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function KuonUnderlayerExperience({ onClose }) {
  const containerRef = useRef(null);
  const [selectedCert, setSelectedCert] = useState(null);

  // Scroll to top immediately when opened
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

  // Hook for scroll reveals
  useScrollReveal(containerRef, [selectedCert]);

  return (
    <div
      className="underlayer-view is-visible"
      ref={containerRef}
      role="main"
      aria-label="Certificates and Learning"
    >
      {/* Main Content Wrapper with Controlled Editorial Spacing */}
      <section className="wrapper wrapper--detail-page">
        <div className="container">
          {/* Main Title Section */}
          <div className="text text--top reveal-on-scroll">
            <p className="heading-num">03</p>
            <div className="text__wrap text__wrap--top content">
              <h1 className="heading heading--top">CERTIFICATES & LEARNING</h1>
              <div className="border js-toRight" style={{ margin: '1.2rem 0 1.8rem' }}>
                <span></span>
                <span></span>
              </div>
              <p className="projects-collection-lead">
                Documenting skills development, coursework certificates, and continuous exploration in UI/UX design and web technologies.
              </p>
            </div>
          </div>

          {/* If a Certificate is selected, show Certificate Detail / Preview */}
          {selectedCert ? (
            <div className="content cert-detail-view reveal-on-scroll">
              <div className="cert-detail-header">
                <button
                  type="button"
                  className="btn-back-to-list"
                  onClick={() => setSelectedCert(null)}
                >
                  ← BACK TO CERTIFICATES
                </button>
              </div>

              <div className="cert-detail-card">
                <div className="cert-detail-meta">
                  <span className="cert-num-badge">{selectedCert.number}</span>
                  <span className="cert-category-badge">{selectedCert.category}</span>
                </div>

                <h2 className="cert-detail-title">{selectedCert.title}</h2>

                <div className="cert-detail-grid">
                  <div className="cert-field">
                    <span className="cert-field-label">ISSUED BY:</span>
                    <span className="cert-field-val">{selectedCert.issuer}</span>
                  </div>
                  <div className="cert-field">
                    <span className="cert-field-label">DATE / YEAR:</span>
                    <span className="cert-field-val">{selectedCert.year}</span>
                  </div>
                  <div className="cert-field">
                    <span className="cert-field-label">CATEGORY:</span>
                    <span className="cert-field-val">{selectedCert.category}</span>
                  </div>
                </div>

                <div className="cert-desc-box">
                  <span className="cert-field-label">DESCRIPTION:</span>
                  <p className="cert-desc-text">{selectedCert.description}</p>
                </div>

                {/* Certificate Preview Image (Preserved actual certificate image with Kuon reveal) */}
                <div className="cert-preview-area">
                  <span className="cert-field-label">CERTIFICATE PREVIEW:</span>
                  <div className="editorial-img-container cert-preview-frame">
                    <img
                      src={selectedCert.image}
                      alt={selectedCert.title}
                      className="editorial-img-reveal"
                      loading="eager"
                    />
                  </div>
                </div>

                <div className="cert-detail-actions">
                  <button
                    type="button"
                    className="back-btn"
                    onClick={() => setSelectedCert(null)}
                  >
                    BACK
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Editorial Certificate List */
            <div className="content cert-editorial-container">
              <div className="cert-editorial-list">
                {certificates.map((cert, idx) => (
                  <div
                    key={cert.id}
                    className="cert-editorial-item reveal-on-scroll"
                    style={{ animationDelay: `${idx * 0.14}s` }}
                    onClick={() => setSelectedCert(cert)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedCert(cert);
                      }
                    }}
                  >
                    <div className="cert-item-left">
                      <span className="cert-item-num">{cert.number}</span>
                      <div className="cert-item-info">
                        <h2 className="cert-item-title">{cert.title}</h2>
                        <p className="cert-item-meta">
                          <span>{cert.issuer}</span>
                          <span className="meta-sep">·</span>
                          <span>{cert.year}</span>
                          <span className="meta-sep">·</span>
                          <span className="cert-item-cat">{cert.category}</span>
                        </p>
                      </div>
                    </div>

                    <div className="cert-item-preview-thumb">
                      <div className="editorial-img-container cert-thumb-wrap">
                        <img
                          src={cert.image}
                          alt={`${cert.title} preview`}
                          className="editorial-img-reveal"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    <div className="cert-item-right">
                      <span className="btn-view-cert">
                        <span>VIEW CERTIFICATE</span>
                        <span className="cert-arrow">→</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* 18. CURRENTLY LEARNING — Small Editorial Section */}
              <div className="currently-learning-editorial reveal-on-scroll">
                <div className="text" style={{ margin: '5rem 0 2rem' }}>
                  <p className="heading-num" style={{ fontSize: '1.2rem', color: 'var(--kuon-coral)' }}>+</p>
                  <div className="text__wrap">
                    <h2 className="heading heading--left" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
                      CURRENTLY LEARNING
                    </h2>
                    <p style={{ color: '#475569', fontSize: '1.05rem', margin: '0.8rem 0 2rem' }}>
                      Active focus areas in design and front-end engineering:
                    </p>
                  </div>
                </div>

                <div className="learning-tags-grid">
                  {currentlyLearning.map((topic, i) => (
                    <div key={i} className="learning-tag-card">
                      <span className="learning-tag-dot"></span>
                      <span className="learning-tag-title">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Back Button */}
              <div className="content content--mlarge back-btn-wrap reveal-on-scroll">
                <button type="button" className="back-btn" onClick={onClose}>
                  BACK
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
