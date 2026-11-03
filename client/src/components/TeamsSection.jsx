import { useState } from 'react'
import { playClickSound, playHoverSound } from '../utils/soundEffects'
import { GameSvgIcon } from './Icons'

const gameCategories = ['ALL GAMES', 'FPS & SHOOTER', 'MOBA', 'BATTLE ROYALE', 'SANDBOX & STEAM']

export default function TeamsSection({ teams = [] }) {
  const [activeCategory, setActiveCategory] = useState('ALL GAMES')

  const filteredGames =
    activeCategory === 'ALL GAMES'
      ? teams
      : teams.filter((team) => team.category === activeCategory)

  return (
      <section id="teams" className="apex-games-section">
        <div className="tyrant-container">
              <div className="apex-section-header reveal-on-scroll">
                <div className="apex-section-header__left">
                  <h2 className="apex-section-header__title">COMPETITIVE GAMES</h2>
                  <span className="apex-section-header__red-bar" />
                  <span className="apex-section-header__sub">10 ACTIVE DIVISIONS</span>
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
                      '--game-accent': team.accent || '#dc2626',
                    }}
                    onClick={() => playClickSound()}
                    onMouseEnter={playHoverSound}
                  >
                    <div className="tyrant-team-card__glow-bar" />

                    <div className="tyrant-team-card__header">
                      <span className="tyrant-team-card__badge">
                        <GameSvgIcon gameId={team.id} className="apex-svg-icon apex-svg-icon--xs" />
                        <span>{team.code || `DIV-0${index + 1}`} // {team.game || 'PRO CIRCUIT'}</span>
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
