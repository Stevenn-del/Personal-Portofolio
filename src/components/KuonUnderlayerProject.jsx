import { useEffect, useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function KuonUnderlayerProject({ project, onClose }) {
  const containerRef = useRef(null);

  // Scroll to top immediately when opened
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  // Editorial scroll reveal for sections and images
  useScrollReveal(containerRef, [project]);

  if (!project) return null;

  return (
    <div
      className="underlayer-view is-visible"
      ref={containerRef}
      role="main"
      aria-label={`Project details for ${project.name}`}
    >
      {/* Main Content Wrapper with Controlled Editorial Spacing */}
      <section className="wrapper wrapper--detail-page">
        {/* 1. TOP NAVIGATION BREATHING SPACE -> PAGE TITLE */}
        <div className="container">
          <div className="text text--top reveal-on-scroll">
            <p className="heading-num">{project.number || '01'}</p>
            <div className="text__wrap text__wrap--top content">
              <h1 className="heading heading--top">{project.name}</h1>
              <div className="border js-toRight" style={{ margin: '1.2rem 0 1.8rem' }}>
                <span></span>
                <span></span>
              </div>
              <p className="project-detail-category-lead">
                {project.category} · {project.year}
              </p>
            </div>
          </div>
        </div>

        {/* 2. ROLE / YEAR / OVERVIEW METADATA WITH BREATHING SPACE */}
        <div className="meta project-meta-section reveal-on-scroll">
          <div className="meta__back" aria-hidden="true"></div>
          <div className="content meta__text-wrap">
            <ul className="meta__text">
              <li>
                <p className="small-title">ROLE</p>
                <p>{project.role}</p>
              </li>
              <li>
                <p className="small-title">YEAR</p>
                <p>{project.year}</p>
              </li>
              <li>
                <p className="small-title">CATEGORY</p>
                <p>{project.category}</p>
              </li>
              <li>
                <p className="small-title">OVERVIEW</p>
                <p>{project.overview}</p>
              </li>
            </ul>
          </div>
        </div>

        {/* 3. COMFORTABLE BREATHING SPACING -> LARGE PROJECT IMAGE (KUON-STYLE REVEAL) */}
        <div className="content project-featured-image-wrapper reveal-on-scroll">
          <div className="editorial-img-container">
            <img
              src={project.image}
              alt={`${project.name} Featured Preview`}
              className="editorial-img-reveal"
              loading="eager"
            />
          </div>
        </div>

        {/* 4. OVERVIEW / CONCEPT (01 CONCEPT) */}
        {project.conceptText && (
          <div className="text reveal-on-scroll">
            <p className="heading-num">01</p>
            <div className="text__wrap">
              <h2 className="heading">{project.conceptTitle || 'CONCEPT'}</h2>
              <div className="text__works">
                <p className="editorial-lead-body">
                  {project.conceptText}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 5. BIG IMAGE FEATURE (PRESERVED) */}
        <div className="big-image-wrap reveal-on-scroll">
          <div
            className="big-image editorial-img-container"
            style={{
              backgroundImage: `url(${project.image})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
            aria-hidden="true"
          ></div>
        </div>

        {/* 6. DESIGN PROCESS (02 DESIGN PROCESS) */}
        {project.devProcessSteps && project.devProcessSteps.length > 0 && (
          <div className="text reveal-on-scroll">
            <p className="heading-num">02</p>
            <div className="text__wrap">
              <h2 className="heading heading--left">{project.devTitle || 'DESIGN PROCESS'}</h2>
              <div className="text__works">
                <ul className="kuon-bullet-list">
                  {project.devProcessSteps.map((step, idx) => (
                    <li key={idx} className="process-step-row">
                      <span className="bullet-dot"></span>
                      <div className="process-step-content">
                        <strong className="process-step-phase">{step.phase}:</strong>
                        <span className="process-step-detail"> {step.detail}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 7. KEY FEATURES (03 KEY FEATURES) */}
        {project.keyFeatures && project.keyFeatures.length > 0 && (
          <div className="text reveal-on-scroll">
            <p className="heading-num">03</p>
            <div className="text__wrap">
              <h2 className="heading heading--left">{project.keyFeaturesTitle || 'KEY FEATURES'}</h2>
              <div className="text__works">
                <ul className="kuon-bullet-list">
                  {project.keyFeatures.map((feat, idx) => (
                    <li key={idx} className="process-step-row">
                      <span className="bullet-dot"></span>
                      <span className="feature-item-text">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 8. DUAL SCREEN PREVIEWS (KAMP) */}
        <div className="kamp reveal-on-scroll">
          <ul>
            <li className="editorial-img-container">
              <img
                src={project.image}
                alt={`${project.name} UI Preview 1`}
                className="editorial-img-reveal"
                loading="lazy"
              />
            </li>
            <li className="editorial-img-container">
              <img
                src={project.image}
                alt={`${project.name} UI Preview 2`}
                className="editorial-img-reveal"
                loading="lazy"
              />
            </li>
          </ul>
        </div>

        {/* 9. FINAL RESULT (04 FINAL RESULT) */}
        {project.resultText && (
          <div className="text reveal-on-scroll">
            <p className="heading-num">04</p>
            <div className="text__wrap">
              <h2 className="heading">{project.resultTitle || 'FINAL RESULT'}</h2>
              <div className="text__works">
                <p className="editorial-lead-body">
                  {project.resultText}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 10. REFLECTION (05 REFLECTION) */}
        {project.reflectionText && (
          <div className="text reveal-on-scroll">
            <p className="heading-num">05</p>
            <div className="text__wrap">
              <h2 className="heading">{project.reflectionTitle || 'REFLECTION'}</h2>
              <div className="text__works">
                <p className="editorial-lead-body">
                  {project.reflectionText}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 11. BACK BUTTON */}
        <div className="content content--mlarge back-btn-wrap reveal-on-scroll">
          <button type="button" className="back-btn" onClick={onClose}>
            BACK
          </button>
        </div>
      </section>
    </div>
  );
}
