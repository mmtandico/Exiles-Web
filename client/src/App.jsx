import './App.css'

function App() {
  const schedule = [
    { stage: 'Qualifiers', day: 'Friday', time: '7:00 PM PHT' },
    { stage: 'Semifinals', day: 'Saturday', time: '8:30 PM PHT' },
    { stage: 'Grand Finals', day: 'Sunday', time: '6:00 PM PHT' },
  ]

  const players = [
    { ign: 'BlockRider', role: 'Team Captain', style: 'PVP Shot Caller' },
    { ign: 'RedStoneX', role: 'Builder', style: 'Base Architect' },
    { ign: 'CreeperOut', role: 'Support', style: 'Utility / Scout' },
    { ign: 'EnderRush', role: 'Fragger', style: 'Aggressive Entry' },
    { ign: 'BedBreaker', role: 'Objective', style: 'Clutch Specialist' },
  ]

  return (
    <main className="page">
      <section className="hero-section">
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow">Exiles Community Team</p>
          <h1>Mine. Build. Battle.</h1>
          <p className="hero-text">
            Competitive Minecraft squad for scrims, tournaments, and community
            game nights. Join us as we push for the next championship run.
          </p>
          <div className="hero-actions">
            <a href="#roster" className="btn btn-primary">
              View Roster
            </a>
            <a href="#schedule" className="btn btn-secondary">
              Match Schedule
            </a>
          </div>
        </div>
      </section>

      <section id="schedule" className="schedule-section">
        <p className="eyebrow">Spring Championship</p>
        <h2>Community Event Schedule</h2>
        <div className="schedule-grid">
          {schedule.map((match) => (
            <article key={match.stage} className="schedule-card">
              <span className="tag">{match.stage}</span>
              <h3>{match.day}</h3>
              <p>{match.time}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="roster" className="roster-section">
        <p className="eyebrow">Current Lineup</p>
        <h2>Exiles Active Roster</h2>
        <div className="roster-grid">
          {players.map((player) => (
            <article key={player.ign} className="roster-card">
              <div className="avatar">{player.ign.slice(0, 2)}</div>
              <p className="player-role">{player.role}</p>
              <h3>{player.ign}</h3>
              <p className="player-style">{player.style}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <h2>Want to join Exiles?</h2>
        <p>
          We are recruiting Minecraft players, content creators, and moderators
          for upcoming events and weekly community games.
        </p>
        <a href="#" className="btn btn-primary">
          Apply to Team
        </a>
      </section>
    </main>
  )
}

export default App
