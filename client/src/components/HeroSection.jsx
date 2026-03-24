function HeroSection() {
  return (
    <section id="home" className="hero-section section">
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
