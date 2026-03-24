function AchievementsSection({ achievements }) {
  return (
    <section id="achivements" className="section content-section">
      <p className="eyebrow">Achivements</p>
      <h2>What we have achieved so far</h2>
      <div className="achievement-list">
        {achievements.map((item) => (
          <article key={item} className="achievement-card">
            <span className="achievement-dot" />
            <p>{item}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default AchievementsSection
