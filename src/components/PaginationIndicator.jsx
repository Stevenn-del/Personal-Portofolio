// Komponen ini menampilkan indikator titik navigasi slide di sisi kiri layar.
// Pengguna dapat melihat posisi slide aktif (Cover, About, Project, Experience, Contact)
// serta dapat mengeklik titik pagination untuk langsung berpindah ke slide tersebut.

export default function PaginationIndicator({ currentSlide, totalSlides, onSelectSlide, isUnderlayerOpen }) {
  // Sembunyikan indikator pagination saat halaman detail/underlayer sedang dibuka
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
