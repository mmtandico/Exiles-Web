function RatingPanel() {
  return (
    <section className="panel rating-panel">
      <h4>Average User Rating</h4>
      <div className="rating-score">9</div>
      <a href="#" className="btn btn-secondary btn-small">Write a review</a>
      <div className="stars">
        <span>★★★★★</span>
      </div>
      <ul className="rating-breakdown">
        <li>Gameplay <span>★★★★★</span></li>
        <li>Graphics <span>★★★★☆</span></li>
        <li>Replay <span>★★★★★</span></li>
      </ul>
    </section>
  )
}

export default RatingPanel
