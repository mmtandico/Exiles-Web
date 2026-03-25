import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL || 'http://localhost:3000'

function ProfilePage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const [loggingOut, setLoggingOut] = useState(false)

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

  const displayName = user?.name || 'User'
  const initial = displayName.trim().slice(0, 1).toUpperCase()

  // TODO: Replace these placeholders with real data from the backend.
  const stats = [
    { value: '158', label: 'GAMES PLAYED', color: '#3b82f6', icon: 'G' },
    { value: '12', label: 'GAME WINS', color: '#22c55e', icon: 'W' },
    { value: '58%', label: 'GAME WIN RATE', color: '#fbbf24', icon: '%' },
    { value: '581', label: 'POINTS', color: '#ef4444', icon: 'P' },
  ]

  const favGames = [
    { name: 'CS: Global Offensive', color: '#f97316', icon: 'C' },
    { name: 'League of Legends', color: '#38bdf8', icon: 'L' },
    { name: 'Fortnite', color: '#a855f7', icon: 'F' },
    { name: 'Rocket League', color: '#22c55e', icon: 'R' },
  ]

  const bio = {
    location: 'Serbia',
    joined: 'Joined September 2019',
    dob: '27/05/2000',
    summary:
      'A passionate and progressive creator with ambition to elevate the esports ecosystem in ways that promote community growth and technological innovation.',
  }

  const events = [
    {
      title: 'Guardian Championship',
      subtitle: 'BattleArena League',
      date: 'Sep 27, 2019',
      region: 'North America',
      color: '#0ea5e9',
      icon: 'G',
    },
    {
      title: 'September Crafty MAJOR',
      subtitle: 'Insta League',
      date: 'Sep 30, 2019',
      region: 'North America',
      color: '#ef4444',
      icon: 'S',
    },
    {
      title: 'Kill Me If You Can',
      subtitle: 'BattleArena League',
      date: 'Sep 31, 2019',
      region: 'North America',
      color: '#f97316',
      icon: 'K',
    },
    {
      title: 'Guardian Championship',
      subtitle: 'BattleArena League',
      date: 'Sep 27, 2019',
      region: 'North America',
      color: '#22c55e',
      icon: 'H',
    },
  ]

  const handleLogout = async () => {
    try {
      setLoggingOut(true)
      const res = await fetch(`${AUTH_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.message || 'Failed to log out')
      }

      navigate('/login', { replace: true })
    } catch (e) {
      setError(e.message || 'Failed to log out')
    } finally {
      setLoggingOut(false)
    }
  }

  return (
    <main className="profile-page page">
      <div className="profile-container">
        <div className="profile-topbar">
          <h2 className="profile-topbar__title">My Account</h2>
          <div className="profile-topbar__actions">
            <button className="btn btn-small btn-secondary" type="button">
              Send Request
            </button>
            <button className="btn btn-small btn-primary" type="button">
              Message
            </button>
            <button
              className="btn btn-small btn-secondary"
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
            >
              {loggingOut ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </div>

        <section className="profile-hero" aria-label="Profile overview">
          <div className="profile-hero__identity">
            <div className="profile-avatar-box" aria-hidden="true">
              {initial}
            </div>
            <div className="profile-hero__text">
              <div className="profile-hero__name">
                {displayName} <span className="profile-hero__dot" aria-hidden="true" />
              </div>
              <div className="profile-hero__level">Lv17</div>
              <div className="profile-hero__joined">{bio.joined}</div>
            </div>
          </div>

          <div className="profile-hero__actions">
            <button className="btn btn-small btn-secondary" type="button">
              Follow
            </button>
            <button className="btn btn-small btn-secondary" type="button">
              Message
            </button>
          </div>
        </section>

        {loading && <p className="muted" style={{ marginTop: '1rem' }}>Loading...</p>}

        {error && (
          <div className="auth-card profile-card" style={{ marginTop: '1rem' }}>
            <p className="auth-subtitle" style={{ marginBottom: '0.5rem' }}>
              {error}
            </p>
            <p className="muted" style={{ margin: 0 }}>
              Please log in again.
            </p>
          </div>
        )}

        <div className="profile-stats-row" aria-label="Stats">
          {stats.map((s) => (
            <div className="profile-stat" key={s.label}>
              <div className="profile-stat__icon" style={{ background: s.color }} aria-hidden="true">
                {s.icon}
              </div>
              <div className="profile-stat__value">{s.value}</div>
              <div className="profile-stat__label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="profile-upper-grid">
          <section className="profile-card profile-favs" aria-label="Favorite games">
            <h3 className="profile-section-title">Fav Games</h3>
            <div className="profile-games-grid">
              {favGames.map((g) => (
                <div className="profile-game" key={g.name}>
                  <div className="profile-game__icon" style={{ background: g.color }} aria-hidden="true">
                    {g.icon}
                  </div>
                  <div className="profile-game__name">{g.name}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="profile-card profile-bio" aria-label="Bio">
            <h3 className="profile-section-title">Bio</h3>
            <div className="profile-bio__content">
              <div className="profile-bio__row">
                <span className="profile-bio__k">Serbia</span>
              </div>
              <p className="profile-bio__text">{bio.summary}</p>
              <div className="profile-bio__row">
                <span className="profile-bio__k">27/05/2000</span>
              </div>
            </div>
          </section>
        </div>

        <section className="profile-events" aria-label="Active events">
          <h3 className="profile-section-title">Active events</h3>
          <div className="profile-events-grid">
            {events.map((e) => (
              <div className="profile-event" key={e.title + e.date + e.region}>
                <div className="profile-event__icon" style={{ background: e.color }} aria-hidden="true">
                  {e.icon}
                </div>
                <div className="profile-event__meta">
                  <div className="profile-event__title">{e.title}</div>
                  <div className="profile-event__subtitle">{e.subtitle}</div>
                  <div className="profile-event__details">
                    {e.date} <span className="profile-event__sep">|</span> {e.region}
                  </div>
                </div>
                <button className="btn btn-small btn-secondary profile-event__btn" type="button">
                  View
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Keep these real values visible for now; layout mirrors your screenshot. */}
        {user && (
          <div className="profile-debug-values" aria-hidden="true">
            <div style={{ display: 'none' }}>{user.email}</div>
            <div style={{ display: 'none' }}>{user.googleId}</div>
          </div>
        )}
      </div>
    </main>
  )
}

export default ProfilePage

