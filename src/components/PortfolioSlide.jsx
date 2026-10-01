import { personalInfo, projects } from '../data/portfolioData';

// Komponen ini mengatur tampilan setiap slide pada deck presentasi utama (mode layar penuh).
// Mengikuti alur editorial final yang diwajibkan:
// 00: HOME / HERO (STEVEN WANG)
// 01: ABOUT ME (WHO I AM - Preview dengan tombol SHOW ME MORE → membuka halaman dedikasi About Me)
// 02: PROJECT (Preview minimal dengan tombol SHOW ME MORE → membuka halaman dedikasi koleksi project)
// 03: EXPERIENCE (Preview dengan tombol SHOW ME MORE → membuka halaman dedikasi Experience)
// 04: GET IN TOUCH & FOOTER (Komposisi penutup: kontak di kiri, visual di kanan, diikuti footer normal terpisah)
export default function PortfolioSlide({
  type, // 'top' | 'about' | 'project' | 'experience' | 'contact'
  isActive,
  onOpenAbout,
  onOpenProjects,
  onOpenExperience,
  onOpenFeaturedProject,
  onNavigateHome,
  onNavigateAboutNav,
  onNavigateProjectsNav,
  onNavigateExperienceNav,
  onNavigateContact,
}) {
  // -------------------------------------------------------------
  // SLIDE 00: COVER / HERO (HOME)
  // Halaman sampul editorial dengan nama Steven Wang, status, dan link sosial
  // -------------------------------------------------------------
  if (type === 'top') {
    return (
      <div className={`section slide-item slide--top ${isActive ? 'is-active' : ''}`}>
        <div className="fullpage__slide">
          <div className="title title--top">
            <h1 className="title__text title__text--top hero-name-step">
              STEVEN<br />WANG
            </h1>
            <div className="border hero-border-step">
              <span></span>
              <span></span>
            </div>
            <p className="title__lead hero-lead-step">
              PORTFOLIO<br />
              <span className="hero-lead-role">STUDENT · ASPIRING UI/UX DESIGNER</span>
            </p>
            <div className="hero-social-links hero-social-step">
              <a
                href={personalInfo.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-link"
                aria-label="Instagram @stevnn_wang"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span>Instagram</span>
              </a>
              <a
                href={`mailto:${personalInfo.contact.email}`}
                className="hero-social-link"
                aria-label="Email stevennwang08@gmail.com"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>Email</span>
              </a>
              <a
                href={personalInfo.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-link"
                aria-label="GitHub Stevenn-del"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // SLIDE 01: ABOUT ME (Muncul SEBELUM Project)
  // Section preview editorial dengan judul "WHO I AM"
  // Klik pada "SHOW ME MORE →" atau gambar membuka halaman dedikasi About Me (01 Who I Am, 02 Passion, 03 Skill Set)
  // -------------------------------------------------------------
  if (type === 'about') {
    return (
      <div className={`section slide-item slide--about ${isActive ? 'is-active' : ''}`}>
        <div className="fullpage__slide">
          <div className="title">
            <h2 className="title__text slide-title-step">
              ABOUT<br />ME
            </h2>
            <div className="border slide-border-step">
              <span></span>
              <span></span>
            </div>
            <p className="title__lead slide-lead-step">
              STEVEN WANG<br />
              <span className="slide-lead-sub">STUDENT · ASPIRING UI/UX DESIGNER</span>
            </p>
            <p className="slide-short-desc">
              I love Design, Technology, and Story. Exploring digital interfaces that are intuitive, useful, and engaging.
            </p>
            <div className="btn-wrap slide-btn-step">
              <button
                type="button"
                className="btn btn--editorial-reveal"
                onClick={onOpenAbout}
                aria-label="Show me more about Steven Wang"
              >
                <span>SHOW ME MORE &rarr;</span>
              </button>
            </div>
          </div>

          <div
            className="image image--about slide-img-step"
            onClick={onOpenAbout}
            role="button"
            tabIndex={0}
            aria-label="Open detailed profile about Steven Wang"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (onOpenAbout) onOpenAbout();
              }
            }}
          >
            <div className="image__over">
              <div className="image__cover"></div>
              <div className="image__cover"></div>
            </div>
            <div
              className="image__bg"
              style={{ backgroundImage: 'url(/images/steven-portrait.jpg)' }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // SLIDE 02: PROJECT (Muncul SETELAH About Me)
  // Preview homepage minimal: Judul "PROJECT" + tombol "SHOW ME MORE →"
  // Tidak menampilkan semua project langsung di homepage
  // Klik pada tombol atau gambar membuka Project Page dedikasi yang memuat semua project alternating
  // -------------------------------------------------------------
  if (type === 'project') {
    return (
      <div className={`section slide-item slide--project ${isActive ? 'is-active' : ''}`}>
        <div className="fullpage__slide">
          <div className="title">
            <h2 className="title__text slide-title-step">
              PROJECT
            </h2>
            <div className="border slide-border-step">
              <span></span>
              <span></span>
            </div>
            <p className="title__lead slide-lead-step">
              SELECTED WORKS &middot; 2026
            </p>
            <p className="slide-short-desc">
              Selected interface designs, web explorations, and digital product case studies designed for engagement and clarity.
            </p>
            <div className="btn-wrap slide-btn-step">
              <button
                type="button"
                className="btn btn--editorial-reveal"
                onClick={onOpenProjects}
                aria-label="Show me more projects"
              >
                <span>SHOW ME MORE &rarr;</span>
              </button>
            </div>
          </div>

          <div
            className="image image--works slide-img-step"
            onClick={onOpenProjects}
            role="button"
            tabIndex={0}
            aria-label="Open dedicated project page"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (onOpenProjects) onOpenProjects();
              }
            }}
          >
            <div className="image__over">
              <div className="image__cover"></div>
              <div className="image__cover"></div>
            </div>
            <div
              className="image__bg"
              style={{ backgroundImage: 'url(/images/project-nusa-bot.jpg)' }}
            ></div>
            <div className="hero-text-overlay" aria-hidden="true">
              WORKS
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // SLIDE 03: EXPERIENCE (Muncul SETELAH Project)
  // Preview editorial dengan tombol "SHOW ME MORE →"
  // Membuka halaman dedikasi Experience (Currently Learning, Certificates, Competitions)
  // -------------------------------------------------------------
  if (type === 'experience') {
    return (
      <div className={`section slide-item slide--experience ${isActive ? 'is-active' : ''}`}>
        <div className="fullpage__slide">
          <div className="title">
            <h2 className="title__text slide-title-step title__text--experience">
              EXPERIENCE
            </h2>
            <div className="border slide-border-step">
              <span></span>
              <span></span>
            </div>
            <p className="title__lead slide-lead-step">
              CERTIFICATES &amp; LEARNING
            </p>
            <p className="slide-short-desc">
              Documenting coursework, skill validations, and continuous exploration in UI/UX design and front-end development.
            </p>
            <div className="btn-wrap slide-btn-step">
              <button
                type="button"
                className="btn btn--editorial-reveal"
                onClick={onOpenExperience}
                aria-label="Show me more about experience"
              >
                <span>SHOW ME MORE &rarr;</span>
              </button>
            </div>
          </div>

          <div
            className="image image--about slide-img-step"
            onClick={onOpenExperience}
            role="button"
            tabIndex={0}
            aria-label="Open experience and certificates page"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (onOpenExperience) onOpenExperience();
              }
            }}
          >
            <div className="image__over">
              <div className="image__cover"></div>
              <div className="image__cover"></div>
            </div>
            <div
              className="image__bg"
              style={{ backgroundImage: 'url(/images/project-arvion.jpg)' }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // SLIDE 04: GET IN TOUCH & FOOTER (Bagian Penutup Terakhir)
  // Menampilkan halaman GET IN TOUCH lengkap di atas (Sisi Kiri: Kontak, Sisi Kanan: Visual Laptop),
  // dan di bawahnya menyatu FOOTER editorial persis sesuai foto referensi
  // (seperti contoh Exabytes: konten Support/Get In Touch di atas, Footer di bawah)
  // -------------------------------------------------------------
  if (type === 'contact') {
    return (
      <div className={`section slide-item slide--contact ${isActive ? 'is-active' : ''}`}>
        <div className="fullpage__slide fullpage__slide--contact">
          {/* Bagian 1: Halaman GET IN TOUCH (Kembalikan tampilan asli yang disukai user) */}
          <div className="contact-main-hero">
            <div className="title title--contact">
              <h2 className="title__text slide-title-step">
                GET IN<br />TOUCH
              </h2>
              <div className="border slide-border-step">
                <span></span>
                <span></span>
              </div>
              <ul className="contact-list-editorial slide-btn-step">
                <li>
                  <a
                    href={`mailto:${personalInfo.contact.email}`}
                    className="contact-editorial-link"
                    aria-label={`Email ${personalInfo.contact.email}`}
                  >
                    {personalInfo.contact.email}
                  </a>
                </li>
                <li>
                  <a
                    href={personalInfo.contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-editorial-link"
                    aria-label="Instagram @stevnn_wang"
                  >
                    Instagram: {personalInfo.contact.instagramHandle}
                  </a>
                </li>
                <li>
                  <a
                    href={personalInfo.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-editorial-link"
                    aria-label="GitHub Stevenn-del"
                  >
                    GitHub: {personalInfo.contact.githubHandle}
                  </a>
                </li>
              </ul>
            </div>

            <div className="image image--contact slide-img-step">
              <div className="image__over">
                <div className="image__cover"></div>
                <div className="image__cover"></div>
              </div>
              <div
                className="image__bg image__bg--contact"
                style={{ backgroundImage: 'url(/images/project-portfolio.jpg)' }}
              ></div>
            </div>
          </div>

          {/* Bagian 2: FOOTER (Persis sesuai foto referensi yang disukai user) */}
          <footer className="detail-footer-main front-footer-main" aria-label="Website Footer">
            <div className="content detail-footer-grid">
              {/* Kolom 1: Brand & Role */}
              <div className="footer-brand-pane">
                <h3 className="detail-footer-brand">{personalInfo.name.toUpperCase()}</h3>
                <p className="detail-footer-role">{personalInfo.roleTitle}</p>
              </div>

              {/* Kolom 2: Navigasi Utama */}
              <div className="footer-nav-pane">
                <span className="detail-footer-heading">NAVIGATION</span>
                <ul className="detail-footer-nav">
                  <li>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        if (onNavigateHome) onNavigateHome();
                      }}
                    >
                      HOME
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        if (onNavigateAboutNav) onNavigateAboutNav();
                      }}
                    >
                      ABOUT ME
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        if (onNavigateProjectsNav) onNavigateProjectsNav();
                      }}
                    >
                      PROJECT
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        if (onNavigateExperienceNav) onNavigateExperienceNav();
                      }}
                    >
                      EXPERIENCE
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        const contactSlide = document.querySelector('.slide--contact');
                        if (contactSlide) contactSlide.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      GET IN TOUCH
                    </button>
                  </li>
                </ul>
              </div>

              {/* Kolom 3: Connect (Instagram, Email, GitHub) */}
              <div className="footer-social-pane">
                <span className="detail-footer-heading">CONNECT</span>
                <ul className="detail-footer-social">
                  <li>
                    <a
                      href={personalInfo.contact.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram @stevnn_wang"
                    >
                      <span>Instagram</span> <span className="footer-handle">@stevnn_wang</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${personalInfo.contact.email}`}
                      aria-label={`Email ${personalInfo.contact.email}`}
                    >
                      <span>Email</span> <span className="footer-handle">{personalInfo.contact.email}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={personalInfo.contact.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub Stevenn-del"
                    >
                      <span>GitHub</span> <span className="footer-handle">Stevenn-del</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Baris Bawah: Hak Cipta */}
            <div className="content detail-footer-bottom">
              <p className="detail-footer-copy">&copy; 2026 {personalInfo.name.toUpperCase()}</p>
            </div>
          </footer>
        </div>
      </div>
    );
  }

  return null;
}
