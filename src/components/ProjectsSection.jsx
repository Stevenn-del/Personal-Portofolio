import { projects } from '../data/portfolioData';

export default function ProjectsSection({ onOpenCaseStudy, onOpenArchive }) {
  // Show featured projects
  const featuredList = projects.slice(0, 4);

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        {/* Section Header */}
        <div className="section-eyebrow-bar">
          <span className="section-number">03</span>
          <span className="section-label">SELECTED WORKS</span>
          <span className="section-rule" aria-hidden="true" />
          <span className="section-year">2026 ARCHIVE</span>
        </div>

        <div className="projects-header-block">
          <h2 className="projects-main-title">
            FEATURED PROJECTS
          </h2>
          <p className="projects-header-desc">
            A curated selection of digital products, interface designs, and front-end experiments built with intent and care.
          </p>
        </div>

        {/* Alternating Project Layouts */}
        <div className="projects-list">
          {featuredList.map((project, index) => {
            // Alternate rhythm:
            // index 0: image left, info right
            // index 1: info left, image right
            // index 2: wide visual presentation
            // index 3: image left, info right
            const layoutType = index % 3 === 0 ? 'layout-split-left' : index % 3 === 1 ? 'layout-split-right' : 'layout-wide-cinematic';

            return (
              <article
                key={project.id}
                className={`project-article ${layoutType}`}
              >
                {/* Visual Preview */}
                <div
                  className="project-media-wrapper interactive-hover"
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
                  <div className="project-media-inner">
                    <img
                      src={project.image}
                      alt={`Project screenshot for ${project.name}`}
                      className="project-image"
                      loading="lazy"
                    />
                    <div className="project-media-hover-overlay">
                      <span className="hover-badge">VIEW CASE STUDY &rarr;</span>
                    </div>
                  </div>
                  <div className="frame-marker top-left" aria-hidden="true">+</div>
                  <div className="frame-marker bottom-right" aria-hidden="true">+</div>
                </div>

                {/* Content / Info Block */}
                <div className="project-info-block">
                  <div className="project-meta-line">
                    <span className="project-num">0{index + 1}</span>
                    <span className="meta-sep" aria-hidden="true">&middot;</span>
                    <span className="project-cat">{project.category}</span>
                    <span className="meta-sep" aria-hidden="true">&middot;</span>
                    <span className="project-yr">{project.year}</span>
                  </div>

                  <h3 className="project-title">
                    {project.name}
                  </h3>

                  <p className="project-sub">{project.subtitle}</p>

                  <p className="project-summary">
                    {project.shortDescription}
                  </p>

                  <div className="project-tools-wrap">
                    <span className="tools-caption">TECH &amp; TOOLS:</span>
                    <div className="tools-tags">
                      {project.tools.map((tool, tIdx) => (
                        <span key={tIdx} className="tool-tag">{tool}</span>
                      ))}
                    </div>
                  </div>

                  <div className="project-actions">
                    <button
                      type="button"
                      className="btn-case-study"
                      onClick={() => onOpenCaseStudy(project)}
                      aria-label={`Show case study for ${project.name}`}
                    >
                      <span className="btn-text">SHOW ME MORE</span>
                      <span className="btn-arrow" aria-hidden="true">&rarr;</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Global Archive Link */}
        <div className="projects-archive-banner">
          <div className="archive-banner-text">
            <span className="banner-eyebrow">EXPLORE COMPLETE COLLECTION</span>
            <h3 className="banner-title">WANT TO SEE ALL EXPLORATIONS &amp; PROJECTS?</h3>
          </div>
          <button
            type="button"
            className="btn-view-archive"
            onClick={onOpenArchive}
          >
            <span className="btn-label">VIEW ALL PROJECTS ARCHIVE</span>
            <span className="btn-icon" aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>
    </section>
  );
}
