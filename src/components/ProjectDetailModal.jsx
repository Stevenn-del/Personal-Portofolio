import { useEffect, useRef } from 'react';
import { projects } from '../data/portfolioData';

export default function ProjectDetailModal({ project, onClose, onSelectProject }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!project) return;

    // Body scroll lock
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Handle ESC key to close
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Focus modal container
    modalRef.current?.focus();

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  // Find index and next project
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div
      className="project-modal-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="project-modal-dialog"
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="modal-header-bar">
          <div className="modal-header-meta">
            <span className="modal-project-number">{project.number}</span>
            <span className="modal-category-badge">{project.category}</span>
            <span className="modal-year-text">{project.year}</span>
          </div>

          <button
            type="button"
            className="modal-close-button"
            onClick={onClose}
            aria-label="Close project modal"
            id="modal-close-btn"
          >
            <span className="close-label">CLOSE</span>
            <span className="close-icon" aria-hidden="true">✕</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="modal-body-content">
          {/* 01 OVERVIEW */}
          <section className="modal-section overview-section">
            <div className="section-step-num" aria-hidden="true">01 // OVERVIEW</div>
            <h2 id="modal-project-title" className="modal-main-title">{project.name}</h2>
            <p className="modal-subtitle-text">{project.subtitle}</p>

            <div className="modal-overview-grid">
              <div className="overview-spec">
                <span className="spec-title">ROLE</span>
                <span className="spec-desc">{project.role}</span>
              </div>
              <div className="overview-spec">
                <span className="spec-title">TIMELINE</span>
                <span className="spec-desc">{project.year}</span>
              </div>
              <div className="overview-spec">
                <span className="spec-title">TOOLS & STACK</span>
                <div className="overview-tools-wrap">
                  {project.tools.map((tool) => (
                    <span key={tool} className="modal-tool-pill">{tool}</span>
                  ))}
                </div>
              </div>
              <div className="overview-spec">
                <span className="spec-title">DELIVERABLE</span>
                <span className="spec-desc">Figma Prototype & Design System</span>
              </div>
            </div>
          </section>

          {/* 02 THE PROBLEM */}
          <section className="modal-section problem-section">
            <div className="section-step-num" aria-hidden="true">02 // THE PROBLEM</div>
            <h3 className="modal-section-heading">Identifying the User Friction</h3>
            <div className="modal-prose-card">
              <p className="modal-prose-text">{project.problem}</p>
            </div>
          </section>

          {/* 03 THE IDEA */}
          <section className="modal-section idea-section">
            <div className="section-step-num" aria-hidden="true">03 // THE IDEA & SOLUTION</div>
            <h3 className="modal-section-heading">The Digital Concept</h3>
            <div className="modal-prose-card highlight-card">
              <p className="modal-prose-text">{project.idea}</p>
            </div>
          </section>

          {/* 04 DESIGN PROCESS */}
          <section className="modal-section process-section">
            <div className="section-step-num" aria-hidden="true">04 // DESIGN PROCESS</div>
            <h3 className="modal-section-heading">Research, Ideation, & Testing</h3>

            <div className="process-steps-grid">
              {project.designProcess.map((step) => (
                <div key={step.step} className="modal-process-card">
                  <div className="process-card-step">{step.step}</div>
                  <h4 className="process-card-title">{step.title}</h4>
                  <p className="process-card-detail">{step.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 05 FINAL DESIGN SHOWCASE */}
          <section className="modal-section showcase-section">
            <div className="section-step-num" aria-hidden="true">05 // FINAL DESIGN</div>
            <h3 className="modal-section-heading">High-Fidelity Interface Showcase</h3>

            <div className="modal-image-showcase">
              <img
                src={project.image}
                alt={`Full high fidelity design for ${project.name}`}
                className="modal-showcase-image"
                loading="lazy"
              />
              <figcaption className="modal-image-caption">
                {project.name} — Interactive UI flow & visual presentation
              </figcaption>
            </div>
          </section>

          {/* 06 WHAT I LEARNED */}
          <section className="modal-section learnings-section">
            <div className="section-step-num" aria-hidden="true">06 // WHAT I LEARNED</div>
            <h3 className="modal-section-heading">Student Reflection & Key Takeaways</h3>
            <blockquote className="modal-quote-box">
              <p className="modal-quote-text">"{project.learnings}"</p>
              <cite className="modal-quote-cite">— Steven, Reflection Notes</cite>
            </blockquote>
          </section>

          {/* 07 NEXT PROJECT NAVIGATION */}
          <section className="modal-section next-project-section">
            <div className="section-step-num" aria-hidden="true">07 // NEXT PROJECT</div>
            <div className="next-project-card">
              <div className="next-project-meta">
                <span className="next-cue">UP NEXT</span>
                <span className="next-num">{nextProject.number}</span>
              </div>
              <h3 className="next-project-title">{nextProject.name}</h3>
              <p className="next-project-subtitle">{nextProject.subtitle}</p>

              <button
                type="button"
                className="btn-next-project"
                onClick={() => {
                  onSelectProject(nextProject);
                  modalRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <span>VIEW {nextProject.name}</span>
                <span className="btn-icon" aria-hidden="true">→</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
