import { useEffect, useState } from 'react'

function HeroSection() {
  const backgrounds = [
    '/bg/Exiles-bg1.png',
    '/bg/Exiles-bg2.png',
    '/bg/Exiles-bg3.png',
    '/bg/Exiles-bg4.png',
  ]
  const [bgIndex, setBgIndex] = useState(0)

  useEffect(() => {
    if (!backgrounds.length) return
    const id = setInterval(() => {
      setBgIndex((i) => (i + 1) % backgrounds.length)
    }, 6000)
    return () => clearInterval(id)
  }, [backgrounds])

  const currentBg = backgrounds[bgIndex]

  return (
    <section id="home" className="hero-section section">
      {currentBg && <div className="hero-bg" style={{ backgroundImage: `url('${currentBg}')` }} />}
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="eyebrow">Minecraft Community Team</p>
        <h1>Exiles: Rise Together.</h1>
        <p className="hero-text">
          We are a competitive and community-focused Minecraft organization built
          for events, content, and long-term teamwork.
        </p>
        <div className="hero-actions">
          <a href="#teams" className="btn btn-primary">
            Explore Teams
          </a>
          <a href="https://discord.gg/GcUsDxPdv8" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            Join Community
          </a>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
