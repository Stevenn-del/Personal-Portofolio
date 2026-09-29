import { personalInfo } from '../data/portfolioData';

export default function HeroSection({ onExploreWorks, onLearnAbout }) {
  return (
    <section id="hero" className="hero-section" aria-label="Hero and Personal Statement">
      {/* Background Graphic Watermark */}
      <div className="hero-watermark" aria-hidden="true">01</div>

      <div className="hero-container">
        {/* Top Meta Indicator */}
        <div className="hero-meta-row">
          <span className="hero-year-badge">PORTFOLIO 2026</span>
          <span className="hero-meta-divider" aria-hidden="true">/</span>
          <span className="hero-status-text">{personalInfo.education.institution} • {personalInfo.education.major}</span>
        </div>

        {/* Main Headline */}
        <div className="hero-title-wrap">
          <h1 className="hero-main-title">
            <span className="title-line">HELLO,</span>
            <span className="title-line">I'M STEVEN.</span>
          </h1>
        </div>

        {/* Subtitle & Description */}
        <div className="hero-content-grid">
          <div className="hero-sub-block">
            <h2 className="hero-subtitle">{personalInfo.headline}</h2>
            <p className="hero-description">{personalInfo.bioIntro}</p>
          </div>

          {/* Action CTAs */}
          <div className="hero-actions-block">
            <div className="hero-buttons-row">
              <button
                type="button"
                className="btn-primary"
                onClick={onExploreWorks}
                id="hero-cta-works"
              >
                <span>VIEW SELECTED WORKS</span>
                <span className="btn-icon" aria-hidden="true">↓</span>
              </button>

              <button
                type="button"
                className="btn-secondary"
                onClick={onLearnAbout}
                id="hero-cta-about"
              >
                <span>ABOUT ME</span>
                <span className="btn-icon" aria-hidden="true">→</span>
              </button>
            </div>

            <div className="hero-stats-line">
              <span className="stat-item"><strong>4</strong> Selected Projects</span>
              <span className="stat-separator" aria-hidden="true">•</span>
              <span className="stat-item"><strong>2+</strong> Years Exploring UI</span>
              <span className="stat-separator" aria-hidden="true">•</span>
              <span className="stat-item">Open to Mentorship & Internships</span>
            </div>
          </div>
        </div>

        {/* Bottom Scroll Cue */}
        <div className="hero-scroll-cue">
          <a
            href="#statement"
            className="scroll-cue-link"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('statement')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="cue-mouse" aria-hidden="true">
              <span className="cue-wheel"></span>
            </span>
            <span className="cue-text">SCROLL TO EXPLORE</span>
          </a>
        </div>
      </div>

      {/* Chapter 01 Statement / Narrative Transition */}
      <div id="statement" className="hero-statement-band">
        <div className="statement-container">
          <div className="statement-header-row">
            <span className="statement-label">PHILOSOPHY & LEARNING PATH</span>
            <span className="statement-coords" aria-hidden="true">01.1 // STORY</span>
          </div>

          <h2 className="statement-title">{personalInfo.statement}</h2>

          <div className="statement-body-row">
            <p className="statement-text">{personalInfo.statementParagraph}</p>
            <div className="statement-focus-box">
              <span className="focus-label">CURRENT FOCUS</span>
              <p className="focus-detail">
                Designing intuitive design systems, exploring user flows, and practicing front-end craft with semantic HTML, modern CSS, and React.
              </p>
            </div>
          </div>

          {/* Flowing Keywords Strip */}
          <div className="keywords-strip" aria-label="Core competencies">
            <div className="keywords-track">
              {personalInfo.keywords.concat(personalInfo.keywords).map((kw, idx) => (
                <span key={`${kw}-${idx}`} className="keyword-tag">
                  <span className="kw-bullet" aria-hidden="true">✦</span>
                  <span className="kw-text">{kw}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
