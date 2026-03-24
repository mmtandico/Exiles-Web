import { useEffect, useMemo, useState } from 'react'

function HeroSection() {
  // Attempt to auto-discover background images in /bg directory by probing common names
  const candidateNames = useMemo(
    () =>
      [
        'Exiles-bg1.png','Exiles-bg2.png','Exiles-bg3.png','Exiles-bg4.png',
        '1.jpg','2.jpg','3.jpg','4.jpg','5.jpg',
        '1.png','2.png','3.png','4.png','5.png',
        '1.webp','2.webp','3.webp','4.webp','5.webp',
      ].map((n) => `/bg/${n}`),
    []
  )

  const [backgrounds, setBackgrounds] = useState([])
  const [bgIndex, setBgIndex] = useState(0)

  useEffect(() => {
    let isMounted = true
    // Load candidates and keep those that exist
    Promise.all(
      candidateNames.map(
        (src) =>
          new Promise((resolve) => {
            const img = new Image()
            img.onload = () => resolve(src)
            img.onerror = () => resolve(null)
            img.src = src
          })
      )
    ).then((results) => {
      if (!isMounted) return
      const found = results.filter(Boolean)
      setBackgrounds(found)
    })
    return () => {
      isMounted = false
    }
  }, [candidateNames])

  useEffect(() => {
    if (!backgrounds.length) return
    const id = setInterval(() => {
      setBgIndex((i) => (i + 1) % backgrounds.length)
    }, 6000)
    return () => clearInterval(id)
  }, [backgrounds])

  const currentBg = backgrounds.length ? backgrounds[bgIndex] : null

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
          <a href="#contact" className="btn btn-secondary">
            Join Community
          </a>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
