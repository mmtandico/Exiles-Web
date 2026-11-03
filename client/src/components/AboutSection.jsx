import { playClickSound, playHoverSound } from '../utils/soundEffects'

const pillars = [
  {
    id: 'drop-in',
    title: 'DROP IN',
    desc: 'Jump into intense competitive matches, scrims, and clan wars across 10 premier gaming titles full of high-stakes action.',
    target: 'teams',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="apex-pillar__svg">
        <path d="M32 8L12 48H24L32 30L40 48H52L32 8Z" fill="currentColor" />
        <path d="M18 52L26 56H38L46 52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'loot-up',
    title: 'GEAR UP',
    desc: 'Master the meta with structured coaching, tactical playbooks, and high-tier loadouts to outplay every opponent.',
    target: 'creators',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="apex-pillar__svg">
        <path d="M20 18L20 52M32 10L32 52M44 18L44 52" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        <polygon points="20,10 16,18 24,18" fill="currentColor" />
        <polygon points="32,4 28,12 36,12" fill="currentColor" />
        <polygon points="44,10 40,18 48,18" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'squad-up',
    title: 'SQUAD UP',
    desc: 'Unite under our 19-leader command hierarchy of Founders, Executives, Admins, Managers, and Directors.',
    target: 'management',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="apex-pillar__svg">
        <circle cx="32" cy="18" r="7" fill="currentColor" />
        <circle cx="16" cy="24" r="5.5" fill="currentColor" />
        <circle cx="48" cy="24" r="5.5" fill="currentColor" />
        <path d="M20 48C20 38 25 32 32 32C39 32 44 38 44 48" fill="currentColor" />
        <path d="M6 48C6 40 10 36 16 36C20 36 22 38 23 42" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M58 48C58 40 54 36 48 36C44 36 42 38 41 42" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'be-the-last',
    title: 'BE THE LAST',
    desc: 'Use strategy, mechanical skill, and relentless teamwork to be the last squad standing on Championship Sunday.',
    target: 'inside',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="apex-pillar__svg">
        <path d="M12 46L16 20L26 32L32 14L38 32L48 20L52 46H12Z" fill="currentColor" />
        <rect x="14" y="50" width="36" height="4" fill="currentColor" />
      </svg>
    ),
  },
]

export default function AboutSection() {
  const handleScrollTo = (id) => {
    playClickSound('primary')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="about" className="apex-pillars-section">
      <div className="tyrant-container">
        <div className="apex-pillars-grid reveal-on-scroll">
          {pillars.map((pillar, idx) => (
            <div
              key={pillar.id}
              className="apex-pillar-card"
              style={{ '--stagger-index': idx }}
              onClick={() => handleScrollTo(pillar.target)}
              onMouseEnter={playHoverSound}
            >
              <div className="apex-pillar-card__icon">{pillar.icon}</div>
              <h3 className="apex-pillar-card__title">{pillar.title}</h3>
              <p className="apex-pillar-card__desc">{pillar.desc}</p>
              <span className="apex-pillar-card__link">
                LEARN MORE <span className="apex-pillar-card__chevron">›</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
