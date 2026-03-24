import { promos } from '../../data/siteContent'

function SalePromo() {
  return (
    <section className="block promo-block">
      <div className="block-head">
        <h3>Sale & Promo</h3>
      </div>
      <div className="promo-grid">
        {promos.map((p) => (
          <article key={p.title} className="promo-card">
            <div className="thumb" />
            <div className="promo-info">
              <p className="promo-title">{p.title}</p>
              <span className="discount">{p.discount}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default SalePromo
