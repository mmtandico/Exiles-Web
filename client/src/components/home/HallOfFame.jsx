import { hallOfFame } from '../../data/siteContent'

function HallOfFame() {
  return (
    <section className="panel hof-panel">
      <div className="panel-head">
        <h4>Hall of Fame</h4>
        <a href="#" className="see-all">Latest</a>
      </div>
      <ol className="hof-list">
        {hallOfFame.map((g, i) => (
          <li key={g.title}>
            <span className="rank">{i + 1}</span>
            <p>{g.title}</p>
            <span className="score">{g.score}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default HallOfFame
