import { projects } from '../data/portfolioData';

export default function SelectedWorksSection({ onSelectProject }) {
  return (
    <section id="works" className="works-section theme-dark" aria-label="Selected Works">
      <div className="section-backdrop-glow" aria-hidden="true"></div>

      <div className="works-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="header-meta-row">
            <span className="section-index-badge">CHAPTER 02</span>
            <span className="header-divider" aria-hidden="true">—</span>
            <span className="header-category">PORTFOLIO WORK</span>
          </div>

          <div className="header-headline-row">
            <h2 className="section-title">SELECTED WORKS</h2>
            <p className="section-lead">
              A collection of projects, experiments, and digital concepts I've worked on while exploring UI/UX, product design, and creative web experiences.
            </p>
          </div>
        </div>

        {/* Vertical Storytelling Project List */}
        <div className="projects-vertical-flow">
          {projects.map((project, index) => {
            const isEven = index % 2 === 1;
            return (
              <article
                key={project.id}
                className={`project-chapter-card ${isEven ? 'layout-reversed' : ''}`}
                id={`project-${project.id}`}
              >
                {/* Large Background Watermark Number */}
                <span className="chapter-ghost-num" aria-hidden="true">
                  {project.number}
                </span>

                <div className="project-grid">
                  {/* Info Column */}
                  <div className="project-info-column">
                    <div className="project-header-meta">
                      <span className="project-num-tag">{project.number}</span>
                      <span className="project-cat-badge">{project.category}</span>
                      <span className="project-year-tag">{project.year}</span>
                    </div>

                    <h3 className="project-title">{project.name}</h3>
                    <p className="project-subtitle">{project.subtitle}</p>

                    <p className="project-description">{project.summary}</p>

                    {/* Metadata Specs */}
                    <div className="project-meta-specs">
                      <div className="spec-item">
                        <span className="spec-label">ROLE</span>
                        <span className="spec-value">{project.role}</span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">TOOLS & METHODS</span>
                        <div className="spec-tools-list">
                          {project.tools.map((tool) => (
                            <span key={tool} className="tool-pill">{tool}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="project-cta-wrap">
                      <button
                        type="button"
                        className="btn-project-view"
                        onClick={() => onSelectProject(project)}
                        aria-label={`View detailed case study of ${project.name}`}
                        id={`btn-view-${project.id}`}
                      >
                        <span className="btn-label">VIEW PROJECT</span>
                        <span className="btn-arrow" aria-hidden="true">→</span>
                      </button>
                    </div>
                  </div>

                  {/* Visual Preview Column */}
                  <div className="project-visual-column">
                    <div
                      className="project-image-frame"
                      onClick={() => onSelectProject(project)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onSelectProject(project);
                        }
                      }}
                      aria-label={`Preview mockup for ${project.name}, click to view full case study`}
                    >
                      <div className="image-overlay-tint" aria-hidden="true"></div>
                      <img
                        src={project.image}
                        alt={`Mockup and UI interface for ${project.name}`}
                        className="project-mockup-img"
                        loading="lazy"
                        width="1280"
                        height="720"
                      />
                      <div className="image-hover-badge" aria-hidden="true">
                        <span>EXPLORE CASE STUDY</span>
                        <span className="hover-arrow">↗</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}

          {/* Aesthetic Empty State / In-Progress Project */}
          <div className="future-project-card" aria-label="Projects in Progress">
            <div className="future-card-inner">
              <div className="future-meta">
                <span className="future-num">05</span>
                <span className="future-tag">IN PROGRESS & EXPERIMENTAL</span>
              </div>
              <h3 className="future-title">MORE PROJECTS ARE CURRENTLY IN PROGRESS.</h3>
              <p className="future-desc">
                Currently exploring interactive 3D web concepts, advanced Figma design token architectures, and responsive micro-interactions.
              </p>
              <div className="future-badges">
                <span className="future-pill">Motion UI</span>
                <span className="future-pill">Design Systems</span>
                <span className="future-pill">Creative Code</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
