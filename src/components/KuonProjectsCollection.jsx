import { useEffect, useRef } from 'react';
import { projects } from '../data/portfolioData';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function KuonProjectsCollection({
  onSelectProject,
  onClose
}) {
  const containerRef = useRef(null);

  // Scroll to top immediately when opened
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

  useScrollReveal(containerRef, [projects]);

  return (
    <div
      className="underlayer-view is-visible"
      ref={containerRef}
      role="main"
      aria-label="Projects Collection"
    >
      {/* Main Content Wrapper with Controlled Editorial Spacing */}
      <section className="wrapper wrapper--detail-page">
        <div className="container">
          {/* Header Title Section: Page Title -> Description with comfortable vertical spacing */}
          <div className="text text--top reveal-on-scroll">
            <p className="heading-num">01</p>
            <div className="text__wrap text__wrap--top content">
              <h1 className="heading heading--top">PROJECTS</h1>
              <div className="border js-toRight" style={{ margin: '1.2rem 0 1.8rem' }}>
                <span></span>
                <span></span>
              </div>
              <p className="projects-collection-lead">
                Selected works, design concepts, and interface explorations.
              </p>
            </div>
          </div>

          {/* Comfortable Vertical Breathing Space before first image/content */}
          <div className="content projects-collection-list">
            {projects.map((proj, idx) => (
              <article
                key={proj.id}
                className="project-collection-item reveal-on-scroll"
                style={{ animationDelay: `${idx * 0.1}s` }}
                onClick={() => onSelectProject(proj)}
              >
                <div className="project-collection-meta">
                  <div className="project-collection-top">
                    <span className="project-collection-num">{proj.number}</span>
                    <span className="project-collection-category">{proj.category}</span>
                  </div>
                  <h2 className="project-collection-title">{proj.name}</h2>
                  <p className="project-collection-desc">{proj.shortDescription}</p>
                  <p className="project-collection-submeta">
                    <span>{proj.role}</span>
                    <span className="meta-sep">·</span>
                    <span>{proj.year}</span>
                  </p>
                  <button
                    type="button"
                    className="btn btn--project-view"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProject(proj);
                    }}
                    aria-label={`View project ${proj.name}`}
                  >
                    <span>VIEW PROJECT</span>
                  </button>
                </div>

                <div className="project-collection-preview">
                  <div className="editorial-img-container project-collection-img-wrap">
                    <img
                      src={proj.image}
                      alt={proj.name}
                      className="editorial-img-reveal"
                      loading="lazy"
                    />
                    <div className="project-collection-img-overlay">
                      <span>EXPLORE</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Back Button */}
          <div className="content content--mlarge back-btn-wrap reveal-on-scroll">
            <button type="button" className="back-btn" onClick={onClose}>
              BACK
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
