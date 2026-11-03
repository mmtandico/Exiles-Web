import { useEffect, useState } from 'react'
import { teams } from '../data/siteContent'
import { playClickSound, playHoverSound } from '../utils/soundEffects'
import { PlayIcon, CrossedSwordsIcon, GameSvgIcon } from './Icons'

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

  const handleScrollToLegends = () => {
    playClickSound('primary')
    const el = document.getElementById('management')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    if (onMeetCreators) onMeetCreators()
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
    <section id="hero" className="apex-hero">
      {/* Full-Bleed Diagonal Crimson & Rotating Exiles Background Stage */}
      <div className="apex-hero__stage">
        {backgrounds.map((bg, idx) => (
          <div
            key={bg}
            className={`apex-hero__bg-slide ${idx === bgIndex ? 'is-active' : ''}`}
            style={{ backgroundImage: `url('${bg}')` }}
          />
        ))}

        {/* Diagonal Crimson Slash & Dark Vignette */}
        <div className="apex-hero__red-slash" />
        <div className="apex-hero__vignette" />

        <div className="tyrant-container apex-hero__content-wrap">
          {/* Left Hero Lockup */}
          <div className="apex-hero__left">
            <div className="apex-hero__giant-logo">
              <span className="apex-hero__giant-main">EXILES</span>
              <div className="apex-hero__giant-sub-row">
                <span className="apex-hero__line" />
                <span className="apex-hero__giant-sub">COMMUNITY</span>
                <span className="apex-hero__line" />
              </div>
            </div>

            <h1 className="apex-hero__headline">
              META CHANGES.
              <br />
              VICTORY REMAINS.
            </h1>

            <p className="apex-hero__desc">
              Drop in. Squad up. Compete across 10 premier titles and be the last
              team standing with the Team Exiles competitive organization.
            </p>

            <div className="apex-hero__cta-row">
              <button
                type="button"
                className="apex-btn apex-btn--red"
                onClick={handleScrollToTeams}
                onMouseEnter={playHoverSound}
              >
                <span>COMPETE NOW</span>
                <span className="apex-btn__arrow">›</span>
              </button>

              <button
                type="button"
                className="apex-btn apex-btn--dark"
                onClick={handleScrollToLegends}
                onMouseEnter={playHoverSound}
              >
                <span>MEET COMMAND</span>
                <PlayIcon className="apex-svg-icon apex-svg-icon--xs" />
              </button>
            </div>

            {/* Background Slide Dots */}
            <div className="apex-hero__bg-dots">
              {backgrounds.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`apex-hero__bg-dot ${idx === bgIndex ? 'active' : ''}`}
                  onClick={() => {
                    playClickSound()
                    setBgIndex(idx)
                  }}
                  onMouseEnter={playHoverSound}
                  aria-label={`Hero Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Bottom-Right Exiles Organization Callout Box */}
          <div
            className="apex-hero__season-box"
            onClick={handleScrollToTeams}
            onMouseEnter={playHoverSound}
          >
            <span className="apex-hero__season-tag">EST. 2025 • OFFICIAL CLAN</span>
            <strong className="apex-hero__season-name">TEAM EXILES</strong>
            <span className="apex-hero__season-link">10 ACTIVE GAMES ›</span>
          </div>
        </div>
      </div>

      {/* Platform / Games Strip Bar Directly Below Hero (Vector SVG Icons Only) */}
      <div className="apex-platforms-bar">
        <div className="apex-platforms-bar__tag">
          <span>ACTIVE</span>
          <CrossedSwordsIcon className="apex-svg-icon apex-svg-icon--sm" />
          <span>GAMES</span>
        </div>

        <div className="apex-platforms-bar__list">
          {teams.map((game) => (
            <button
              key={game.id}
              type="button"
              className="apex-platforms-bar__item"
              onClick={handleScrollToTeams}
              onMouseEnter={playHoverSound}
            >
              <GameSvgIcon gameId={game.id} className="apex-svg-icon apex-svg-icon--sm" />
              <span className="apex-platforms-bar__name">{game.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
