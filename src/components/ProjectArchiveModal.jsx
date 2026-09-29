import { useState, useEffect } from 'react';
import { projects } from '../data/portfolioData';

export default function ProjectArchiveModal({ isOpen, onClose, onSelectProject }) {
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = ['ALL', 'UI/UX Design', 'Product Design', 'Web Design', 'Experimental UI/UX'];

  const filteredProjects = filter === 'ALL'
    ? projects
    : projects.filter((p) => p.category.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div
      className="archive-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="archive-modal-title"
    >
      <div className="archive-modal-backdrop" onClick={onClose} />

      <div className="archive-modal-container">
        {/* Modal Top Bar */}
        <div className="archive-topbar">
          <div className="topbar-left">
            <span className="archive-number">03.5</span>
            <span className="archive-eyebrow">PROJECT CATALOGUE</span>
          </div>

          <button
            type="button"
            className="btn-archive-close"
            onClick={onClose}
            aria-label="Close archive view"
          >
            CLOSE [ESC]
          </button>
        </div>

        {/* Header Title & Filter Controls */}
        <div className="archive-header-area">
          <h1 id="archive-modal-title" className="archive-main-heading">
            PROJECT ARCHIVE
          </h1>
          <p className="archive-desc">
            Complete index of digital product concepts, web design projects, and interactive prototypes.
          </p>

          <div className="archive-filter-row" role="tablist" aria-label="Filter projects by category">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`archive-filter-btn ${filter === cat ? 'is-active' : ''}`}
                onClick={() => setFilter(cat)}
                role="tab"
                aria-selected={filter === cat}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Project List */}
        <div className="archive-project-list">
          {filteredProjects.map((p, idx) => (
            <div key={p.id} className="archive-item-row interactive-hover">
              <div className="item-meta-col">
                <span className="item-index">0{idx + 1}</span>
                <span className="item-year">{p.year}</span>
                <span className="item-category">{p.category}</span>
              </div>

              <div className="item-main-col">
                <h3 className="item-title">{p.name}</h3>
                <p className="item-subtitle">{p.subtitle}</p>
                <p className="item-description">{p.shortDescription}</p>

                <div className="item-details-row">
                  <div className="detail-field">
                    <span className="field-label">ROLE:</span>
                    <span className="field-val">{p.role}</span>
                  </div>
                  <div className="detail-field">
                    <span className="field-label">TOOLS:</span>
                    <span className="field-val">{p.tools.join(', ')}</span>
                  </div>
                </div>

                <div className="item-actions-row">
                  <button
                    type="button"
                    className="btn-item-case-study"
                    onClick={() => {
                      onClose();
                      onSelectProject(p);
                    }}
                  >
                    <span>OPEN CASE STUDY</span>
                    <span className="arrow" aria-hidden="true">&rarr;</span>
                  </button>

                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="item-link"
                    >
                      LIVE DEMO &#x2197;
                    </a>
                  )}

                  {p.githubUrl && (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="item-link"
                    >
                      GITHUB &#x2197;
                    </a>
                  )}
                </div>
              </div>

              <div
                className="item-thumb-col"
                onClick={() => {
                  onClose();
                  onSelectProject(p);
                }}
              >
                <img
                  src={p.image}
                  alt={`Thumbnail of ${p.name}`}
                  className="item-thumbnail"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
