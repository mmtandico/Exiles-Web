import { useEffect, useState } from 'react'

const AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL || 'http://localhost:3000'

function ProfilePage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${AUTH_BASE_URL}/auth/profile`, {
          credentials: 'include',
        })
        if (!res.ok) {
          const body = await res.json().catch(() => ({}))
          throw new Error(body?.message || 'Failed to load profile')
        }
        const body = await res.json()
        setUser(body.user)
        setError(null)
      } catch (e) {
        setError(e.message)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [])

  return (
    <main className="auth-page page">
      <div className="auth-content">
        <section className="auth-form-full">
          <header className="auth-form-header">
            <h1>Your Profile</h1>
            <p className="auth-subtitle">Google OAuth session details</p>
          </header>

          {loading && <p className="muted">Loading...</p>}
          {error && (
            <div className="auth-card" style={{ padding: '1.25rem' }}>
              <p className="auth-subtitle" style={{ marginBottom: '0.5rem' }}>
                {error}
              </p>
              <p className="muted" style={{ margin: 0 }}>
                Please log in again.
              </p>
            </div>
          )}

          {user && (
            <div className="auth-card" style={{ padding: '1.25rem' }}>
              <p className="auth-subtitle" style={{ marginBottom: '0.75rem' }}>
                {user.name || 'User'}
              </p>
              <div className="field" style={{ gap: '0.35rem' }}>
                <span className="field-label">Email</span>
                <span>{user.email || '—'}</span>
              </div>
              <div className="field" style={{ gap: '0.35rem', marginTop: '0.75rem' }}>
                <span className="field-label">Google ID</span>
                <span>{user.googleId || '—'}</span>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default ProfilePage

