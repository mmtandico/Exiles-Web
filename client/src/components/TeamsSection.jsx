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
        <div className="apex-games-top-bar reveal-on-scroll">
          <div className="apex-section-header__left">
            <h2 className="apex-section-header__title">COMPETITIVE GAMES</h2>
            <span className="apex-section-header__red-bar" />
            <span className="apex-section-header__sub">10 ACTIVE DIVISIONS</span>
          </div>

          {/* Compact Red-Themed Category Filters */}
          <div className="apex-compact-filters">
            {gameCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`apex-compact-filter-btn ${activeCategory === cat ? 'active' : ''}`}
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
        </div>

        {/* Compact 5-Column Red-Themed Competitive Games Grid */}
        <div key={activeCategory} className="apex-compact-games-grid">
          {filteredGames.map((team, index) => (
            <div
              key={team.id || team.name}
              className="apex-compact-game-card tyrant-card--animated"
              style={{ '--stagger-index': index }}
              onClick={() => playClickSound()}
              onMouseEnter={playHoverSound}
            >
              <div className="apex-compact-game-card__top">
                <span className="apex-compact-game-card__icon-box">
                  <GameSvgIcon gameId={team.id} className="apex-svg-icon apex-svg-icon--sm" />
                </span>
                <span className="apex-compact-game-card__code">{team.code}</span>
              </div>

              <h3 className="apex-compact-game-card__name">{team.name}</h3>
              <span className="apex-compact-game-card__genre">{team.game}</span>

              <div className="apex-compact-game-card__footer">
                <span className="apex-compact-game-card__rank">
                  <span className="apex-compact-game-card__dot" />
                  {team.rank}
                </span>
                <span className="apex-compact-game-card__stat">{team.winRate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
