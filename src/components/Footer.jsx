import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top-row">
          <div className="footer-brand-col">
            <h3 className="footer-brand-name">{personalInfo.name.toUpperCase()}</h3>
            <p className="footer-role">{personalInfo.roleTitle}</p>
          </div>

          <div className="footer-nav-col">
            <span className="footer-col-title">NAVIGATION</span>
            <ul className="footer-links-list">
              <li><a href="#home">01 / HOME</a></li>
              <li><a href="#projects">02 / PROJECTS</a></li>
              <li><a href="#about">03 / ABOUT ME</a></li>
              <li><a href="#experience">04 / EXPERIENCE</a></li>
              <li><a href="#contact">05 / GET IN TOUCH</a></li>
            </ul>
          </div>

          <div className="footer-social-col">
            <span className="footer-col-title">CONNECT</span>
            <ul className="footer-links-list">
              <li>
                <a href={personalInfo.contact.instagram} target="_blank" rel="noopener noreferrer">
                  INSTAGRAM &#x2197;
                </a>
              </li>
              <li>
                <a href={`mailto:${personalInfo.contact.email}`}>
                  GMAIL &#x2197;
                </a>
              </li>
              <li>
                <a href={personalInfo.contact.github} target="_blank" rel="noopener noreferrer">
                  GITHUB &#x2197;
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-back-col">
            <button
              type="button"
              className="btn-back-to-top"
              onClick={scrollToTop}
              aria-label="Back to top of page"
            >
              <span className="back-text">BACK TO TOP</span>
              <span className="back-icon" aria-hidden="true">&uarr;</span>
            </button>
          </div>
        </div>

        <div className="footer-bottom-row">
          <p className="footer-copyright">
            &copy; 2026 {personalInfo.name.toUpperCase()} &middot; PORTFOLIO.
          </p>
          <div className="footer-status-pill">
            <span className="status-dot" aria-hidden="true" />
            <span>CONTINUOUSLY LEARNING &amp; IMPROVING</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
