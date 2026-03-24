import { useEffect, useState } from 'react'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'teams', label: 'Teams' },
  { id: 'achivements', label: 'Achievement' },
  { id: 'contact', label: 'Contact' },
]

function Header() {
  const [activeId, setActiveId] = useState('home')

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id)
        }
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: '-20% 0px -55% 0px' }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (event, id) => {
    event.preventDefault()
    const target = document.getElementById(id)
    if (!target) return
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveId(id)
  }

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a href="#home" className="brand" onClick={(e) => handleNavClick(e, 'home')}>
          <img src="/Exiles-logo.png" alt="Exiles logo" className="brand-logo" />
          <span className="brand-name">Exiles</span>
        </a>
        <nav className="nav">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={activeId === item.id ? 'active' : ''}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
