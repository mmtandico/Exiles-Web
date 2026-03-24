function ContactSection({ contacts }) {
  return (
    <section id="contact" className="section contact-section">
      <p className="eyebrow">Contact</p>
      <h2>Connect with Exiles</h2>
      <div className="contact-grid">
        {contacts.map((item) => (
          <article key={item.label} className="contact-card">
            <h3>{item.label}</h3>
            <p>{item.value}</p>
          </article>
        ))}
      </div>
      <a href="#" className="btn btn-primary">
        Join Exiles Today
      </a>
    </section>
  )
}

export default ContactSection
