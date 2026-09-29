export default function KuonBackground({ activeSlideIndex, isUnderlayerOpen }) {
  // Hide background parallax moon on underlayers if needed or keep it subtle
  const isTopSlide = activeSlideIndex === 0 && !isUnderlayerOpen;

  return (
    <div className="kuon-background-wrap" aria-hidden="true">
      {/* Sky Color Gradient */}
      <div className="sky-color"></div>

      {/* Star Field */}
      <div className="star">
        <div className="star__field">
          {Array.from({ length: 40 }).map((_, i) => (
            <span
              key={i}
              className="star__dot"
              style={{
                top: `${(i * 17) % 95}%`,
                left: `${(i * 23) % 95}%`,
                animationDelay: `${(i % 5) * 0.7}s`,
                opacity: 0.3 + ((i % 5) * 0.15),
              }}
            />
          ))}
        </div>
      </div>

      {/* Moon Light Glow */}
      <div className="moon-background">
        <div className="moonlight">
          <div className="moonlight__glow"></div>
        </div>
      </div>

      {/* Celestial Moon Layer (Only prominent on Slide 0 like Kuon Yagi's site) */}
      <div className={`moon ${isTopSlide ? 'is-visible' : 'is-faded'}`}>
        <div className="moon__inner">
          {/* Back cloud layer */}
          <div className="moon__cloud cloud--back"></div>

          {/* Central Moon Sphere */}
          <div className="moon__sphere">
            <div className="moon__crater crater-1"></div>
            <div className="moon__crater crater-2"></div>
            <div className="moon__crater crater-3"></div>
          </div>

          {/* Front cloud layer */}
          <div className="moon__cloud cloud--front"></div>

          {/* PORTFOLIO Overlay Typography */}
          <div className="moon__text-wrap">
            <p className="moon__text">PORTFOLIO</p>
          </div>
        </div>
      </div>

      {/* Fixed Vertical ScrollDown Indicator */}
      {!isUnderlayerOpen && (
        <p className="scrollDown">
          <span>SCROLLDOWN</span>
        </p>
      )}
    </div>
  );
}
