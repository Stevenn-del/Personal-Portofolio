import { personalInfo } from '../data/portfolioData';

export default function Hero({ onExploreClick }) {
  return (
    <section id="home" className="hero-section">
      <div className="hero-container">
        {/* Editorial Top Metadata Bar */}
        <div className="hero-meta-bar">
          <div className="meta-item">
            <span className="meta-tag">01 / HOME</span>
            <span className="meta-text">PORTFOLIO</span>
          </div>
          <div className="meta-item meta-center">
            <span className="meta-text">STUDENT &middot; UI/UX DESIGN</span>
          </div>
          <div className="meta-item meta-right">
            <span className="meta-status-dot" aria-hidden="true" />
            <span className="meta-text">OPEN FOR COLLABORATION</span>
          </div>
        </div>

        {/* Hero Architectural Typography */}
        <div className="hero-typography-wrap">
          <div className="hero-name-row">
            <h1 className="hero-name">
              <span className="hero-name-line">STEVEN</span>
              <span className="hero-name-line">WANG</span>
            </h1>
            <div className="hero-crosshair" aria-hidden="true">+</div>
          </div>

          <div className="hero-identity-block">
            <h2 className="hero-role-title">
              PORTFOLIO
            </h2>
            <p className="hero-supporting-statement">
              student /<br />
              aspiring UI/UX designer.
            </p>
            <div className="hero-social-links" style={{ marginTop: '1.5rem', display: 'flex', gap: '1.5rem' }}>
              <a
                href={personalInfo.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-link"
                aria-label="Instagram"
              >
                Instagram
              </a>
              <a
                href={`mailto:${personalInfo.contact.email}`}
                className="hero-social-link"
                aria-label="Gmail"
              >
                Gmail
              </a>
              <a
                href={personalInfo.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-link"
                aria-label="GitHub"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Hero Bottom Bar & Animated Scroll Indicator */}
        <div className="hero-bottom-bar">
          <div className="hero-bottom-left">
            <span className="hero-brief-badge">STUDENT &amp; ASPIRING DESIGNER</span>
            <span className="hero-brief-detail">INDONESIA</span>
          </div>

          <button
            type="button"
            className="hero-scroll-indicator"
            onClick={onExploreClick}
            aria-label="Scroll down to featured project"
          >
            <span className="scroll-text">SCROLL DOWN</span>
            <span className="scroll-line-track" aria-hidden="true">
              <span className="scroll-line-thumb" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
