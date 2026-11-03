import { useEffect, useState } from 'react'

const backgrounds = [
  '/bg/Exiles-bg1.png',
  '/bg/Exiles-bg2.png',
  '/bg/Exiles-bg3.png',
  '/bg/Exiles-bg4.png',
]

export default function HeroSection({ onMeetCreators }) {
  const [bgIndex, setBgIndex] = useState(0)

  useEffect(() => {
    if (!backgrounds.length) return
    const id = setInterval(() => {
      setBgIndex((i) => (i + 1) % backgrounds.length)
    }, 6000)
    return () => clearInterval(id)
  }, [])

  const currentBg = backgrounds[bgIndex]

  const handleScrollToCreators = () => {
    if (onMeetCreators) {
      onMeetCreators()
      return
    }
    const el = document.getElementById('creators')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="hero" className="tyrant-hero">
      {/* Previous Exiles Rotating Background Banner */}
      <div className="tyrant-hero__banner-container">
        {currentBg && (
          <div
            className="tyrant-hero__bg"
            style={{ backgroundImage: `url('${currentBg}')` }}
          />
        )}
        <div className="tyrant-hero__banner-overlay" />
      </div>

      {/* Hero Headline & Statement Section */}
      <div className="tyrant-hero__statement">
        <div className="tyrant-container tyrant-hero__statement-grid">
          {/* Left Column */}
          <div className="tyrant-hero__statement-left">
            <div className="tyrant-hero__eyebrow">
              <span className="tyrant-hero__bullet" />
              <span>A CULTURE OF OUR OWN</span>
            </div>
            <h1 className="tyrant-hero__title">
              WE RISE ABOVE
              <br />
              THE REST.
            </h1>
          </div>

          {/* Right Column */}
          <div className="tyrant-hero__statement-right">
            <p className="tyrant-hero__desc">
              A Philippine esports and entertainment organization.
              Creators. Competitors. One collective.
            </p>
            <button
              type="button"
              className="tyrant-btn tyrant-btn--primary"
              onClick={handleScrollToCreators}
            >
              MEET THE CREATORS
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
