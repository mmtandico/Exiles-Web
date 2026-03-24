function TeamsSection({ teams }) {
  return (
    <section id="teams" className="section content-section">
      <p className="eyebrow">Teams</p>
      <h2>Current Exiles Team Lineup</h2>
      <div className="teams-grid">
        {teams.map((team) => (
          <article key={team.name} className="team-card">
            <p className="tag">{team.members}</p>
            <h3>{team.name}</h3>
            <p>{team.focus}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default TeamsSection
