export default function TeamsSection({ teams = [] }) {
  return (
    <section id="teams" className="tyrant-section tyrant-teams">
      <div className="tyrant-container">
        <div className="tyrant-creators__header">
          <div className="tyrant-creators__header-left">
            <div className="tyrant-section-tag">03 / COMPETITIVE DIVISIONS</div>
            <h2 className="tyrant-creators__title">
              UNSTOPPABLE
              <br />
              LINEUPS.
            </h2>
          </div>

          <div className="tyrant-creators__header-right">
            <p className="tyrant-creators__lead">
              CHAMPIONS IN THE SERVER. LEADERS ON STAGE.
              <br />
              COMPETING AT THE HIGHEST REGIONAL TIERS.
            </p>
            <div className="tyrant-creators__count-highlight">
              3 ACTIVE DIVISIONS • 2025/2026 ROSTERS
            </div>
          </div>
        </div>

        <div className="tyrant-teams__grid">
          {teams.map((team, index) => (
            <div key={team.name} className="tyrant-team-card">
              <div className="tyrant-team-card__badge">ROSTER {String(index + 1).padStart(2, '0')}</div>
              <h3 className="tyrant-team-card__name">{team.name}</h3>
              <p className="tyrant-team-card__focus">{team.focus}</p>
              <div className="tyrant-team-card__meta">
                <span className="tyrant-team-card__status-dot" />
                <span>{team.members}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
