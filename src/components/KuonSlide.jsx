import { personalInfo } from '../data/portfolioData';

export default function KuonSlide({
  type, // 'top' | 'project' | 'about' | 'experience' | 'contact'
  isActive,
  onOpenProjects,
  onOpenAbout,
  onOpenExperience,
}) {
  if (type === 'top') {
    return (
      <div className={`section slide-item slide--top ${isActive ? 'is-active' : ''}`}>
        <div className="fullpage__slide">
          <div className="title title--top">
            <h1 className="title__text hero-name-step">
              STEVEN<br />WANG
            </h1>
            <div className="border hero-border-step">
              <span></span>
              <span></span>
            </div>
            <p className="title__lead hero-lead-step">
              PORTFOLIO<br />
              student /<br />
              aspiring UI/UX designer.
            </p>
            <div className="hero-social-links hero-social-step">
              <a
                href={personalInfo.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-link"
                aria-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span>Instagram</span>
              </a>
              <a
                href={`mailto:${personalInfo.contact.email}`}
                className="hero-social-link"
                aria-label="Gmail"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>Gmail</span>
              </a>
              <a
                href={personalInfo.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-link"
                aria-label="GitHub"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 01 PROJECT SECTION — Strict: Minimal, NO Nusa Bot title on homepage
  if (type === 'project') {
    return (
      <div className={`section slide-item slide--project ${isActive ? 'is-active' : ''}`}>
        <div className="fullpage__slide">
          <div className="title">
            <p className="slide-section-idx slide-num-step">01</p>
            <h2 className="title__text slide-title-step">
              PROJECT
            </h2>
            <div className="border slide-border-step">
              <span></span>
              <span></span>
            </div>
            <div className="btn-wrap slide-btn-step">
              <button
                type="button"
                className="btn btn--editorial-reveal"
                onClick={onOpenProjects}
                aria-label="Show me more projects"
              >
                <span>SHOW ME MORE</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 02 ABOUT ME SECTION
  if (type === 'about') {
    return (
      <div className={`section slide-item slide--about ${isActive ? 'is-active' : ''}`}>
        <div className="fullpage__slide">
          <div className="title">
            <p className="slide-section-idx slide-num-step">02</p>
            <h2 className="title__text slide-title-step">
              ABOUT<br />ME
            </h2>
            <div className="border slide-border-step">
              <span></span>
              <span></span>
            </div>
            <p className="title__lead slide-lead-step">
              {personalInfo.aboutLead}
            </p>
            <div className="btn-wrap slide-btn-step">
              <button
                type="button"
                className="btn btn--editorial-reveal"
                onClick={onOpenAbout}
                aria-label="Show me more about Steven Wang"
              >
                <span>SHOW ME MORE</span>
              </button>
            </div>
          </div>

          <div
            className="image image--about slide-img-step"
            onClick={onOpenAbout}
            role="button"
            tabIndex={0}
            aria-label="Open detailed profile about Steven"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenAbout();
              }
            }}
          >
            <div className="image__over">
              <div className="image__cover"></div>
              <div className="image__cover"></div>
            </div>
            <div
              className="image__bg"
              style={{ backgroundImage: 'url(/images/steven-portrait.jpg)' }}
            ></div>
            <div className="page-num">
              <p>02</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 03 EXPERIENCE SECTION — CERTIFICATES & LEARNING
  if (type === 'experience') {
    return (
      <div className={`section slide-item slide--experience ${isActive ? 'is-active' : ''}`}>
        <div className="fullpage__slide">
          <div className="title">
            <p className="slide-section-idx slide-num-step">03</p>
            <h2 className="title__text slide-title-step">
              EXPERIENCE
            </h2>
            <div className="border slide-border-step">
              <span></span>
              <span></span>
            </div>
            <p className="title__lead slide-lead-step">
              CERTIFICATES & LEARNING
            </p>
            <div className="btn-wrap slide-btn-step">
              <button
                type="button"
                className="btn btn--editorial-reveal"
                onClick={onOpenExperience}
                aria-label="Show me more about certificates and learning"
              >
                <span>SHOW ME MORE</span>
              </button>
            </div>
          </div>

          <div
            className="image image--about slide-img-step"
            onClick={onOpenExperience}
            role="button"
            tabIndex={0}
            aria-label="Open certificates and learning page"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenExperience();
              }
            }}
          >
            <div className="image__over">
              <div className="image__cover"></div>
              <div className="image__cover"></div>
            </div>
            <div
              className="image__bg"
              style={{ backgroundImage: 'url(/images/project-arvion.jpg)' }}
            ></div>
            <div className="page-num">
              <p>03</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 04 CONTACT SECTION
  if (type === 'contact') {
    return (
      <div className={`section slide-item slide--contact ${isActive ? 'is-active' : ''}`}>
        <div className="fullpage__slide">
          <div className="title">
            <p className="slide-section-idx slide-num-step">04</p>
            <h2 className="title__text slide-title-step">
              GET IN<br />TOUCH
            </h2>
            <div className="border slide-border-step">
              <span></span>
              <span></span>
            </div>
            <p className="title__lead slide-lead-step" style={{ marginBottom: '2.5rem' }}>
              Have an idea, project,<br />
              or collaboration in mind?<br />
              Let's connect.
            </p>
            <ul className="contact-list-kuon slide-btn-step">
              <li>
                <a
                  href={personalInfo.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a href={`mailto:${personalInfo.contact.email}`}>
                  Gmail
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <div className="image image--contact slide-img-step">
            <div className="image__over">
              <div className="image__cover"></div>
              <div className="image__cover"></div>
            </div>
            <div
              className="image__bg image__bg--contact"
              style={{ backgroundImage: 'url(/images/project-portfolio.jpg)' }}
            ></div>
            <div className="page-num">
              <p>04</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
