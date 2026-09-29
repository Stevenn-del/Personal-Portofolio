export default function KuonPagination({ currentSlide, totalSlides, onSelectSlide, isUnderlayerOpen }) {
  if (isUnderlayerOpen) return null;

  return (
    <nav id="fp-nav" className="fp-nav" aria-label="Page Slider Navigation">
      <ul>
        {Array.from({ length: totalSlides }).map((_, i) => (
          <li key={i}>
            <button
              type="button"
              className={currentSlide === i ? 'is-active active' : ''}
              onClick={() => onSelectSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={currentSlide === i ? 'true' : undefined}
            >
              <span></span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
