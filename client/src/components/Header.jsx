import { useState, useEffect } from 'react'

const navLinks = [
  { id: 'creators', label: 'CREATORS' },
  { id: 'management', label: 'MANAGEMENT' },
  { id: 'teams', label: 'TEAMS' },
  { id: 'shop', label: 'SHOP' },
  { id: 'socials', label: 'SOCIALS' },
  { id: 'about', label: 'ABOUT US' },
]

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
    setActiveSection(id)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header className={`tyrant-header ${scrolled ? 'tyrant-header--scrolled' : ''}`}>
      <div className="tyrant-header__inner">
        <a href="#hero" className="tyrant-header__logo" onClick={(e) => handleNavClick(e, 'hero')}>
          EXILES
        </a>

        <nav className="tyrant-header__nav" aria-label="Main Navigation">
          {navLinks.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`tyrant-header__link ${activeSection === item.id ? 'active' : ''}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
