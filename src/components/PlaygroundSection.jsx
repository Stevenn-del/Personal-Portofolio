import { useState } from 'react';

export default function PlaygroundSection() {
  const [activeTab, setActiveTab] = useState('kinetic');
  const [inputText, setInputText] = useState('CREATIVE CRAFT');
  const [fontStretch, setFontStretch] = useState(100);
  const [letterSpacing, setLetterSpacing] = useState(2);
  const [zenPattern, setZenPattern] = useState('circles');

  return (
    <section id="playground" className="playground-section">
      <div className="playground-container">
        {/* Section Header */}
        <div className="section-eyebrow-bar">
          <span className="section-number">04.5</span>
          <span className="section-label">CREATIVE PLAYGROUND</span>
          <span className="section-rule" aria-hidden="true" />
          <span className="section-year">LAB &middot; EXPERIMENTS</span>
        </div>

        <div className="playground-header-block">
          <h2 className="playground-main-title">
            PLAYGROUND &amp; EXPERIMENTS
          </h2>
          <p className="playground-desc">
            A small sandbox for creative coding, dynamic typography, and interface interactions that explore digital aesthetics.
          </p>

          <div className="playground-tabs" role="tablist" aria-label="Playground experiments">
            <button
              type="button"
              className={`tab-btn ${activeTab === 'kinetic' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('kinetic')}
              role="tab"
              aria-selected={activeTab === 'kinetic'}
            >
              01 &middot; KINETIC TYPE
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'zen' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('zen')}
              role="tab"
              aria-selected={activeTab === 'zen'}
            >
              02 &middot; ZEN GEOMETRY
            </button>
          </div>
        </div>

        {/* Experiment 01: Kinetic Typography */}
        {activeTab === 'kinetic' && (
          <div className="experiment-card kinetic-card">
            <div className="experiment-controls">
              <div className="control-group">
                <label htmlFor="play-text-input">CUSTOM TEXT:</label>
                <input
                  id="play-text-input"
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value.toUpperCase().slice(0, 24))}
                  maxLength={24}
                  className="play-input"
                  placeholder="TYPE SOMETHING..."
                />
              </div>

              <div className="control-group slider-group">
                <label htmlFor="play-weight-slider">WEIGHT ({fontStretch}):</label>
                <input
                  id="play-weight-slider"
                  type="range"
                  min="300"
                  max="900"
                  step="100"
                  value={fontStretch}
                  onChange={(e) => setFontStretch(Number(e.target.value))}
                  className="play-slider"
                />
              </div>

              <div className="control-group slider-group">
                <label htmlFor="play-spacing-slider">SPACING ({letterSpacing}px):</label>
                <input
                  id="play-spacing-slider"
                  type="range"
                  min="-2"
                  max="16"
                  step="1"
                  value={letterSpacing}
                  onChange={(e) => setLetterSpacing(Number(e.target.value))}
                  className="play-slider"
                />
              </div>
            </div>

            <div className="kinetic-preview-viewport">
              <div
                className="kinetic-display-text"
                style={{
                  fontWeight: fontStretch,
                  letterSpacing: `${letterSpacing}px`,
                }}
              >
                {inputText || 'DESIGN CRAFT'}
              </div>
              <div className="viewport-footnote">
                <span>INTERACTIVE CSS VARIABLE TESTING</span>
                <span>FONT: OUTFIT GEOMETRIC</span>
              </div>
            </div>
          </div>
        )}

        {/* Experiment 02: Zen Geometry */}
        {activeTab === 'zen' && (
          <div className="experiment-card zen-card">
            <div className="zen-controls">
              <span className="zen-label">PATTERN MODE:</span>
              <div className="zen-buttons">
                <button
                  type="button"
                  className={`zen-btn ${zenPattern === 'circles' ? 'is-active' : ''}`}
                  onClick={() => setZenPattern('circles')}
                >
                  CONCENTRIC ENSO
                </button>
                <button
                  type="button"
                  className={`zen-btn ${zenPattern === 'waves' ? 'is-active' : ''}`}
                  onClick={() => setZenPattern('waves')}
                >
                  SEIGAIHA WAVES
                </button>
                <button
                  type="button"
                  className={`zen-btn ${zenPattern === 'grid' ? 'is-active' : ''}`}
                  onClick={() => setZenPattern('grid')}
                >
                  HAIRLINE LATTICE
                </button>
              </div>
            </div>

            <div className="zen-canvas-viewport">
              <svg
                viewBox="0 0 600 300"
                className="zen-svg"
                preserveAspectRatio="xMidYMid meet"
                aria-label="Japanese zen geometric pattern"
              >
                {zenPattern === 'circles' && (
                  <g stroke="currentColor" fill="none" strokeWidth="1" opacity="0.6">
                    {[30, 60, 90, 120, 150, 180, 210, 240].map((r, i) => (
                      <circle
                        key={i}
                        cx="300"
                        cy="150"
                        r={r}
                        strokeDasharray={i % 2 === 0 ? "4 4" : "none"}
                        className="zen-ring-animated"
                      />
                    ))}
                    <line x1="100" y1="150" x2="500" y2="150" strokeDasharray="2 4" />
                    <line x1="300" y1="20" x2="300" y2="280" strokeDasharray="2 4" />
                    <circle cx="300" cy="150" r="4" fill="var(--accent)" stroke="none" />
                  </g>
                )}

                {zenPattern === 'waves' && (
                  <g stroke="currentColor" fill="none" strokeWidth="1" opacity="0.6">
                    {[0, 1, 2, 3, 4, 5, 6].map((row) =>
                      [0, 1, 2, 3, 4, 5].map((col) => (
                        <g key={`${row}-${col}`} transform={`translate(${col * 100 + (row % 2) * 50}, ${row * 45})`}>
                          <path d="M-40,0 A40,40 0 0,1 40,0" />
                          <path d="M-30,0 A30,30 0 0,1 30,0" strokeDasharray="2 3" />
                          <path d="M-20,0 A20,20 0 0,1 20,0" />
                          <path d="M-10,0 A10,10 0 0,1 10,0" />
                        </g>
                      ))
                    )}
                  </g>
                )}

                {zenPattern === 'grid' && (
                  <g stroke="currentColor" fill="none" strokeWidth="0.75" opacity="0.5">
                    {Array.from({ length: 15 }).map((_, i) => (
                      <line key={`v-${i}`} x1={i * 40 + 20} y1="0" x2={i * 40 + 20} y2="300" />
                    ))}
                    {Array.from({ length: 8 }).map((_, i) => (
                      <line key={`h-${i}`} x1="0" y1={i * 40 + 10} x2="600" y2={i * 40 + 10} />
                    ))}
                    {Array.from({ length: 8 }).map((_, i) => (
                      <circle
                        key={`pt-${i}`}
                        cx={i * 80 + 20}
                        cy={(i % 4) * 80 + 10}
                        r="3"
                        fill="var(--accent)"
                        stroke="none"
                      />
                    ))}
                  </g>
                )}
              </svg>
              <div className="viewport-footnote">
                <span>MATHEMATICAL VECTOR GEOMETRY</span>
                <span>INVENTED ACCENT / ZERO EXTERNAL ASSETS</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
