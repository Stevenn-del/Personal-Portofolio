import { skillsData, educationData } from '../data/portfolioData';

export default function SkillsSection() {
  const getBadgeClass = (level) => {
    switch (level.toLowerCase()) {
      case 'comfortable':
        return 'badge-comfortable';
      case 'growing':
        return 'badge-growing';
      case 'learning':
      default:
        return 'badge-learning';
    }
  };

  const skillGroups = [
    { title: 'DESIGN & UI/UX', items: skillsData.design, index: '01' },
    { title: 'CREATIVE TOOLS', items: skillsData.tools, index: '02' },
    { title: 'WEB & DEVELOPMENT', items: skillsData.development, index: '03' },
    { title: 'COLLABORATION & PROCESS', items: skillsData.other, index: '04' },
  ];

  return (
    <section id="skills" className="skills-section theme-dark" aria-label="Skills and Education">
      <div className="skills-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="header-meta-row">
            <span className="section-index-badge">CHAPTER 05</span>
            <span className="header-divider" aria-hidden="true">—</span>
            <span className="header-category">CAPABILITIES & BACKGROUND</span>
          </div>

          <div className="header-headline-row">
            <h2 className="section-title">SKILL SET</h2>
            <p className="section-lead">
              An honest snapshot of my competencies, design tools, and technical exploration as a student. Rather than arbitrary percentages, I categorize my proficiency by real experience.
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="skills-legend-bar">
          <span className="legend-label">STATUS SCALE:</span>
          <div className="legend-items">
            <span className="legend-item">
              <span className="legend-dot dot-comfortable" aria-hidden="true"></span>
              <span>Comfortable (Confident daily workflow)</span>
            </span>
            <span className="legend-item">
              <span className="legend-dot dot-growing" aria-hidden="true"></span>
              <span>Growing (Applied in projects & advancing)</span>
            </span>
            <span className="legend-item">
              <span className="legend-dot dot-learning" aria-hidden="true"></span>
              <span>Learning (Active study & experimentation)</span>
            </span>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="skills-category-grid">
          {skillGroups.map((group) => (
            <div key={group.title} className="skill-group-card">
              <div className="group-header">
                <span className="group-num">{group.index}</span>
                <h3 className="group-title">{group.title}</h3>
              </div>

              <ul className="skill-items-list">
                {group.items.map((skill) => (
                  <li key={skill.name} className="skill-item-row">
                    <span className="skill-name">{skill.name}</span>
                    <span className={`skill-level-tag ${getBadgeClass(skill.level)}`}>
                      {skill.level}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Academic & Achievements Split Block */}
        <div className="education-achievements-row">
          {/* Education Card */}
          <div className="edu-card">
            <div className="edu-header">
              <span className="edu-badge">ACADEMIC BACKGROUND</span>
              <span className="edu-year">{educationData.year}</span>
            </div>
            <h3 className="edu-institution">{educationData.institution}</h3>
            <p className="edu-program">{educationData.program}</p>
            <p className="edu-description">{educationData.description}</p>
          </div>

          {/* Achievements Card */}
          <div className="achievements-card">
            <div className="achievements-header">
              <span className="achievements-badge">CERTIFICATES & MILESTONES</span>
              <span className="achievements-count">3 Recorded</span>
            </div>

            <div className="achievements-list">
              {educationData.achievements.map((ach, idx) => (
                <div key={idx} className="achievement-row">
                  <span className="ach-year">{ach.year}</span>
                  <div className="ach-details">
                    <h4 className="ach-title">{ach.title}</h4>
                    <p className="ach-sub">{ach.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="achievements-footer-note">
              <span className="pulse-mark" aria-hidden="true">✦</span>
              <span>{educationData.futureNote}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
