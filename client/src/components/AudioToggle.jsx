import { useState, useEffect } from 'react'
import {
  isSfxMuted,
  setSfxMuted,
  isBgmPlaying,
  startBackgroundMusic,
  subscribeAudioState,
  playClickSound,
} from '../utils/soundEffects'

export default function AudioToggle() {
  const [audioEnabled, setAudioEnabled] = useState(() => !isSfxMuted())
  const [bgmActive, setBgmActive] = useState(() => isBgmPlaying())

  useEffect(() => {
    const unsubscribe = subscribeAudioState(({ playing, muted }) => {
      setAudioEnabled(!muted)
      setBgmActive(playing && !muted)
    })

    // Start background music on first user interaction if enabled
    const handleFirstInteraction = () => {
      if (!isSfxMuted()) {
        startBackgroundMusic()
      }
    }
    window.addEventListener('pointerdown', handleFirstInteraction, { once: true })

    return () => {
      unsubscribe()
      window.removeEventListener('pointerdown', handleFirstInteraction)
    }
  }, [])

  const toggleSound = () => {
    const nextEnabled = !audioEnabled
    setSfxMuted(!nextEnabled)
    setAudioEnabled(nextEnabled)
    if (nextEnabled) {
      startBackgroundMusic()
      playClickSound('primary')
    }
  }

  return (
    <button
      type="button"
      className={`tyrant-audio-toggle ${audioEnabled ? 'tyrant-audio-toggle--playing' : ''}`}
      onClick={toggleSound}
      title={
        audioEnabled
          ? 'Gaming BGM & UI Sound: ON (Click to Mute)'
          : 'Gaming BGM & UI Sound: MUTED (Click to Enable)'
      }
      aria-label="Toggle Gaming Background Music and Sound Effects"
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
        {audioEnabled ? (
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
      <span className="tyrant-audio-toggle__bars" aria-hidden="true">
        <span className={`tyrant-audio-toggle__bar ${bgmActive ? 'is-active' : ''}`} />
        <span className={`tyrant-audio-toggle__bar ${bgmActive ? 'is-active' : ''}`} />
        <span className={`tyrant-audio-toggle__bar ${bgmActive ? 'is-active' : ''}`} />
      </span>
      <span className="tyrant-audio-toggle__label">
        {audioEnabled ? 'BGM ON' : 'MUTED'}
      </span>
    </button>
  )
}
