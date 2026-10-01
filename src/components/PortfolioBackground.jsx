// Komponen ini mengatur latar belakang visual atmosfer langit malam, bintang,
// pendaran bulan, dan tipografi selestial pada halaman utama portofolio.
// Animasi dan kedalaman visual ini terinspirasi dari gaya editorial Kuon Yagi.

export default function PortfolioBackground({ activeSlideIndex, isUnderlayerOpen }) {
  // Efek visual bulan hanya tampil menonjol pada slide pertama (Hero/Cover)
  const isTopSlide = activeSlideIndex === 0 && !isUnderlayerOpen;

  return (
    <div className="portfolio-background-wrap" aria-hidden="true">
      {/* Gradien warna langit malam */}
      <div className="sky-color"></div>

      {/* Hamparan bintang berkelap-kelip halus */}
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

      {/* Pendaran cahaya bulan lembut */}
      <div className="moon-background">
        <div className="moonlight">
          <div className="moonlight__glow"></div>
        </div>
      </div>

      {/* Elemen visual bulan selestial (tampil penuh pada slide cover) */}
      <div className={`moon ${isTopSlide ? 'is-visible' : 'is-faded'}`}>
        <div className="moon__inner">
          <div className="moon__cloud cloud--back"></div>
          <div className="moon__sphere">
            <div className="moon__crater crater-1"></div>
            <div className="moon__crater crater-2"></div>
            <div className="moon__crater crater-3"></div>
          </div>
          <div className="moon__cloud cloud--front"></div>
          <div className="moon__text-wrap">
            <p className="moon__text">PORTFOLIO</p>
          </div>
        </div>
      </div>

      {/* Indikator scroll vertikal SCROLLDOWN pada mode slide deck */}
      {!isUnderlayerOpen && (
        <p className="scrollDown">
          <span>SCROLLDOWN</span>
        </p>
      )}
    </div>
  );
}
