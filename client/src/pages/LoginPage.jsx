import { Link } from 'react-router-dom'
import Header from '../components/Header'

const AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL || 'http://localhost:3000'

function LoginPage() {
  return (
    <main className="auth-page page">
      <Header />

      <div className="auth-content">
        <section className="auth-form-full">
          <header className="auth-form-header">
            <h1>Welcome Back</h1>
            <p className="auth-subtitle">Log in to your Exiles account</p>
          </header>

          <form className="auth-card" onSubmit={(e) => e.preventDefault()}>
            <label className="field">
              <span className="field-label">Email</span>
              <input className="field-input" type="email" required />
            </label>

            <label className="field">
              <span className="field-label">Password</span>
              <input className="field-input" type="password" required />
            </label>

            <div className="auth-utility">
              <label className="auth-check">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="auth-link">
                Forgot password?
              </a>
            </div>

            <button className="btn btn-primary auth-submit" type="submit">
              Log In
            </button>

            <p className="auth-switch">
              New to Exiles? <Link to="/signup">Create an account</Link>
            </p>

            <div className="auth-divider">
              <span />
            <small>or continue with</small>
              <span />
            </div>

            <div className="auth-social-row">
              <button
                className="auth-social-btn auth-social-btn--google"
                type="button"
                onClick={() => {
                  window.location.href = `${AUTH_BASE_URL}/auth/google`
                }}
              >
                Continue with Google
              </button>
              <a
                className="auth-social-btn auth-social-btn--discord"
                href="https://discord.gg/GcUsDxPdv8"
                target="_blank"
                rel="noopener noreferrer"
              >
                Continue with Discord
              </a>
            </div>
          </form>
        </section>
      </div>
    </main>
  )
}

export default LoginPage
