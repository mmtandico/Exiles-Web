export default function Footer() {
  const year = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer id="socials" className="tyrant-footer">
      <div className="tyrant-container tyrant-footer__inner">
        <div className="tyrant-footer__top">
          <div className="tyrant-footer__brand-block">
            <h2 className="tyrant-footer__logo">EXILES</h2>
            <p className="tyrant-footer__slogan">WE RISE ABOVE THE REST.</p>
            <p className="tyrant-footer__desc">
              A Philippine esports and entertainment organization built on competitive ambition,
              creative expression, and a distinct identity.
            </p>
          </div>

          <div className="tyrant-footer__links-group">
            <div className="tyrant-footer__col">
              <span className="tyrant-footer__col-title">NAVIGATION</span>
              <a href="#hero">HOME</a>
              <a href="#about">ABOUT US</a>
              <a href="#inside">INSIDE EXILES</a>
              <a href="#creators">CREATORS</a>
              <a href="#management">MANAGEMENT</a>
              <a href="#teams">TEAMS</a>
            </div>

            <div className="tyrant-footer__col">
              <span className="tyrant-footer__col-title">COMMUNITY</span>
              <a href="https://discord.gg/GcUsDxPdv8" target="_blank" rel="noreferrer">DISCORD</a>
              <a href="#" target="_blank" rel="noreferrer">YOUTUBE</a>
              <a href="#" target="_blank" rel="noreferrer">TIKTOK</a>
              <a href="#" target="_blank" rel="noreferrer">TWITTER / X</a>
              <a href="#" target="_blank" rel="noreferrer">INSTAGRAM</a>
            </div>

            <div className="tyrant-footer__col">
              <span className="tyrant-footer__col-title">LEGAL</span>
              <a href="#">PRIVACY POLICY</a>
              <a href="#">TERMS OF SERVICE</a>
              <a href="#">BRAND ASSETS</a>
              <a href="#">PRESS INQUIRIES</a>
            </div>
          </div>
        </div>

        <div className="tyrant-footer__bottom">
          <p className="tyrant-footer__copy">
            © {year} EXILES ENTERTAINMENT & ESPORTS GROUP. ALL RIGHTS RESERVED.
          </p>

          <button
            type="button"
            className="tyrant-footer__back-to-top"
            onClick={scrollToTop}
          >
            BACK TO TOP ↑
          </button>
        </div>
      </div>
    </footer>
  )
}
