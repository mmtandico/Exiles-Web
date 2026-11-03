import { useState } from 'react'
import { insideShowcase } from '../data/siteContent'
import { playClickSound, playHoverSound } from '../utils/soundEffects'

const newsDates = ['NOV 03, 2026', 'OCT 28, 2026', 'OCT 19, 2026', 'OCT 05, 2026', 'SEP 24, 2026']

export default function InsideSection({ onSelectCard }) {
  const [showAll, setShowAll] = useState(false)
  const visibleNews = showAll ? insideShowcase : insideShowcase.slice(0, 4)

  return (
    <section id="inside" className="apex-news-section">
      <div className="tyrant-container">
        {/* Apex-Style "LATEST NEWS —" Header */}
        <div className="apex-section-header reveal-on-scroll">
          <div className="apex-section-header__left">
            <h2 className="apex-section-header__title">LATEST NEWS</h2>
            <span className="apex-section-header__red-bar" />
          </div>

          <div className="apex-section-header__right">
            <button
              type="button"
              className="apex-view-all-link"
              onClick={() => {
                playClickSound()
                setShowAll((prev) => !prev)
              }}
              onMouseEnter={playHoverSound}
            >
              {showAll ? 'SHOW TOP 4 NEWS' : 'VIEW ALL NEWS'} <span>→</span>
            </button>
          </div>
        </div>

        {/* 4-Column News Cards Grid Matching Reference Image */}
        <div className="apex-news-grid reveal-on-scroll">
          {visibleNews.map((item, idx) => (
            <article
              key={item.id}
              className="apex-news-card"
              style={{ '--stagger-index': idx }}
              onClick={() => {
                playClickSound('primary')
                if (onSelectCard) onSelectCard(item)
              }}
              onMouseEnter={playHoverSound}
            >
              <div className="apex-news-card__thumb">
                <img
                  src={item.image}
                  alt={item.title}
                  className="apex-news-card__img"
                  loading="lazy"
                />
                <div className="apex-news-card__overlay">
                  <span className="apex-news-card__badge">{item.tag || 'EXILES NEWS'}</span>
                </div>
              </div>

              <div className="apex-news-card__body">
                <h3 className="apex-news-card__title">{item.title}</h3>
                <p className="apex-news-card__desc">{item.caption}</p>
                <span className="apex-news-card__date">{newsDates[idx] || 'SEASON 2026'}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
