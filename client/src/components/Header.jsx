function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a href="#home" className="brand">
          <img src="/Exiles-logo.png" alt="Exiles logo" className="brand-logo" />
          <span className="brand-name">Exiles</span>
        </a>
        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#about">About Us</a>
          <a href="#teams">Teams</a>
          <a href="#achivements">Achivements</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
