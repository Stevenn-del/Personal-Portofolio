import { useEffect } from 'react';

export default function CertificateModal({ certificate, onClose }) {
  useEffect(() => {
    if (!certificate) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  return (
    <div
      className="cert-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
    >
      <div className="cert-modal-backdrop" onClick={onClose} />

      <div className="cert-modal-card">
        <div className="cert-modal-header">
          <span className="cert-eyebrow">VERIFIED CREDENTIAL</span>
          <button
            type="button"
            className="btn-cert-close"
            onClick={onClose}
            aria-label="Close certificate modal"
          >
            CLOSE [ESC]
          </button>
        </div>

        <div className="cert-modal-body">
          <div className="cert-badge-icon" aria-hidden="true">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="8" r="6" />
              <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
            </svg>
          </div>

          <h3 id="cert-modal-title" className="cert-modal-title">
            {certificate.title}
          </h3>

          <div className="cert-modal-meta">
            <div className="meta-block">
              <span className="label">ISSUER:</span>
              <span className="value">{certificate.issuer}</span>
            </div>
            <div className="meta-block">
              <span className="label">YEAR:</span>
              <span className="value">{certificate.year}</span>
            </div>
            <div className="meta-block">
              <span className="label">CREDENTIAL ID:</span>
              <span className="value code-val">{certificate.credentialId}</span>
            </div>
          </div>

          <p className="cert-modal-desc">
            {certificate.description}
          </p>

          <div className="cert-skills-covered">
            <span className="label">SKILLS VALIDATED:</span>
            <div className="skills-pills">
              {certificate.skillsCovered.map((skill, i) => (
                <span key={i} className="skill-pill-item">{skill}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="cert-modal-footer">
          <span className="cert-note">Issued in conjunction with vocational development standards.</span>
          <button
            type="button"
            className="btn-cert-dismiss"
            onClick={onClose}
          >
            DISMISS
          </button>
        </div>
      </div>
    </div>
  );
}
