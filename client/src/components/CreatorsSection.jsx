import { useState } from 'react'
import { creators } from '../data/siteContent'
import { playClickSound, playHoverSound, playEnterSound } from '../utils/soundEffects'

const categories = ['ALL', 'PRO ROSTER', 'STRATEGISTS', 'CONTENT CREATORS', 'ANALYSTS']

export default function CreatorsSection({ onOpenProfile }) {
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [likesMap, setLikesMap] = useState({})

  const handleLike = (e, id) => {
    e.stopPropagation()
    playClickSound('primary')
    setLikesMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleSelectCategory = (cat) => {
    playClickSound()
    setActiveCategory(cat)
  }

  const handleOpenCard = (creator) => {
    playEnterSound()
    if (onOpenProfile) onOpenProfile(creator)
  }

  const filteredCreators =
    activeCategory === 'ALL'
      ? creators
      : creators.filter((c) => c.category === activeCategory)

  return (
    <section id="creators" className="tyrant-section tyrant-creators">
      <div className="tyrant-container">
        {/* Section Header */}
        <div className="tyrant-creators__header reveal-on-scroll">
          <div className="tyrant-creators__header-left">
            <div className="tyrant-section-tag">02 / PLAYERS & TALENT</div>
            <h2 className="tyrant-creators__title">
              THE FRONTLINE
              <br />
              <span className="tyrant-text-accent">ROSTER.</span>
            </h2>
          </div>

          <div className="tyrant-creators__header-right">
            <p className="tyrant-creators__lead">
              CHAMPIONSHIP COMPETITORS. TACTICAL IGLS. BROADCAST ANALYSTS.
              <br />
              BUILT TO COMPETE UNDER STAGE PRESSURE.
            </p>
            <div className="tyrant-creators__count-highlight">
              27 SIGNED COMPETITORS & TALENT • ACTIVE ROSTER
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="tyrant-filters reveal-on-scroll">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`tyrant-filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => handleSelectCategory(cat)}
              onMouseEnter={playHoverSound}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Creator / Player Cards Grid (4 Columns) */}
        <div key={activeCategory} className="tyrant-cards-grid">
          {filteredCreators.map((creator, idx) => {
            const isLiked = !!likesMap[creator.id]
            return (
              <div
                key={creator.id}
                className="tyrant-card tyrant-card--creator tyrant-card--animated"
                style={{ '--stagger-index': idx }}
                onClick={() => handleOpenCard(creator)}
                onMouseEnter={playHoverSound}
              >
                <div className="tyrant-card__top-bar">
                  {creator.division && (
                    <span className="tyrant-card__division-badge">{creator.division}</span>
                  )}
                  <button
                    type="button"
                    className="tyrant-card__view-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleOpenCard(creator)
                    }}
                  >
                    DOSSIER
                  </button>
                </div>

                <img
                  src={creator.image}
                  alt={creator.name}
                  className="tyrant-card__img"
                  loading="lazy"
                />
                <div className="tyrant-card__gradient" />

                <div className="tyrant-card__bottom">
                  <div className="tyrant-card__info">
                    <h3 className="tyrant-card__name">{creator.name}</h3>
                    <span className="tyrant-card__role">{creator.role}</span>

                    {(creator.winRate || creator.kda) && (
                      <div className="tyrant-card__stats-row">
                        {creator.winRate && (
                          <span className="tyrant-card__stat-chip">WR: {creator.winRate}</span>
                        )}
                        {creator.kda && (
                          <span className="tyrant-card__stat-chip">{creator.kda}</span>
                        )}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    className={`tyrant-card__like-btn ${isLiked ? 'liked' : ''}`}
                    onClick={(e) => handleLike(e, creator.id)}
                    onMouseEnter={playHoverSound}
                    aria-label={`Support ${creator.name}`}
                  >
                    <span className="tyrant-card__heart">⚡</span>
                    <span className="tyrant-card__like-count">
                      {isLiked ? 'CHEERED' : creator.likes}
                    </span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
