import { playClickSound, playHoverSound } from '../utils/soundEffects'

export default function ProfileModal({ profile, onClose }) {
  if (!profile) return null

  const handleClose = () => {
    playClickSound()
    onClose()
  }

  return (
    <div className="tyrant-modal-overlay" onClick={handleClose} role="dialog" aria-modal="true">
      <div
        className="tyrant-modal-box"
        style={{ '--profile-accent': '#dc2626' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="tyrant-modal-close"
          onClick={handleClose}
          onMouseEnter={playHoverSound}
          aria-label="Close Profile"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="tyrant-modal-content">
          {/* Clean Minecraft Character Avatar Inside Profile Box (No Circle Rings) */}
          <div className="tyrant-modal-image-col">
            <div className="apex-modal-portrait">
              <div className="apex-modal-portrait__slash" />
              <img
                src={profile.image}
                alt={profile.name}
                className="apex-modal-portrait__avatar"
              />
            </div>
          </div>

          <div className="tyrant-modal-info-col">
            <div className="tyrant-section-tag">
              {profile.rankCode
                ? `${profile.rankCode} // ${profile.department}`
                : profile.division || profile.department || profile.category || 'EXILES ROSTER'}
            </div>
            <h2 className="tyrant-modal-name">{profile.name}</h2>
            <div className="tyrant-modal-role">{profile.role}</div>

            {(profile.winRate || profile.kda) && (
              <div className="tyrant-modal-telemetry">
                {profile.winRate && (
                  <div className="tyrant-modal-telemetry__item">
                    <span className="tyrant-modal-telemetry__label">CLEARANCE / TIER</span>
                    <span className="tyrant-modal-telemetry__value">{profile.winRate}</span>
                  </div>
                )}
                {profile.kda && (
                  <div className="tyrant-modal-telemetry__item">
                    <span className="tyrant-modal-telemetry__label">DESIGNATION</span>
                    <span className="tyrant-modal-telemetry__value">{profile.kda}</span>
                  </div>
                )}
              </div>
            )}

            <p className="tyrant-modal-bio">{profile.bio}</p>

            {profile.socials && (
              <div className="tyrant-modal-socials">
                <span className="tyrant-modal-socials-title">OFFICIAL CHANNELS</span>
                <div className="tyrant-modal-links">
                  {Object.entries(profile.socials).map(([platform, handle]) => (
                    <span key={platform} className="tyrant-modal-tag">
                      <strong>{platform.toUpperCase()}:</strong> {handle}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button
              type="button"
              className="apex-btn apex-btn--red"
              style={{ marginTop: '1.5rem', width: 'fit-content' }}
              onClick={handleClose}
              onMouseEnter={playHoverSound}
            >
              <span>CLOSE DOSSIER</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
