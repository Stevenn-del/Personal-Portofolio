// Komponen ini mengatur area penutup di bagian bawah setiap halaman detail (Underlayer / Show Me More).
// Sesuai instruksi: footer navigasi dan Get In Touch cukup berada di halaman depan (Slide 4).
// Di dalam halaman detail ("Show Me More"), bagian Get In Touch dan Footer Navigasi ditiadakan,
// hanya menampilkan tombol BACK untuk kembali ke presentasi slide utama.
export default function DetailFooter({ onClose }) {
  return (
    <footer className="detail-footer detail-footer--minimal" aria-label="Page Navigation Close">
      {/* TOMBOL BACK — Animasi hover lembut untuk kembali ke slide sebelumnya */}
      <div className="content back-btn-wrap" style={{ marginTop: '5rem', marginBottom: '5rem', textAlign: 'center' }}>
        <button
          type="button"
          className="back-btn"
          onClick={onClose}
          aria-label="Back to previous page"
        >
          BACK
        </button>
      </div>
    </footer>
  );
}
