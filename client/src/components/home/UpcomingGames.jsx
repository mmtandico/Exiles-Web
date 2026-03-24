import { upcoming } from '../../data/siteContent'

function UpcomingGames() {
  return (
    <section className="panel upcoming-panel">
      <h4>Top Upcoming Games</h4>
      <div className="upcoming-list">
        {upcoming.map((u) => (
          <article key={u.title} className="upcoming-card">
            <div className="thumb" />
            <div className="upcoming-info">
              <p className="upcoming-title">{u.title}</p>
              <span className="date">{u.date}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default UpcomingGames
