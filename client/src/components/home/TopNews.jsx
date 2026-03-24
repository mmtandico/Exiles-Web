import { topNews } from '../../data/siteContent'

function TopNews() {
  return (
    <section className="block news-block">
      <div className="block-head">
        <h3>Top News</h3>
      </div>
      <div className="news-list">
        {topNews.map((n) => (
          <article key={n.title} className="news-item">
            <div className="thumb" />
            <div className="news-body">
              <p className="news-meta">{n.tag} • {n.date}</p>
              <h4>{n.title}</h4>
              <p className="news-text">{n.snippet}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default TopNews
