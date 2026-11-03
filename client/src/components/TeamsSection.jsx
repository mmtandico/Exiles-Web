import { useState } from 'react'
import { playClickSound, playHoverSound } from '../utils/soundEffects'

const gameCategories = ['ALL GAMES', 'FPS & SHOOTER', 'MOBA', 'BATTLE ROYALE', 'SANDBOX & STEAM']

export default function TeamsSection({ teams = [] }) {
  const [activeCategory, setActiveCategory] = useState('ALL GAMES')

  const filteredGames =
    activeCategory === 'ALL GAMES'
      ? teams
      : teams.filter((team) => team.category === activeCategory)

  return (
    <section id="teams" className="tyrant-section tyrant-teams">
      <div className="tyrant-container">
        <div className="tyrant-creators__header reveal-on-scroll">
          <div className="tyrant-creators__header-left">
            <div className="tyrant-section-tag">04 / COMPETITIVE GAMES & DIVISIONS</div>
            <h2 className="tyrant-creators__title">
              GAMES WE
              <br />
              <span className="tyrant-text-accent">CONQUER.</span>
            </h2>
          </div>

          <div className="tyrant-creators__header-right">
            <p className="tyrant-creators__lead">
              DISCIPLINED IN SCRIMS. RELENTLESS IN TOURNAMENTS.
              <br />
              COMPETING ACROSS 10 PREMIER GAMING TITLES.
            </p>
            <div className="tyrant-creators__count-highlight">
              10 ACTIVE COMPETITIVE GAMES • PC, MOBILE & STEAM DIVISIONS
            </div>
          </div>
        </div>

        {/* Game Category Filters */}
        <div className="tyrant-filters reveal-on-scroll">
          {gameCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`tyrant-filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => {
                playClickSound()
                setActiveCategory(cat)
              }}
              onMouseEnter={playHoverSound}
            >
              {cat}
            </button>
          ))}
        </div>

        <div key={activeCategory} className="tyrant-teams__grid">
          {filteredGames.map((team, index) => (
            <div
              key={team.id || team.name}
              className="tyrant-team-card tyrant-card--animated"
              style={{
                '--stagger-index': index,
                '--game-accent': team.accent || '#ff3700',
              }}
              onClick={() => playClickSound()}
              onMouseEnter={playHoverSound}
            >
              <div className="tyrant-team-card__glow-bar" />

              <div className="tyrant-team-card__header">
                <span className="tyrant-team-card__badge">
                  {team.code || `DIV-0${index + 1}`} // {team.game || 'PRO CIRCUIT'}
                </span>
                {team.rank && <span className="tyrant-team-card__rank">{team.rank}</span>}
              </div>

              <h3 className="tyrant-team-card__name">{team.name}</h3>
              <p className="tyrant-team-card__focus">{team.focus}</p>

              {(team.winRate || team.trophies) && (
                <div className="tyrant-team-card__metrics">
                  {team.winRate && (
                    <div className="tyrant-team-card__metric">
                      <span className="tyrant-team-card__metric-label">PERFORMANCE</span>
                      <span className="tyrant-team-card__metric-val">{team.winRate}</span>
                    </div>
                  )}
                  {team.trophies && (
                    <div className="tyrant-team-card__metric">
                      <span className="tyrant-team-card__metric-label">HONORS</span>
                      <span className="tyrant-team-card__metric-val">{team.trophies}</span>
                    </div>
                  )}
                </div>
              )}

              {team.roster && (
                <div className="tyrant-team-card__roster">
                  <span className="tyrant-team-card__roster-label">ACTIVE DIVISION LEADERS & SQUAD</span>
                  <div className="tyrant-team-card__roster-tags">
                    {team.roster.map((player) => (
                      <span key={player} className="tyrant-team-card__player-tag">
                        {player}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="tyrant-team-card__meta">
                <span className="tyrant-team-card__status-dot" />
                <span>ACTIVE COMPETITIVE DIVISION • {team.members}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
