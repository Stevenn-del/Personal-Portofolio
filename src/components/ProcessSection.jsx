import { processSteps, currentlyExploring } from '../data/portfolioData';

export default function ProcessSection() {
  return (
    <section id="process" className="process-section theme-light" aria-label="Design Process & Current Explorations">
      <div className="process-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="header-meta-row">
            <span className="section-index-badge">CHAPTER 06</span>
            <span className="header-divider" aria-hidden="true">—</span>
            <span className="header-category">METHODOLOGY</span>
          </div>

          <div className="header-headline-row">
            <h2 className="section-title">
              <span className="title-block">FROM IDEA</span>
              <span className="title-block">TO INTERFACE.</span>
            </h2>
            <p className="section-lead">
              A structured yet flexible framework I follow to ensure every design decision is backed by user needs, thoughtful iteration, and clear execution.
            </p>
          </div>
        </div>

        {/* 6 Steps Progression Grid */}
        <div className="process-journey-grid">
          {processSteps.map((step, idx) => (
            <div key={step.number} className="process-step-item">
              <div className="step-top-line">
                <span className="step-num-big">{step.number}</span>
                <span className="step-connector-dot" aria-hidden="true"></span>
              </div>
              <h3 className="step-name">{step.name}</h3>
              <p className="step-desc">{step.desc}</p>
              <div className="step-index-bar" aria-hidden="true">
                <span className="bar-fill" style={{ width: `${((idx + 1) / 6) * 100}%` }}></span>
              </div>
            </div>
          ))}
        </div>

        {/* Section 18: CURRENTLY EXPLORING */}
        <div className="exploring-editorial-block">
          <div className="exploring-top-meta">
            <span className="exploring-label">EXPERIMENTATION LAB</span>
            <span className="exploring-badge">LIVE 2026</span>
          </div>

          <h3 className="exploring-statement">
            STILL LEARNING.
            <br />
            STILL EXPERIMENTING.
            <br />
            STILL BUILDING.
          </h3>

          <p className="exploring-description">
            Design is never static. Outside coursework and formal projects, I dedicate weekly sprint hours to dissecting web interactions, testing modern component styling, and leveling up my creative coding capabilities.
          </p>

          <div className="exploring-topics-cluster" aria-label="Areas currently exploring">
            {currentlyExploring.map((topic) => (
              <span key={topic} className="exploring-topic-pill">
                <span className="topic-bullet" aria-hidden="true">→</span>
                <span>{topic}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
