export default function ExperienceSection({ onOpenExperience }) {
  return (
    <section id="experience" className="experience-section">
      <div className="experience-container">
        {/* Section Header */}
        <div className="section-eyebrow-bar">
          <span className="section-number">03</span>
          <span className="section-label">EXPERIENCE</span>
          <span className="section-rule" aria-hidden="true" />
          <span className="section-year">JOURNEY</span>
        </div>

        <div className="experience-intro-block" style={{ marginBottom: '2.5rem' }}>
          <h2 className="experience-main-title">
            EXPERIENCE
          </h2>
          <p className="experience-intro-desc" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', lineHeight: 1.6, maxWidth: '720px' }}>
            Learning through school projects, competitions, personal projects, and continuous exploration in UI/UX design and web development.
          </p>
        </div>

        {/* Action Button */}
        <div className="featured-action-wrap" style={{ marginTop: '2.5rem' }}>
          <button
            type="button"
            className="btn-show-more"
            onClick={onOpenExperience}
            aria-label="Show complete Experience page"
          >
            <span className="btn-text">SHOW ME MORE</span>
            <span className="btn-arrow" aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>
    </section>
  );
}
