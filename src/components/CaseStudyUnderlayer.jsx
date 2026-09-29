import { useEffect, useRef } from 'react';
import { projects } from '../data/portfolioData';

export default function CaseStudyUnderlayer({ project, onClose, onSelectProject }) {
  const containerRef = useRef(null);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!project) return;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus modal container
    if (containerRef.current) {
      containerRef.current.focus();
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  // Find next project in array
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div
      className="case-study-underlayer is-open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      ref={containerRef}
      tabIndex={-1}
    >
      {/* Sticky Top Bar */}
      <div className="case-study-topbar">
        <button
          type="button"
          className="btn-back-portfolio"
          onClick={onClose}
          aria-label="Back to portfolio"
        >
          <span className="back-arrow" aria-hidden="true">&larr;</span>
          <span className="back-text">BACK TO PORTFOLIO</span>
        </button>

        <div className="topbar-center-info">
          <span className="topbar-title">{project.name}</span>
          <span className="topbar-sep">&middot;</span>
          <span className="topbar-cat">{project.category}</span>
        </div>

        <button
          type="button"
          className="btn-close-modal"
          onClick={onClose}
          aria-label="Close case study dialog"
        >
          CLOSE [ESC]
        </button>
      </div>

      {/* Main Scrollable Content */}
      <div className="case-study-scroll-body">
        <div className="case-study-inner">
          {/* Header Metadata Section */}
          <div className="case-study-header">
            <div className="header-meta-tags">
              <span className="tag-number">{project.number}</span>
              <span className="tag-category">{project.category}</span>
              <span className="tag-year">{project.year}</span>
            </div>

            <h1 id="case-study-title" className="case-study-main-heading">
              {project.name}
            </h1>
            <p className="case-study-lead-sub">
              {project.subtitle}
            </p>

            {/* Quick Spec Table */}
            <div className="case-study-spec-grid">
              <div className="spec-item">
                <span className="spec-label">ROLE</span>
                <span className="spec-value">{project.role}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">TIMELINE</span>
                <span className="spec-value">{project.year}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">TOOLS &amp; TECH</span>
                <span className="spec-value">{project.tools.join(', ')}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">STATUS</span>
                <span className="spec-value">Concept &amp; Prototype</span>
              </div>
            </div>

            {/* External Action Links (if available) */}
            <div className="case-study-links-row">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-spec-link btn-spec-live"
                >
                  <span>LIVE DEMO / FIGMA</span>
                  <span className="arrow" aria-hidden="true">&rarr;</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-spec-link btn-spec-github"
                >
                  <span>SOURCE CODE &middot; GITHUB</span>
                  <span className="arrow" aria-hidden="true">&rarr;</span>
                </a>
              )}
            </div>
          </div>

          {/* Hero Visual Preview */}
          <div className="case-study-hero-media">
            <img
              src={project.image}
              alt={`Full presentation of ${project.name}`}
              className="case-study-hero-img"
            />
            <div className="media-caption">
              <span>FIG. 01 &middot; HIGH-FIDELITY USER INTERFACE PREVIEW</span>
            </div>
          </div>

          {/* 01: OVERVIEW */}
          <section className="case-study-block">
            <div className="block-label-col">
              <span className="block-number">01</span>
              <h2 className="block-title">OVERVIEW</h2>
            </div>
            <div className="block-content-col">
              <p className="block-paragraph-lead">
                {project.overview}
              </p>
            </div>
          </section>

          {/* 02: PROBLEM */}
          <section className="case-study-block">
            <div className="block-label-col">
              <span className="block-number">02</span>
              <h2 className="block-title">PROBLEM</h2>
            </div>
            <div className="block-content-col">
              <p className="block-paragraph">
                {project.problem}
              </p>
            </div>
          </section>

          {/* 03: PROCESS & WORKFLOW */}
          <section className="case-study-block">
            <div className="block-label-col">
              <span className="block-number">03</span>
              <h2 className="block-title">PROCESS</h2>
            </div>
            <div className="block-content-col">
              <div className="process-timeline-list">
                {project.process.map((step, sIdx) => (
                  <div key={sIdx} className="process-step-item">
                    <div className="step-badge">
                      <span className="step-idx">0{sIdx + 1}</span>
                      <span className="step-phase-name">{step.phase}</span>
                    </div>
                    <div className="step-body">
                      <p>{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 04: FINAL RESULT */}
          <section className="case-study-block">
            <div className="block-label-col">
              <span className="block-number">04</span>
              <h2 className="block-title">FINAL RESULT</h2>
            </div>
            <div className="block-content-col">
              <p className="block-paragraph">
                {project.finalResult}
              </p>
              <div className="final-result-highlight-card">
                <span className="highlight-tag">KEY OUTCOME</span>
                <p>A clean, approachable user journey validated with peer usability sessions and consistent typography tokens.</p>
              </div>
            </div>
          </section>

          {/* 05: REFLECTION */}
          <section className="case-study-block">
            <div className="block-label-col">
              <span className="block-number">05</span>
              <h2 className="block-title">REFLECTION</h2>
            </div>
            <div className="block-content-col">
              <p className="block-paragraph">
                {project.reflection}
              </p>
            </div>
          </section>

          {/* Next Project Footer Bar */}
          <div className="case-study-next-nav">
            <div className="next-nav-left">
              <span className="next-nav-label">CONTINUE EXPLORING</span>
              <span className="next-nav-name">{nextProject.name}</span>
            </div>

            <button
              type="button"
              className="btn-next-project"
              onClick={() => {
                onSelectProject(nextProject);
                // Scroll underlayer container back to top
                if (containerRef.current) {
                  containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              aria-label={`Go to next project: ${nextProject.name}`}
            >
              <span className="next-text">NEXT PROJECT</span>
              <span className="next-arrow" aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
