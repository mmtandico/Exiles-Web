import { useState } from 'react'
import { creators } from '../data/siteContent'

const categories = ['ALL', 'STREAMERS', 'ESPORTS', 'LIFESTYLE', 'VARIETY']

export default function CreatorsSection({ onOpenProfile }) {
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [likesMap, setLikesMap] = useState({})

  const handleLike = (e, id) => {
    e.stopPropagation()
    setLikesMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const filteredCreators =
    activeCategory === 'ALL'
      ? creators
      : creators.filter((c) => c.category === activeCategory)

  return (
    <section id="creators" className="tyrant-section tyrant-creators">
      <div className="tyrant-container">
        {/* Section Header */}
        <div className="tyrant-creators__header">
          <div className="tyrant-creators__header-left">
            <div className="tyrant-section-tag">01 / THE CREATORS</div>
            <h2 className="tyrant-creators__title">
              OWN THE
              <br />
              SPOTLIGHT
            </h2>
          </div>

          <div className="tyrant-creators__header-right">
            <p className="tyrant-creators__lead">
              DIFFERENT PERSONALITIES. DIFFERENT PLATFORMS.
              <br />
              ONE COLLECTIVE PUSHING CULTURE FORWARD.
            </p>
            <div className="tyrant-creators__count-highlight">
              27 CREATORS. ONE EXILES.
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="tyrant-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`tyrant-filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Creator Cards Grid (4 Columns) */}
        <div className="tyrant-cards-grid">
          {filteredCreators.map((creator) => {
            const isLiked = !!likesMap[creator.id]
            return (
              <div
                key={creator.id}
                className="tyrant-card tyrant-card--creator"
                onClick={() => onOpenProfile && onOpenProfile(creator)}
              >
                <div className="tyrant-card__top">
                  <button
                    type="button"
                    className="tyrant-card__view-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      if (onOpenProfile) onOpenProfile(creator)
                    }}
                  >
                    VIEW PROFILE
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
                  </div>

                  <button
                    type="button"
                    className={`tyrant-card__like-btn ${isLiked ? 'liked' : ''}`}
                    onClick={(e) => handleLike(e, creator.id)}
                    aria-label={`Like ${creator.name}`}
                  >
                    <span className="tyrant-card__heart">❤️</span>
                    <span className="tyrant-card__like-count">
                      {isLiked ? 'LIKED' : creator.likes}
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
