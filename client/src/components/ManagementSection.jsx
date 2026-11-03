import { useState } from 'react'
import { management } from '../data/siteContent'

const departments = ['ALL', 'EXECUTIVES', 'OPERATIONS', 'CREATIVES']

export default function ManagementSection({ onOpenProfile }) {
  const [activeDept, setActiveDept] = useState('ALL')

  const filteredStaff =
    activeDept === 'ALL'
      ? management
      : management.filter((m) => m.department === activeDept)

  return (
    <section id="management" className="tyrant-section tyrant-management">
      <div className="tyrant-container">
        {/* Section Header */}
        <div className="tyrant-creators__header">
          <div className="tyrant-creators__header-left">
            <div className="tyrant-section-tag">02 / THE PEOPLE</div>
            <h2 className="tyrant-creators__title">
              BEHIND
              <br />
              EXILES.
            </h2>
          </div>

          <div className="tyrant-creators__header-right">
            <p className="tyrant-creators__lead">
              The people behind the ideas, decisions, and
              <br />
              work that keep Exiles moving.
            </p>
            <div className="tyrant-creators__count-highlight">
              EXECUTIVES / OPERATIONS / CREATIVES
            </div>
          </div>
        </div>

        {/* Department Filters */}
        <div className="tyrant-filters">
          {departments.map((dept) => (
            <button
              key={dept}
              type="button"
              className={`tyrant-filter-btn ${activeDept === dept ? 'active' : ''}`}
              onClick={() => setActiveDept(dept)}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Staff Cards Grid (4 Columns) */}
        <div className="tyrant-cards-grid">
          {filteredStaff.map((person) => (
            <div
              key={person.id}
              className="tyrant-card tyrant-card--staff"
              onClick={() => onOpenProfile && onOpenProfile(person)}
            >
              <div className="tyrant-card__top">
                <button
                  type="button"
                  className="tyrant-card__view-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (onOpenProfile) onOpenProfile(person)
                  }}
                >
                  VIEW PROFILE
                </button>
              </div>

              <img
                src={person.image}
                alt={person.name}
                className="tyrant-card__img"
                loading="lazy"
              />
              <div className="tyrant-card__gradient" />

              <div className="tyrant-card__bottom">
                <div className="tyrant-card__info">
                  <h3 className="tyrant-card__name">{person.name}</h3>
                  <span className="tyrant-card__role">{person.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
