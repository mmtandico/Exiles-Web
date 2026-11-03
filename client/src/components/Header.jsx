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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    const handleResize = () => {
      if (window.innerWidth > 1100) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleNavClick = (e, id) => {
    e.preventDefault()
    playClickSound('primary')
    setActiveSection(id)
    setMobileMenuOpen(false)
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

          {/* Responsive Mobile/Tablet Menu Toggle */}
          <button
            type="button"
            className="apex-header__menu-btn"
            onClick={() => {
              playClickSound()
              setMobileMenuOpen((prev) => !prev)
            }}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Responsive Mobile/Tablet Slide-Down Navigation Drawer */}
      {mobileMenuOpen && (
        <nav className="apex-mobile-drawer" aria-label="Mobile Navigation">
          <div className="apex-mobile-drawer__links">
            {apexNavLinks.map((item) => (
              <a
                key={item.key || item.label}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`apex-mobile-drawer__link ${activeSection === item.id ? 'active' : ''}`}
              >
                <span>{item.label}</span>
                <span className="apex-mobile-drawer__arrow">›</span>
              </a>
            ))}
          </div>
          <a
            href="https://discord.gg/GcUsDxPdv8"
            target="_blank"
            rel="noreferrer"
            className="apex-mobile-drawer__cta"
            onClick={() => {
              playClickSound('primary')
              setMobileMenuOpen(false)
            }}
          >
            <span>JOIN EXILES NOW</span>
            <RedirectIcon className="apex-svg-icon apex-svg-icon--sm" />
          </a>
        </nav>
      )}
    </header>
  )
}
