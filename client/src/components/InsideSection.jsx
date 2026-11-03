import { useState, useRef } from 'react'
import { insideShowcase } from '../data/siteContent'
import { playClickSound, playHoverSound } from '../utils/soundEffects'

export default function InsideSection({ onSelectCard }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const sliderRef = useRef(null)

  const activeItem = insideShowcase[activeIndex] || insideShowcase[0]

  const scrollToIndex = (index) => {
    setActiveIndex(index)
    if (sliderRef.current) {
      const cardWidth = 480
      sliderRef.current.scrollTo({
        left: Math.max(0, index * cardWidth - 40),
        behavior: 'smooth',
      })
    }
  }

  const handlePrev = () => {
    playClickSound()
    const nextIdx = activeIndex > 0 ? activeIndex - 1 : insideShowcase.length - 1
    scrollToIndex(nextIdx)
  }

  const handleNext = () => {
    playClickSound()
    const nextIdx = activeIndex < insideShowcase.length - 1 ? activeIndex + 1 : 0
    scrollToIndex(nextIdx)
  }

  return (
    <section id="inside" className="tyrant-section tyrant-inside">
      <div className="tyrant-container">
        {/* Section Top Meta */}
        <div className="tyrant-inside__meta-header reveal-on-scroll">
          <div>
            <div className="tyrant-section-tag">01 / TOURNAMENT & LAN ARCHIVES</div>
            <h2 className="tyrant-creators__title">
              CHAMPIONSHIP
              <br />
              <span className="tyrant-text-accent">OPERATIONS.</span>
            </h2>
          </div>
          <span className="tyrant-inside__counter">
            LOG {String(activeIndex + 1).padStart(2, '0')} // {String(insideShowcase.length).padStart(2, '0')}
          </span>
        </div>

        {/* Carousel / Cards Track */}
        <div className="tyrant-inside__carousel reveal-on-scroll" ref={sliderRef}>
          <div className="tyrant-inside__track">
            {insideShowcase.map((item, idx) => {
              const isActive = idx === activeIndex
              return (
                <div
                  key={item.id}
                  className={`tyrant-inside__card ${isActive ? 'tyrant-inside__card--active' : ''}`}
                  onClick={() => {
                    playClickSound('primary')
                    scrollToIndex(idx)
                    if (onSelectCard) onSelectCard(item)
                  }}
                  onMouseEnter={playHoverSound}
                >
                  <div className="tyrant-inside__card-top">
                    <span className="tyrant-inside__card-num">{item.id}</span>
                    {item.tag && <span className="tyrant-inside__card-badge">{item.tag}</span>}
                  </div>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="tyrant-inside__card-img"
                    loading="lazy"
                  />
                  <div className="tyrant-inside__card-gradient" />
                  <div className="tyrant-inside__card-content">
                    <h3 className="tyrant-inside__card-title">{item.title}</h3>
                    {item.subtitle && (
                      <p className="tyrant-inside__card-subtitle">{item.subtitle}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom Progress Bar & Details */}
        <div className="tyrant-inside__bottom reveal-on-scroll">
          <div className="tyrant-inside__progress-track">
            <div
              className="tyrant-inside__progress-bar"
              style={{
                width: `${((activeIndex + 1) / insideShowcase.length) * 100}%`,
              }}
            />
          </div>

          <div className="tyrant-inside__footer-meta">
            <p className="tyrant-inside__caption">{activeItem.caption}</p>
            <div className="tyrant-inside__controls">
              <span className="tyrant-inside__hint">CLICK CARD OR ARROWS TO INSPECT</span>
              <div className="tyrant-inside__arrows">
                <button
                  type="button"
                  className="tyrant-inside__arrow-btn"
                  onClick={handlePrev}
                  onMouseEnter={playHoverSound}
                  aria-label="Previous Showcase"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="tyrant-inside__arrow-btn"
                  onClick={handleNext}
                  onMouseEnter={playHoverSound}
                  aria-label="Next Showcase"
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
