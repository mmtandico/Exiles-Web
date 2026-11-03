export default function ProfileModal({ profile, onClose }) {
  if (!profile) return null

  return (
    <div className="tyrant-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="tyrant-modal-box" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="tyrant-modal-close"
          onClick={onClose}
          aria-label="Close Profile"
        >
          ✕
        </button>

        <div className="tyrant-modal-content">
          <div className="tyrant-modal-image-col">
            <img src={profile.image} alt={profile.name} className="tyrant-modal-img" />
          </div>

          <div className="tyrant-modal-info-col">
            <div className="tyrant-section-tag">
              {profile.department || profile.category || 'MEMBER'}
            </div>
            <h2 className="tyrant-modal-name">{profile.name}</h2>
            <div className="tyrant-modal-role">{profile.role}</div>

            <p className="tyrant-modal-bio">{profile.bio}</p>

            {profile.socials && (
              <div className="tyrant-modal-socials">
                <span className="tyrant-modal-socials-title">CONNECTED CHANNELS</span>
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
              onClick={onClose}
            >
              CLOSE PROFILE
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
