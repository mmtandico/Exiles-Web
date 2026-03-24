import { gallery } from '../../data/siteContent'

function GalleryGrid() {
  return (
    <section className="block gallery-block">
      <div className="block-head">
        <h3>Images About This Game</h3>
        <a href="#" className="see-all">See all</a>
      </div>
      <div className="gallery-grid">
        {gallery.map((g, i) => (
          <div key={i} className="gal-tile">
            <div className="thumb" />
          </div>
        ))}
      </div>
    </section>
  )
}

export default GalleryGrid
