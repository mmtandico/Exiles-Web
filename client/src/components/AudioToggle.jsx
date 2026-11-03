import { useState, useRef } from 'react'

export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioCtxRef = useRef(null)
  const oscNodesRef = useRef([])

  const toggleSound = () => {
    if (isPlaying) {
      // Stop ambient drone
      oscNodesRef.current.forEach((node) => {
        try {
          node.stop()
          node.disconnect()
        } catch {
          // ignore
        }
      })
      oscNodesRef.current = []
      setIsPlaying(false)
    } else {
      // Start ambient synth pad with Web Audio API
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContext()
        }
        const ctx = audioCtxRef.current
        if (ctx.state === 'suspended') {
          ctx.resume()
        }

        // Sub drone
        const osc1 = ctx.createOscillator()
        const osc2 = ctx.createOscillator()
        const gainNode = ctx.createGain()
        const filter = ctx.createBiquadFilter()

        osc1.type = 'sawtooth'
        osc1.frequency.setValueAtTime(55, ctx.currentTime) // Low A
        osc2.type = 'sine'
        osc2.frequency.setValueAtTime(110.5, ctx.currentTime)

        filter.type = 'lowpass'
        filter.frequency.setValueAtTime(260, ctx.currentTime)

        gainNode.gain.setValueAtTime(0.001, ctx.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 1.5)

        osc1.connect(filter)
        osc2.connect(filter)
        filter.connect(gainNode)
        gainNode.connect(ctx.destination)

        osc1.start()
        osc2.start()

        oscNodesRef.current = [osc1, osc2, gainNode]
        setIsPlaying(true)
      } catch (err) {
        console.warn('Audio play prevented', err)
        setIsPlaying(false)
      }
    }
  }

  return (
    <button
      type="button"
      className={`tyrant-audio-toggle ${isPlaying ? 'tyrant-audio-toggle--playing' : ''}`}
      onClick={toggleSound}
      title={isPlaying ? 'Mute Atmosphere' : 'Play Atmosphere'}
      aria-label="Toggle Atmosphere Audio"
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
        {isPlaying ? (
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
