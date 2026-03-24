function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="footer-brand">
          <strong>EXILES</strong>
          <span>• Minecraft community team</span>
        </p>
        <nav className="footer-nav">
          <span>© {year} Exiles. All rights reserved.</span>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Discord</a>
          <a href="#">TikTok</a>
          <a href="#">Email</a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
