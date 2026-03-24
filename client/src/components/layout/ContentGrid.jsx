function ContentGrid({ children }) {
  const main = Array.isArray(children)
    ? children.find((c) => c?.props?.['data-slot'] === 'main')
    : children
  const sidebar = Array.isArray(children)
    ? children.find((c) => c?.props?.['data-slot'] === 'sidebar')
    : null
  return (
    <section className="content-grid section">
      <div className="content-grid__inner">
        <div className="content-main">{main}</div>
        <div className="content-side">{sidebar}</div>
      </div>
    </section>
  )
}

export default ContentGrid
