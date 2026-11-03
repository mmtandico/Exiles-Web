import { useState, useEffect } from 'react'
import { navLinks } from '../data/siteContent'
import { playClickSound, playHoverSound } from '../utils/soundEffects'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

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
    <header className={`tyrant-header ${scrolled ? 'tyrant-header--scrolled' : ''}`}>
      <div className="tyrant-header__inner">
        <div className="tyrant-header__brand-wrap">
          <a
            href="#hero"
            className="tyrant-header__logo"
            onClick={(e) => handleNavClick(e, 'hero')}
            onMouseEnter={playHoverSound}
          >
            <img src="/Exiles-logo.png" alt="Exiles Logo" className="tyrant-header__logo-img" />
            <span>EXILES</span>
          </a>
          <span className="tyrant-header__status-pill">
            <span className="tyrant-header__status-dot" />
            2026 PRO SEASON
          </span>
        </div>

        <nav className="tyrant-header__nav" aria-label="Main Navigation">
          {navLinks.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              onMouseEnter={playHoverSound}
              className={`tyrant-header__link ${activeSection === item.id ? 'active' : ''}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="https://discord.gg/GcUsDxPdv8"
          target="_blank"
          rel="noreferrer"
          className="tyrant-btn tyrant-btn--header"
          onClick={() => playClickSound('primary')}
          onMouseEnter={playHoverSound}
        >
          JOIN ORG DISCORD
        </a>
      </div>
    </header>
  )
}
