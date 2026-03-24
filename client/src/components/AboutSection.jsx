function AboutSection() {
  return (
    <section id="about" className="section content-section">
      <p className="eyebrow">About Us</p>
      <h2>Built for Minecraft competition and community.</h2>
      <p className="lead">
        Exiles is a PH-based gaming community focused on building skilled and
        respectful teams for tournaments, scrims, and public events.
      </p>
      <div className="stats-grid">
        <article className="stat-card">
          <h3>3+</h3>
          <p>Active Team Divisions</p>
        </article>
        <article className="stat-card">
          <h3>50+</h3>
          <p>Monthly Event Participants</p>
        </article>
        <article className="stat-card">
          <h3>24/7</h3>
          <p>Community Server Activity</p>
        </article>
      </div>
    </section>
  )
}

export default AboutSection
