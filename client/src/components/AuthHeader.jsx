import { Link, NavLink } from 'react-router-dom'

const navClass = ({ isActive }) => (isActive ? 'active' : '')

function AuthHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="brand">
          <img src="/Exiles-logo.png" alt="Exiles logo" className="brand-logo" />
          <span className="brand-name">Exiles</span>
        </Link>

        <nav className="nav auth-nav">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>
          <NavLink to="/login" className={navClass}>
            Login
          </NavLink>
          <NavLink to="/signup" className={navClass}>
            Sign Up
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default AuthHeader
