import { useState, useEffect } from 'react'
import { playClickSound, playHoverSound } from '../utils/soundEffects'
import { GlobeIcon, UserIcon, RedirectIcon } from './Icons'

const apexNavLinks = [
  { id: 'about', label: 'ABOUT' },
  { id: 'management', label: 'COMMUNITY' },
  { id: 'teams', label: 'GAMES' },
  { id: 'teams', label: 'ESPORTS', key: 'esports' },
  { id: 'socials', label: 'SOCIALS' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, id) => {
    e.preventDefault()
    playClickSound('primary')
    setActiveSection(id)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header className={`apex-header ${scrolled ? 'apex-header--scrolled' : ''}`}>
      <div className="apex-header__inner">
        {/* Left Brand Block */}
        <a
          href="#hero"
          className="apex-header__brand"
          onClick={(e) => handleNavClick(e, 'hero')}
          onMouseEnter={playHoverSound}
        >
          <span className="apex-header__logo-frame">
            <img src="/Exiles-logo.png" alt="Exiles Logo" className="apex-header__logo-img" />
          </span>
          <span className="apex-header__logo-stack">
            <span className="apex-header__logo-main">EXILES</span>
            <span className="apex-header__logo-sub">— COMMUNITY —</span>
          </span>
        </a>

        {/* Center Nav Links */}
        <nav className="apex-header__nav" aria-label="Main Navigation">
          {apexNavLinks.map((item) => (
            <a
              key={item.key || item.label}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              onMouseEnter={playHoverSound}
              className={`apex-header__link ${activeSection === item.id ? 'active' : ''}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Utility & Full-Height Red CTA */}
        <div className="apex-header__right">
          <button
            type="button"
            className="apex-header__util-btn"
            onClick={() => playClickSound()}
            onMouseEnter={playHoverSound}
            title="Region: SEA / PH"
            aria-label="Select Region"
          >
            <GlobeIcon className="apex-svg-icon apex-svg-icon--sm" />
          </button>
          <a
            href="#management"
            className="apex-header__login-link"
            onClick={(e) => handleNavClick(e, 'management')}
            onMouseEnter={playHoverSound}
          >
            <UserIcon className="apex-svg-icon apex-svg-icon--sm" />
            <span>COMMUNITY</span>
          </a>
          <a
            href="https://discord.gg/GcUsDxPdv8"
            target="_blank"
            rel="noreferrer"
            className="apex-header__download-cta"
            onClick={() => playClickSound('primary')}
            onMouseEnter={playHoverSound}
          >
            <span>JOIN EXILES NOW</span>
            <RedirectIcon className="apex-svg-icon apex-svg-icon--sm" />
          </a>
        </div>
      </div>
    </header>
  )
}
