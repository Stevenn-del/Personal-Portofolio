import { useState } from 'react';
import { personalInfo } from '../data/portfolioData';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.contact.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }).catch(() => {
      window.location.href = `mailto:${personalInfo.contact.email}`;
    });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        {/* Section Header */}
        <div className="section-eyebrow-bar">
          <span className="section-number">04</span>
          <span className="section-label">GET IN TOUCH</span>
          <span className="section-rule" aria-hidden="true" />
          <span className="section-year">CONNECT</span>
        </div>

        {/* Large Editorial Statement */}
        <div className="contact-statement-wrap">
          <h2 className="contact-main-heading">
            LET&rsquo;S CONNECT.
          </h2>

          <p className="contact-sub-statement">
            Have an idea, project,<br />
            or collaboration in mind?<br />
            Let's connect.
          </p>
        </div>

        {/* Primary Contact Action Card */}
        <div className="contact-card interactive-hover">
          <div className="contact-email-row">
            <div className="email-meta">
              <span className="email-label">GMAIL</span>
              <a
                href={`mailto:${personalInfo.contact.email}`}
                className="email-link"
                aria-label={`Send email to ${personalInfo.contact.email}`}
              >
                {personalInfo.contact.email}
              </a>
            </div>

            <div className="email-action-buttons">
              <button
                type="button"
                className={`btn-copy-email ${copied ? 'is-copied' : ''}`}
                onClick={handleCopyEmail}
                aria-label="Copy email address to clipboard"
              >
                {copied ? 'COPIED TO CLIPBOARD!' : 'COPY EMAIL'}
              </button>

              <a
                href={`mailto:${personalInfo.contact.email}`}
                className="btn-contact-primary"
              >
                <span>GET IN TOUCH</span>
                <span className="arrow" aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>

        {/* Verified Social Platforms: Instagram, Gmail, GitHub ONLY */}
        <div className="contact-socials-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          <a
            href={personalInfo.contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="social-tile interactive-hover"
          >
            <div className="social-top">
              <span className="social-platform">INSTAGRAM</span>
              <span className="social-arrow" aria-hidden="true">&#x2197;</span>
            </div>
            <span className="social-handle">{personalInfo.contact.instagramHandle}</span>
            <span className="social-desc">Instagram: [YOUR_INSTAGRAM_URL]</span>
          </a>

          <a
            href={`mailto:${personalInfo.contact.email}`}
            className="social-tile interactive-hover"
          >
            <div className="social-top">
              <span className="social-platform">GMAIL</span>
              <span className="social-arrow" aria-hidden="true">&#x2197;</span>
            </div>
            <span className="social-handle">{personalInfo.contact.email}</span>
            <span className="social-desc">Gmail: [YOUR_EMAIL@gmail.com]</span>
          </a>

          <a
            href={personalInfo.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="social-tile interactive-hover"
          >
            <div className="social-top">
              <span className="social-platform">GITHUB</span>
              <span className="social-arrow" aria-hidden="true">&#x2197;</span>
            </div>
            <span className="social-handle">{personalInfo.contact.githubHandle}</span>
            <span className="social-desc">GitHub: [YOUR_GITHUB_URL]</span>
          </a>
        </div>
      </div>
    </section>
  );
}
