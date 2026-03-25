import { Link } from 'react-router-dom'
import Header from '../components/Header'

function SignupPage() {
  return (
    <main className="auth-page page">
      <Header />

      <div className="auth-content">
        <section className="auth-form-full">
          <header className="auth-form-header">
            <h1>Create Account</h1>
            <p className="auth-subtitle">Sign up to join Exiles</p>
          </header>

          <form className="auth-card" onSubmit={(e) => e.preventDefault()}>
            <label className="field">
              <span className="field-label">Username / IGN</span>
              <input className="field-input" type="text" required />
            </label>

            <label className="field">
              <span className="field-label">Email</span>
              <input className="field-input" type="email" required />
            </label>

            <label className="field">
              <span className="field-label">Password</span>
              <input className="field-input" type="password" required />
            </label>

            <button className="btn btn-primary auth-submit" type="submit">
              Create Account
            </button>

            <p className="auth-switch">
              Already have an account? <Link to="/login">Back to login</Link>
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

export default SignupPage
