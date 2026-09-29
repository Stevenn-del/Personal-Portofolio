import { useState } from 'react';

export default function FeaturedProject({ project, onOpenCaseStudy }) {
  const [isHovered, setIsHovered] = useState(false);

  if (!project) return null;

  return (
    <section id="featured-work" className="featured-project-section">
      <div className="featured-project-container">
        {/* Editorial Section Header */}
        <div className="section-eyebrow-bar">
          <span className="section-number">01</span>
          <span className="section-label">FEATURED PROJECT</span>
          <span className="section-rule" aria-hidden="true" />
          <span className="section-year">{project.year}</span>
        </div>

        {/* Big Editorial Project Presentation */}
        <div
          className={`featured-project-card ${isHovered ? 'is-hovered' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Large Preview / Mockup Frame */}
          <div
            className="featured-media-frame interactive-hover"
            onClick={() => onOpenCaseStudy(project)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenCaseStudy(project);
              }
            }}
            aria-label={`Open case study for ${project.name}`}
          >
            <div className="media-inner">
              <img
                src={project.image}
                alt={`Preview of ${project.name} interface`}
                className="featured-image"
                loading="eager"
              />
              <div className="media-overlay">
                <span className="media-hint">CLICK TO VIEW CASE STUDY</span>
              </div>
            </div>
            <div className="media-crosshair top-left" aria-hidden="true">+</div>
            <div className="media-crosshair bottom-right" aria-hidden="true">+</div>
          </div>

          {/* Project Editorial Information */}
          <div className="featured-info-col">
            <div className="featured-category-badge">
              {project.category} &middot; {project.year}
            </div>

            <h2 className="featured-title">
              {project.name}
            </h2>

            <p className="featured-subtitle">
              {project.subtitle}
            </p>

            <p className="featured-description">
              {project.shortDescription}
            </p>

            <div className="featured-action-wrap">
              <button
                type="button"
                className="btn-show-more"
                onClick={() => onOpenCaseStudy(project)}
                aria-label={`Show case study for ${project.name}`}
              >
                <span className="btn-text">SHOW ME MORE</span>
                <span className="btn-arrow" aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
