function ContactSection({ contacts }) {
  return (
    <section id="contact" className="section contact-section">
      <p className="eyebrow">Contact</p>
      <h2>Connect with Exiles</h2>
      <div className="contact-grid">
        {contacts.map((item) => {
          const isDiscord = item.label.toLowerCase() === 'discord'
          return (
            <article key={item.label} className="contact-card">
              <h3>{item.label}</h3>
              {isDiscord ? (
                <p>
                  <a href="https://discord.gg/GcUsDxPdv8" target="_blank" rel="noopener noreferrer">
                    Join our Discord
                  </a>
                </p>
              ) : (
                <p>{item.value}</p>
              )}
            </article>
          )
        })}
      </div>
      <a href="#" className="btn btn-primary">
        Join Exiles Today
      </a>
    </section>
  )
}

export default ContactSection
