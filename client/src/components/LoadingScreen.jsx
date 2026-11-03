import { useEffect, useState, useCallback } from 'react'
import { playEnterSound, playHoverSound } from '../utils/soundEffects'
import './LoadingScreen.css'

export default function LoadingScreen({ onEnter }) {
  const [progress, setProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    let current = 0
    const interval = setInterval(() => {
      const jump = Math.floor(Math.random() * 14) + 9
      current = Math.min(100, current + jump)
      setProgress(current)

      if (current >= 100) {
        clearInterval(interval)
      }
    }, 65)

    return () => clearInterval(interval)
  }, [])

  const handleEnter = useCallback(() => {
    if (isExiting) return
    playEnterSound()
    setIsExiting(true)
    setTimeout(() => {
      if (onEnter) onEnter()
    }, 520)
  }, [isExiting, onEnter])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleEnter()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleEnter])

  return (
    <div
      className={`exiles-loader ${isExiting ? 'exiles-loader--exiting' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome Loading Screen"
    >
      <div className="exiles-loader__vignette" />

      <div className="exiles-loader__center">
        <h1 className="exiles-loader__title">EXILES</h1>

        <div className="exiles-loader__subtitles">
          <p className="exiles-loader__subtitle-line">TIER-1 COMPETITIVE ESPORTS ORGANIZATION</p>
          <p className="exiles-loader__subtitle-line">CHAMPIONSHIP ROSTERS • TACTICAL EXCELLENCE</p>
          <p className="exiles-loader__subtitle-line">WE RISE ABOVE THE REST.</p>
        </div>

        <button
          type="button"
          className="exiles-loader__enter-btn"
          onClick={handleEnter}
          onMouseEnter={playHoverSound}
          aria-label="Enter Exiles Website"
        >
          ENTER HQ
        </button>
      </div>

      <footer className="exiles-loader__footer">
        <div className="exiles-loader__footer-meta">
          <span className="exiles-loader__est">EXILES ESPORTS // EST. 2025</span>
          <span className="exiles-loader__counter">
            SYSTEM READY {progress} / 100
          </span>
        </div>
        <div className="exiles-loader__bottom-bar">
          <div
            className="exiles-loader__bottom-progress"
            style={{ width: `${progress}%` }}
          />
        </div>
      </footer>
    </div>
  )
}
