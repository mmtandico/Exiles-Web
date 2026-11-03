import { useState } from 'react'
import { isSfxMuted, setSfxMuted, playClickSound } from '../utils/soundEffects'

export default function AudioToggle() {
  const [sfxEnabled, setSfxEnabled] = useState(() => !isSfxMuted())

  const toggleSound = () => {
    const nextEnabled = !sfxEnabled
    setSfxMuted(!nextEnabled)
    setSfxEnabled(nextEnabled)
    if (nextEnabled) {
      playClickSound('primary')
    }
  }

  return (
    <button
      type="button"
      className={`tyrant-audio-toggle ${sfxEnabled ? 'tyrant-audio-toggle--playing' : ''}`}
      onClick={toggleSound}
      title={sfxEnabled ? 'UI Sound Effects: ON (Click to Mute)' : 'UI Sound Effects: MUTED (Click to Enable)'}
      aria-label="Toggle UI Sound Effects"
    >
      <svg
        className="tyrant-audio-toggle__icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {sfxEnabled ? (
          <>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </>
        ) : (
          <>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </>
        )}
      </svg>
    </button>
  )
}
