import { useState, useRef } from 'react'
import { insideShowcase } from '../data/siteContent'

export default function InsideSection({ onSelectCard }) {
  const [activeIndex, setActiveIndex] = useState(1) // Default to 2nd card (02) as shown in reference
  const sliderRef = useRef(null)

  const activeItem = insideShowcase[activeIndex] || insideShowcase[0]

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : insideShowcase.length - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev < insideShowcase.length - 1 ? prev + 1 : 0))
  }

  return (
    <section id="inside" className="tyrant-section tyrant-inside">
      <div className="tyrant-container">
        {/* Section Top Meta */}
        <div className="tyrant-inside__meta-header">
          <span className="tyrant-section-tag">INSIDE EXILES</span>
          <span className="tyrant-inside__counter">
            {String(activeIndex + 1).padStart(2, '0')} / {String(insideShowcase.length).padStart(2, '0')}
          </span>
        </div>

        {/* Carousel / Cards Track */}
        <div className="tyrant-inside__carousel" ref={sliderRef}>
          <div className="tyrant-inside__track">
            {insideShowcase.map((item, idx) => {
              const isActive = idx === activeIndex
              return (
                <div
                  key={item.id}
                  className={`tyrant-inside__card ${isActive ? 'tyrant-inside__card--active' : ''}`}
                  onClick={() => {
                    setActiveIndex(idx)
                    if (onSelectCard) onSelectCard(item)
                  }}
                >
                  <div className="tyrant-inside__card-num">{item.id}</div>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="tyrant-inside__card-img"
                    loading="lazy"
                  />
                  <div className="tyrant-inside__card-gradient" />
                  <div className="tyrant-inside__card-content">
                    <h3 className="tyrant-inside__card-title">{item.title}</h3>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom Progress Bar & Details */}
        <div className="tyrant-inside__bottom">
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
              <span className="tyrant-inside__hint">Drag to browse • Double-click to view</span>
              <div className="tyrant-inside__arrows">
                <button
                  type="button"
                  className="tyrant-inside__arrow-btn"
                  onClick={handlePrev}
                  aria-label="Previous Showcase"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="tyrant-inside__arrow-btn"
                  onClick={handleNext}
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
