import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'

const AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL || 'http://localhost:3000'

function LoginPage() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleLoginSubmit = async (event) => {
    event.preventDefault()

    try {
      setIsSubmitting(true)
      const res = await fetch(`${AUTH_BASE_URL}/auth/profile`, {
        credentials: 'include',
      })

      // If session already exists, go straight to profile.
      if (res.ok) {
        navigate('/profile', { replace: true })
        return
      }

      // Current backend auth is OAuth-based, so start Google login.
      const redirect = encodeURIComponent(window.location.origin)
      window.location.href = `${AUTH_BASE_URL}/auth/google?redirect=${redirect}`
    } catch {
      const redirect = encodeURIComponent(window.location.origin)
      window.location.href = `${AUTH_BASE_URL}/auth/google?redirect=${redirect}`
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="auth-page page">
      <Header />

      <div className="auth-content">
        <section className="auth-form-full">
          <header className="auth-form-header">
            <h1>Welcome Back</h1>
            <p className="auth-subtitle">Log in to your Exiles account</p>
          </header>

          <form className="auth-card" onSubmit={handleLoginSubmit}>
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

            <button className="btn btn-primary auth-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Log In'}
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
                  const redirect = encodeURIComponent(window.location.origin)
                  window.location.href = `${AUTH_BASE_URL}/auth/google?redirect=${redirect}`
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
