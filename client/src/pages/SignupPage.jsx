import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'

const AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL || 'http://localhost:3000'

function SignupPage() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSignupSubmit = async (event) => {
    event.preventDefault()

    try {
      setIsSubmitting(true)
      const res = await fetch(`${AUTH_BASE_URL}/auth/profile`, {
        credentials: 'include',
      })

      // If user is already authenticated, go to profile.
      if (res.ok) {
        navigate('/profile', { replace: true })
        return
      }

      // Current backend auth is OAuth-based, so continue with Google flow.
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
            <h1>Create Account</h1>
            <p className="auth-subtitle">Sign up to join Exiles</p>
          </header>

          <form className="auth-card" onSubmit={handleSignupSubmit}>
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

            <button className="btn btn-primary auth-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating account...' : 'Create Account'}
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

export default SignupPage
