import { useState } from 'react'
import { management } from '../data/siteContent'
import { playClickSound, playHoverSound, playEnterSound } from '../utils/soundEffects'
import { BoltIcon } from './Icons'

const departments = ['ALL', 'FOUNDER', 'EXECUTIVE', 'ADMINS', 'MANAGERS', 'DIRECTORS']

export default function ManagementSection({ onOpenProfile }) {
  const [activeDept, setActiveDept] = useState('ALL')
  const [pageOffset, setPageOffset] = useState(0)
  const [showAllGrid, setShowAllGrid] = useState(false)

  const filteredStaff =
    activeDept === 'ALL'
      ? management
      : management.filter((m) => m.department === activeDept)

  const visibleSlantedList = showAllGrid
    ? filteredStaff
    : filteredStaff
    .slice(pageOffset, pageOffset + 6)
    .concat(
      pageOffset + 6 > filteredStaff.length
        ? filteredStaff.slice(0, Math.max(0, 6 - (filteredStaff.length - pageOffset)))
        : []
    )
    .slice(0, Math.min(6, filteredStaff.length))

  const handleNextPage = () => {
    playClickSound('primary')
    if (filteredStaff.length <= 6) return
    setPageOffset((prev) => (prev + 6) % filteredStaff.length)
  }

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
    <section id="management" className="apex-legends-section tyrant-management">
      <div className="tyrant-container tyrant-management__container">
        {/* Apex-Style Section Header Row */}
        <div className="apex-section-header reveal-on-scroll">
          <div className="apex-section-header__left">
            <h2 className="apex-section-header__title">CHOOSE YOUR LEGEND</h2>
            <span className="apex-section-header__red-bar" />
            <span className="apex-section-header__sub">
              TEAM EXILES COMMUNITY ({management.length})
            </span>
          </div>

          <div className="apex-section-header__right">
            <button
              type="button"
              className="apex-view-all-link"
              onClick={() => {
                playClickSound('primary')
                setShowAllGrid((prev) => !prev)
              }}
              onMouseEnter={playHoverSound}
            >
              {showAllGrid ? 'SHOW 6-SLANT ROW' : `VIEW ALL ${filteredStaff.length} LEGENDS`}{' '}
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Hierarchy Filter Tabs + Random Spotlight */}
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
                  setPageOffset(0)
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
            <BoltIcon className="apex-svg-icon apex-svg-icon--xs" />
            <span style={{ marginLeft: '6px' }}>RANDOM PROFILE SPOTLIGHT</span>
          </button>
        </div>

        {/* Slanted Parallelogram Legend Strip with 3D Minecraft Characters */}
        <div className="apex-legends-strip-wrapper">
          <div
            key={`${activeDept}-${pageOffset}-${showAllGrid}`}
            className={`apex-legends-strip ${showAllGrid ? 'apex-legends-strip--all' : ''}`}
          >
            {visibleSlantedList.map((person, idx) => (
              <div
                key={`${person.id}-${idx}`}
                className="apex-legend-item tyrant-card--animated"
                style={{
                  '--stagger-index': idx,
                  '--profile-accent': person.accent || '#dc2626',
                }}
                onClick={() => handleOpenStaff(person)}
                onMouseEnter={playHoverSound}
              >
                {/* Slanted Parallelogram Portrait Box with Animated Cyber Backdrop & Minecraft Character */}
                <div className="apex-legend-item__slant-frame">
                  <div className="apex-legend-item__unskew">
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
                        <div className="tyrant-animated-profile__mc-wrap">
                          <img
                            src={person.image}
                            alt={person.name}
                            className="tyrant-animated-profile__mc-img"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Legend Name & Role Below Slanted Portrait */}
                  <div className="apex-legend-item__caption">
                    <div className="apex-legend-item__name-row">
                      <span className="apex-legend-item__name">{person.name}</span>
                      <span className="apex-legend-item__chevron">›</span>
                    </div>
                    <span className="apex-legend-item__role">{person.department}</span>
                  </div>
                </div>
            ))}
              </div>

          {/* Red "+" Next-Batch Button on the Right */ }
          {!showAllGrid && filteredStaff.length > 6 && (
              <button
                type="button"
                className="apex-legends-plus-btn"
                onClick={handleNextPage}
                onMouseEnter={playHoverSound}
                title="Next Legends"
                aria-label="Cycle Next Legends"
              >
                +
              </button>
            )}
          </div>
        </div>
    </section>
  )
}
