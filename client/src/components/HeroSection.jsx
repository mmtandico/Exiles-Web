import { useEffect, useState } from 'react'
import { orgStats } from '../data/siteContent'
import { playClickSound, playHoverSound } from '../utils/soundEffects'

const backgrounds = [
  '/bg/Exiles-bg1.png',
  '/bg/Exiles-bg2.png',
  '/bg/Exiles-bg3.png',
  '/bg/Exiles-bg4.png',
]

export default function HeroSection({ onMeetCreators, onExploreTeams }) {
  const [bgIndex, setBgIndex] = useState(0)

  useEffect(() => {
    if (!backgrounds.length) return
    const id = setInterval(() => {
      setBgIndex((i) => (i + 1) % backgrounds.length)
    }, 6000)
    return () => clearInterval(id)
  }, [])

  const handleScrollToCreators = () => {
    playClickSound('primary')
    if (onMeetCreators) {
      onMeetCreators()
      return
    }
    const el = document.getElementById('creators')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleScrollToTeams = () => {
    playClickSound('primary')
    if (onExploreTeams) {
      onExploreTeams()
      return
    }
    const el = document.getElementById('teams')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="hero" className="tyrant-hero">
      {/* Previous Exiles Rotating Background Banner with Smooth Crossfade & Ken Burns Zoom */}
      <div className="tyrant-hero__banner-container">
        {backgrounds.map((bg, idx) => (
          <div
            key={bg}
            className={`tyrant-hero__bg-slide ${idx === bgIndex ? 'is-active' : ''}`}
            style={{ backgroundImage: `url('${bg}')` }}
          />
        ))}
        <div className="tyrant-hero__cyber-grid" />
        <div className="tyrant-hero__banner-overlay" />

        {/* Tactical HUD Slide Switcher */}
        <div className="tyrant-hero__hud-bar tyrant-container">
          <div className="tyrant-hero__hud-tag">
            <span className="tyrant-hero__live-dot" />
            <span>EXILES COMPETITIVE HQ // MANILA, PH</span>
          </div>
          <div className="tyrant-hero__slide-indicators">
            {backgrounds.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`tyrant-hero__slide-dot ${idx === bgIndex ? 'active' : ''}`}
                onClick={() => {
                  playClickSound()
                  setBgIndex(idx)
                }}
                onMouseEnter={playHoverSound}
                aria-label={`Select Hero Background ${idx + 1}`}
              >
                0{idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Headline & Statement Section */}
      <div className="tyrant-hero__statement">
        <div className="tyrant-container">
          <div className="tyrant-hero__statement-grid reveal-on-scroll">
            {/* Left Column */}
            <div className="tyrant-hero__statement-left">
              <div className="tyrant-hero__eyebrow">
                <span className="tyrant-hero__bullet" />
                <span>TIER-1 COMPETITIVE ESPORTS ORGANIZATION</span>
              </div>
              <h1 className="tyrant-hero__title">
                BUILT TO DOMINATE.
                <br />
                <span className="tyrant-text-accent">WE RISE ABOVE.</span>
              </h1>
            </div>

            {/* Right Column */}
            <div className="tyrant-hero__statement-right">
              <p className="tyrant-hero__desc">
                A championship-driven Philippine esports organization fielding premier
                rosters across tactical shooters and competitive leagues. Relentless preparation.
                Unmatched stage execution.
              </p>
              <div className="tyrant-hero__actions">
                <button
                  type="button"
                  className="tyrant-btn tyrant-btn--primary"
                  onClick={handleScrollToTeams}
                  onMouseEnter={playHoverSound}
                >
                  VIEW PRO ROSTERS
                </button>
                <button
                  type="button"
                  className="tyrant-btn tyrant-btn--outline"
                  onClick={handleScrollToCreators}
                  onMouseEnter={playHoverSound}
                >
                  MEET THE PLAYERS
                </button>
              </div>
            </div>
          </div>

          {/* Competitive Org Telemetry Stats Strip */}
          <div className="tyrant-hero__stats-strip reveal-on-scroll">
            {orgStats.map((stat, idx) => (
              <div
                key={stat.label}
                className="tyrant-hero__stat-item"
                style={{ '--stagger-index': idx }}
              >
                <span className="tyrant-hero__stat-value">{stat.value}</span>
                <span className="tyrant-hero__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
