export default function AboutSection({ onOpenAbout }) {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        {/* Section Header */}
        <div className="section-eyebrow-bar">
          <span className="section-number">02</span>
          <span className="section-label">ABOUT ME</span>
          <span className="section-rule" aria-hidden="true" />
          <span className="section-year">STATEMENT</span>
        </div>

        {/* Primary Editorial Statement */}
        <div className="about-statement-wrap">
          <h2 className="about-editorial-statement">
            &ldquo;I love Design, Technology,<br className="hide-mobile" />
            and Creating Digital Experiences.&rdquo;
          </h2>
        </div>

        {/* Action Button */}
        <div className="featured-action-wrap" style={{ marginTop: '3rem', textAlign: 'center' }}>
          <button
            type="button"
            className="btn-show-more"
            onClick={onOpenAbout}
            aria-label="Show complete About Me page"
          >
            <span className="btn-text">SHOW ME MORE</span>
            <span className="btn-arrow" aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>
    </section>
  );
}
