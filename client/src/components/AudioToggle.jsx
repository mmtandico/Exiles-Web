import { useState, useEffect } from 'react'
import {
  isSfxMuted,
  setSfxMuted,
  startBackgroundMusic,
  subscribeAudioState,
  playClickSound,
} from '../utils/soundEffects'

export default function AudioToggle() {
  const [audioEnabled, setAudioEnabled] = useState(() => !isSfxMuted())

  useEffect(() => {
    const unsubscribe = subscribeAudioState(({ muted }) => {
      setAudioEnabled(!muted)
    })

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
          ? 'Background Music & Sound: ON (Click to Mute)'
          : 'Background Music & Sound: MUTED (Click to Enable)'
      }
      aria-label={audioEnabled ? 'Mute background music' : 'Turn on background music'}
      aria-pressed={audioEnabled}
    >
      {audioEnabled ? (
        <svg
          className="tyrant-audio-toggle__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M11 5 6 9H3v6h3l5 4V5Z" fill="currentColor" />
          <path d="M15.5 8.5a5 5 0 0 1 0 7" />
          <path d="M19 5a10 10 0 0 1 0 14" />
        </svg>
      ) : (
        <svg
          className="tyrant-audio-toggle__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M11 5 6 9H3v6h3l5 4V5Z" fill="currentColor" />
          <path d="m16 9 5 6" />
          <path d="m21 9-5 6" />
        </svg>
      )}
    </button>
  )
}
