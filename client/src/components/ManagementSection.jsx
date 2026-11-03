import { useState } from 'react'
import { management } from '../data/siteContent'
import { playClickSound, playHoverSound, playEnterSound } from '../utils/soundEffects'
import { BoltIcon } from './Icons'

const hierarchyTiers = [
  { key: 'FOUNDER', tierNum: 'TIER 01', label: 'FOUNDER', cols: 'tier-grid--1', branchCount: 1 },
  { key: 'EXECUTIVE', tierNum: 'TIER 02', label: 'EXECUTIVE', cols: 'tier-grid--1', branchCount: 1 },
  { key: 'ADMINS', tierNum: 'TIER 03', label: 'ADMINS', cols: 'tier-grid--3', branchCount: 3 },
  { key: 'MANAGERS', tierNum: 'TIER 04', label: 'MANAGERS', cols: 'tier-grid--2', branchCount: 2 },
  { key: 'DIRECTORS', tierNum: 'TIER 05', label: 'DIRECTORS', cols: 'tier-grid--6', branchCount: 6 },
]

const filterTabs = ['ALL HIERARCHY', 'FOUNDER', 'EXECUTIVE', 'ADMINS', 'MANAGERS', 'DIRECTORS']

export default function ManagementSection({ onOpenProfile }) {
  const [activeTab, setActiveTab] = useState('ALL HIERARCHY')

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

  const visibleTiers =
    activeTab === 'ALL HIERARCHY'
      ? hierarchyTiers
      : hierarchyTiers.filter((t) => t.key === activeTab)

  return (
    <section id="management" className="apex-legends-section tyrant-management">
      <div className="tyrant-container tyrant-management__container">
        {/* Section Header */}
        <div className="apex-section-header reveal-on-scroll">
          <div className="apex-section-header__left">
            <h2 className="apex-section-header__title">TEAM EXILES COMMAND STRUCTURE</h2>
            <span className="apex-section-header__red-bar" />
            <span className="apex-section-header__sub">
              FOUNDER TO DIRECTORS HIERARCHY ({management.length} MEMBERS)
            </span>
          </div>
        </div>

        {/* Filter Bar + Random Spotlight */}
        <div className="tyrant-filters-bar reveal-on-scroll">
          <div className="apex-compact-filters">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                className={`apex-compact-filter-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => {
                  playClickSound()
                  setActiveTab(tab)
                }}
                onMouseEnter={playHoverSound}
              >
                {tab}
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

        {/* Structural Organization Hierarchy Tree: Founder -> Executive -> Admins -> Managers -> Directors */}
        <div key={activeTab} className="apex-hierarchy-tree">
          {visibleTiers.map((tier, tierIdx) => {
            const members = management.filter((m) => m.department === tier.key)
            return (
              <div key={tier.key} className="apex-hierarchy-tier">
                {/* Structural Org-Chart Tree Connector Between Tiers */}
                {tierIdx > 0 && (
                  <div className="apex-org-branch" aria-hidden="true">
                    <span className="apex-org-branch__trunk" />
                    <span className="apex-org-branch__diamond" />
                    {tier.branchCount > 1 && (
                      <div className={`apex-org-branch__bar apex-org-branch__bar--${tier.branchCount}`}>
                        {Array.from({ length: tier.branchCount }).map((_, i) => (
                          <span key={i} className="apex-org-branch__drop" />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Tier Header Badge */}
                <div className="apex-hierarchy-tier__header">
                  <span className="apex-hierarchy-tier__line" />
                  <div className="apex-hierarchy-tier__badge">
                    <span className="apex-hierarchy-tier__num">{tier.tierNum}</span>
                    <span className="apex-hierarchy-tier__sep">//</span>
                    <span className="apex-hierarchy-tier__title">{tier.label}</span>
                    <span className="apex-hierarchy-tier__count">({members.length})</span>
                  </div>
                  <span className="apex-hierarchy-tier__line" />
                </div>

                {/* Structural Cards Row for This Tier */}
                <div className={`apex-hierarchy-grid ${tier.cols}`}>
                  {members.map((person, idx) => (
                    <div
                      key={person.id}
                      className={`apex-profile-card apex-profile-card--${tier.key.toLowerCase()} tyrant-card--animated`}
                      style={{ '--stagger-index': idx }}
                      onClick={() => handleOpenStaff(person)}
                      onMouseEnter={playHoverSound}
                    >
                      <span className="apex-profile-card__node-pin" aria-hidden="true" />

                      {/* Top Rank Tag Inside Profile */}
                      <div className="apex-profile-card__top">
                        <span className="apex-profile-card__rank-code">
                          {person.rankCode || tier.key}
                        </span>
                        <span className="apex-profile-card__dept-pill">{tier.label}</span>
                      </div>

                      {/* Front-View Unique Minecraft Character Inside Profile */}
                      <div className="apex-profile-card__portrait">
                        <div className="apex-profile-card__red-slash" />
                        <img
                          src={person.image}
                          alt={person.name}
                          className="apex-profile-card__avatar"
                        />
                      </div>

                      {/* Bottom Name & Role Bar Inside Profile */}
                      <div className="apex-profile-card__footer">
                        <div className="apex-profile-card__name-row">
                          <h3 className="apex-profile-card__name">{person.name}</h3>
                          <span className="apex-profile-card__chevron">›</span>
                        </div>
                        <span className="apex-profile-card__role">{person.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
