const sections = [
  { id: 'hero', num: '01', name: 'INTRO' },
  { id: 'works', num: '02', name: 'WORKS' },
  { id: 'experience', num: '03', name: 'EXP' },
  { id: 'about', num: '04', name: 'ABOUT' },
  { id: 'skills', num: '05', name: 'SKILLS' },
  { id: 'process', num: '06', name: 'PROCESS' },
  { id: 'contact', num: '07', name: 'CONTACT' },
];

export default function ScrollProgressIndicator({ activeSection, onNavigate }) {
  const isDark = activeSection === 'works' || activeSection === 'skills' || activeSection === 'contact';

  return (
    <aside
      className={`scroll-progress-rail ${isDark ? 'theme-dark' : 'theme-light'}`}
      aria-label="Section navigation rail"
    >
      <div className="rail-track">
        {sections.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              type="button"
              className={`rail-step ${isActive ? 'is-active' : ''}`}
              onClick={() => onNavigate(sec.id)}
              aria-label={`Jump to ${sec.name} section`}
              aria-current={isActive ? 'true' : undefined}
            >
              <span className="rail-num">{sec.num}</span>
              <span className="rail-dot" aria-hidden="true"></span>
              <span className="rail-tooltip">{sec.name}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
