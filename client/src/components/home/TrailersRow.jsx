import { teams } from '../../data/siteContent'

function TrailersRow() {
  return (
    <section className="block trailers-block">
      <div className="block-head">
        <h3>Team Information</h3>
        <a href="#teams" className="see-all">View teams</a>
      </div>
      <div className="tray">
        {teams.map((team) => (
          <article key={team.name} className="tray-card">
            <div className="thumb" />
            <div className="tray-info">
              <span className="play">■</span>
              <p>{team.name}</p>
            </div>
            <p className="tray-subtext">{team.focus}</p>
            <p className="tray-meta">{team.members}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default TrailersRow
