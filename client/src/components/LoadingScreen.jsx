import { useEffect, useState, useCallback } from 'react'
import './LoadingScreen.css'

export default function LoadingScreen({ onEnter }) {
  const [progress, setProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  // Fast simulated counter that counts up to 100
  useEffect(() => {
    let current = 0
    const interval = setInterval(() => {
      // Accelerate towards 100
      const jump = Math.floor(Math.random() * 12) + 8
      current = Math.min(100, current + jump)
      setProgress(current)

      if (current >= 100) {
        clearInterval(interval)
      }
    }, 70)

    return () => clearInterval(interval)
  }, [])

  const handleEnter = useCallback(() => {
    if (isExiting) return
    setIsExiting(true)
    setTimeout(() => {
      if (onEnter) onEnter()
    }, 520)
  }, [isExiting, onEnter])

  // Support pressing Enter or Space key
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

      {/* Main Centered Content */}
      <div className="exiles-loader__center">
        <h1 className="exiles-loader__title">EXILES</h1>

        <div className="exiles-loader__subtitles">
          <p className="exiles-loader__subtitle-line">WELCOME TO EXILES.</p>
          <p className="exiles-loader__subtitle-line">WE RISE ABOVE THE REST.</p>
          <p className="exiles-loader__subtitle-line">CREATORS. COMPETITORS. COMMUNITY.</p>
        </div>

        <button
          type="button"
          className="exiles-loader__enter-btn"
          onClick={handleEnter}
          aria-label="Enter Exiles Website"
        >
          ENTER
        </button>
      </div>

      {/* Fixed Bottom Elements */}
      <footer className="exiles-loader__footer">
        <div className="exiles-loader__footer-meta">
          <span className="exiles-loader__est">EST. 2025</span>
          <span className="exiles-loader__counter">
            {progress} / 100
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
