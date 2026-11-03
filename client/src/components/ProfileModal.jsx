import { playClickSound, playHoverSound } from '../utils/soundEffects'

export default function ProfileModal({ profile, onClose }) {
  if (!profile) return null

  const handleClose = () => {
    playClickSound()
    onClose()
  }

  const isAnimatedCommunityProfile = Boolean(profile.animPattern)

  return (
    <div className="tyrant-modal-overlay" onClick={handleClose} role="dialog" aria-modal="true">
      <div
        className="tyrant-modal-box"
        style={{ '--profile-accent': profile.accent || '#ff3700' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="tyrant-modal-close"
          onClick={handleClose}
          onMouseEnter={playHoverSound}
          aria-label="Close Profile"
        >
          ✕
        </button>

        <div className="tyrant-modal-content">
          <div className="tyrant-modal-image-col">
            {isAnimatedCommunityProfile ? (
              <div className="tyrant-animated-profile tyrant-animated-profile--modal">
                <div className="tyrant-animated-profile__aura" />
                <div className="tyrant-animated-profile__ring tyrant-animated-profile__ring--outer" />
                <div className="tyrant-animated-profile__ring tyrant-animated-profile__ring--inner" />
                <div className="tyrant-animated-profile__scanline" />
                <div className="tyrant-animated-profile__particles">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div className="tyrant-animated-profile__avatar-frame">
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="tyrant-animated-profile__avatar-img"
                  />
                </div>
              </div>
            ) : (
              <img src={profile.image} alt={profile.name} className="tyrant-modal-img" />
            )}
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
              className="tyrant-btn tyrant-btn--primary"
              style={{ marginTop: '1.5rem', width: 'fit-content' }}
              onClick={handleClose}
              onMouseEnter={playHoverSound}
            >
              CLOSE DOSSIER
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
