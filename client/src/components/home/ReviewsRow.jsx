import { reviews } from '../../data/siteContent'

function ReviewsRow() {
  return (
    <section className="block reviews-block">
      <div className="block-head">
        <h3>Exiles Team Highlights</h3>
      </div>
      <div className="reviews-tray">
        {reviews.map((r) => (
          <article key={r.title} className="review-card">
            <div className="thumb" />
            <p className="review-title">{r.title}</p>
            <span className="badge">{r.badge}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ReviewsRow
