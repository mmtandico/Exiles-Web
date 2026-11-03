import { useState } from 'react'
import { management } from '../data/siteContent'
import { playClickSound, playHoverSound, playEnterSound } from '../utils/soundEffects'

const departments = ['ALL', 'FOUNDER', 'EXECUTIVE', 'ADMINS', 'MANAGERS', 'DIRECTORS']

export default function ManagementSection({ onOpenProfile }) {
  const [activeDept, setActiveDept] = useState('ALL')

  const filteredStaff =
    activeDept === 'ALL'
      ? management
      : management.filter((m) => m.department === activeDept)

  const handleOpenStaff = (person) => {
    playEnterSound()
    if (onOpenProfile) onOpenProfile(person)
  }

  const handleRandomSpotlight = () => {
    playEnterSound()
    const randomPerson = management[Math.floor(Math.random() * management.length)]
    if (randomPerson && onOpenProfile) {
      onOpenProfile(randomPerson)
    }
  }

  return (
    <section id="management" className="tyrant-section tyrant-management">
      {/* Animated Floating Profile Wall Behind Team Exiles Community */}
      <div className="tyrant-community-bg" aria-hidden="true">
        <div className="tyrant-community-bg__row tyrant-community-bg__row--left">
          {[...management, ...management].map((item, idx) => (
            <div
              key={`bg-1-${item.id}-${idx}`}
              className="tyrant-community-bg__pill"
              style={{ '--pill-accent': item.accent || '#ff3700' }}
            >
              <img src={item.image} alt="" className="tyrant-community-bg__avatar" />
              <div className="tyrant-community-bg__meta">
                <span className="tyrant-community-bg__name">{item.name}</span>
                <span className="tyrant-community-bg__dept">{item.department}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="tyrant-community-bg__row tyrant-community-bg__row--right">
          {[...management].reverse().concat([...management].reverse()).map((item, idx) => (
            <div
              key={`bg-2-${item.id}-${idx}`}
              className="tyrant-community-bg__pill"
              style={{ '--pill-accent': item.accent || '#ff3700' }}
            >
              <img src={item.image} alt="" className="tyrant-community-bg__avatar" />
              <div className="tyrant-community-bg__meta">
                <span className="tyrant-community-bg__name">{item.name}</span>
                <span className="tyrant-community-bg__dept">{item.rankCode || item.department}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="tyrant-container tyrant-management__container">
        {/* Section Header */}
        <div className="tyrant-creators__header reveal-on-scroll">
          <div className="tyrant-creators__header-left">
            <div className="tyrant-section-tag">03 / COMMAND HIERARCHY</div>
            <h2 className="tyrant-creators__title">
              BEHIND TEAM
              <br />
              <span className="tyrant-text-accent">EXILES COMMUNITY.</span>
            </h2>
          </div>

          <div className="tyrant-creators__header-right">
            <p className="tyrant-creators__lead">
              THE FOUNDER, EXECUTIVE, ADMINS, MANAGERS & DIRECTORS
              <br />
              LEADING THE EXILES COMPETITIVE ECOSYSTEM.
            </p>
            <div className="tyrant-creators__count-highlight">
              FOUNDER • EXECUTIVE • 3 ADMINS • 2 MANAGERS • 12 DIRECTORS
            </div>
          </div>
        </div>

        {/* Department Filters + Random Animated Profile Spotlight Button */}
        <div className="tyrant-filters-bar reveal-on-scroll">
          <div className="tyrant-filters">
            {departments.map((dept) => (
              <button
                key={dept}
                type="button"
                className={`tyrant-filter-btn ${activeDept === dept ? 'active' : ''}`}
                onClick={() => {
                  playClickSound()
                  setActiveDept(dept)
                }}
                onMouseEnter={playHoverSound}
              >
                {dept}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="tyrant-btn tyrant-btn--random-profile"
            onClick={handleRandomSpotlight}
            onMouseEnter={playHoverSound}
          >
            <span>⚡ RANDOM PROFILE SPOTLIGHT</span>
          </button>
        </div>

        {/* Staff Cards Grid (4 Columns) with Animated Cyber Profile Backdrops */}
        <div key={activeDept} className="tyrant-cards-grid">
          {filteredStaff.map((person, idx) => (
            <div
              key={person.id}
              className={`tyrant-card tyrant-card--staff tyrant-card--animated tyrant-card--pattern-${person.animPattern || 'pulse'}`}
              style={{
                '--stagger-index': idx,
                '--profile-accent': person.accent || '#ff3700',
              }}
              onClick={() => handleOpenStaff(person)}
              onMouseEnter={playHoverSound}
            >
              <div className="tyrant-card__top-bar">
                <span className="tyrant-card__division-badge">
                  {person.rankCode ? `${person.rankCode} // ${person.department}` : person.department}
                </span>
                <button
                  type="button"
                  className="tyrant-card__view-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleOpenStaff(person)
                  }}
                >
                  DOSSIER
                </button>
              </div>

              {/* Animated Cybernetic Profile Backdrop & Avatar */}
              <div className="tyrant-animated-profile">
                <div className="tyrant-animated-profile__aura" />
                <div className="tyrant-animated-profile__ring tyrant-animated-profile__ring--outer" />
                <div className="tyrant-animated-profile__ring tyrant-animated-profile__ring--inner" />
                <div className="tyrant-animated-profile__scanline" />
                <div className="tyrant-animated-profile__particles">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div className="tyrant-animated-profile__avatar-frame">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="tyrant-animated-profile__avatar-img"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="tyrant-card__gradient" />

              <div className="tyrant-card__bottom">
                <div className="tyrant-card__info">
                  <h3 className="tyrant-card__name">{person.name}</h3>
                  <span className="tyrant-card__role">{person.role}</span>

                  {(person.winRate || person.kda) && (
                    <div className="tyrant-card__stats-row">
                      {person.winRate && (
                        <span className="tyrant-card__stat-chip">{person.winRate}</span>
                      )}
                      {person.kda && (
                        <span className="tyrant-card__stat-chip">{person.kda}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
