import { useState } from 'react'
import { playClickSound, playHoverSound } from '../utils/soundEffects'
import {
  DiscordIcon,
  TwitterIcon,
  InstagramIcon,
  YouTubeIcon,
  TikTokIcon,
  FacebookIcon,
} from './Icons'

export default function Footer() {
  const year = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    playClickSound('primary')
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer id="socials" className="apex-footer-wrap">
      {/* "STAY UP TO DATE" Banner Strip */}
      <div className="apex-newsletter-bar">
        <div className="tyrant-container apex-newsletter-bar__inner">
          <div className="apex-newsletter-bar__left">
            <img
              src="/Exiles-logo.png"
              alt="Exiles Emblem"
              className="apex-newsletter-bar__emblem"
            />
            <div>
              <h3 className="apex-newsletter-bar__title">STAY UP TO DATE</h3>
              <p className="apex-newsletter-bar__sub">
                Get the latest tournament news, roster updates, and community rewards.
              </p>
            </div>
          </div>

          <form className="apex-newsletter-bar__form" onSubmit={handleSubscribe}>
            <input
              type="email"
              className="apex-newsletter-bar__input"
              placeholder={subscribed ? 'You are subscribed to Exiles HQ!' : 'Enter your email'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="apex-newsletter-bar__btn"
              onMouseEnter={playHoverSound}
            >
              <span>{subscribed ? 'SUBSCRIBED' : 'SUBSCRIBE'}</span>
              <span>›</span>
            </button>
          </form>
        </div>
      </div>

      {/* Main Dark Multi-Column Footer */}
      <div className="apex-footer">
        <div className="tyrant-container apex-footer__inner">
          <div className="apex-footer__top">
            {/* Left Brand + Competitive Rating Box */}
            <div className="apex-footer__brand-col">
              <div className="apex-footer__logo-stack">
                <span className="apex-footer__logo-main">EXILES</span>
                <span className="apex-footer__logo-sub">— LEGENDS —</span>
              </div>

              <div className="apex-footer__rating-box">
                <div className="apex-footer__rating-letter">
                  <span>COMPETITIVE</span>
                  <strong>T1</strong>
                  <span>ESPORTS</span>
                </div>
                <div className="apex-footer__rating-text">
                  <span>Tournaments</span>
                  <span>Clan Wars</span>
                  <span>10 Active Games</span>
                  <span>Users Interact</span>
                </div>
              </div>
            </div>

            {/* 4 Link Columns */}
            <div className="apex-footer__links-grid">
              <div className="apex-footer__col">
                <span className="apex-footer__col-title">GAMES</span>
                <a href="#teams" onClick={() => playClickSound()} onMouseEnter={playHoverSound}>Minecraft & Valorant</a>
                <a href="#teams" onClick={() => playClickSound()} onMouseEnter={playHoverSound}>Bloodstrike & CODM</a>
                <a href="#teams" onClick={() => playClickSound()} onMouseEnter={playHoverSound}>MLBB, LoL & Dota</a>
                <a href="#teams" onClick={() => playClickSound()} onMouseEnter={playHoverSound}>RoS, Farlight & Steam</a>
              </div>

              <div className="apex-footer__col">
                <span className="apex-footer__col-title">COMMAND</span>
                <a href="#management" onClick={() => playClickSound()} onMouseEnter={playHoverSound}>Founder: Zax/Vianz</a>
                <a href="#management" onClick={() => playClickSound()} onMouseEnter={playHoverSound}>Executive: Nite</a>
                <a href="#management" onClick={() => playClickSound()} onMouseEnter={playHoverSound}>Admins & Managers</a>
                <a href="#management" onClick={() => playClickSound()} onMouseEnter={playHoverSound}>12 Board Directors</a>
              </div>

              <div className="apex-footer__col">
                <span className="apex-footer__col-title">COMMUNITY</span>
                <a href="https://discord.gg/GcUsDxPdv8" target="_blank" rel="noreferrer" onClick={() => playClickSound('primary')} onMouseEnter={playHoverSound}>Discord</a>
                <a href="#management" onClick={() => playClickSound()} onMouseEnter={playHoverSound}>Legends</a>
                <a href="#inside" onClick={() => playClickSound()} onMouseEnter={playHoverSound}>Twitter / X</a>
                <a href="#inside" onClick={() => playClickSound()} onMouseEnter={playHoverSound}>YouTube</a>
              </div>

              <div className="apex-footer__col">
                <span className="apex-footer__col-title">ESPORTS</span>
                <a href="#teams" onClick={() => playClickSound()} onMouseEnter={playHoverSound}>Divisions</a>
                <a href="#management" onClick={() => playClickSound()} onMouseEnter={playHoverSound}>Leadership</a>
                <a href="#inside" onClick={() => playClickSound()} onMouseEnter={playHoverSound}>Standings</a>
                <a href="#inside" onClick={() => playClickSound()} onMouseEnter={playHoverSound}>News</a>
              </div>
            </div>

            {/* Right Follow Us Social SVG Icons (No Emojis) */}
            <div className="apex-footer__social-col">
              <span className="apex-footer__col-title">FOLLOW US</span>
              <div className="apex-footer__social-icons">
                <a href="#socials" className="apex-footer__social-btn" onClick={() => playClickSound()} onMouseEnter={playHoverSound} aria-label="Twitter / X">
                  <TwitterIcon className="apex-svg-icon apex-svg-icon--xs" />
                </a>
                <a href="#socials" className="apex-footer__social-btn" onClick={() => playClickSound()} onMouseEnter={playHoverSound} aria-label="Instagram">
                  <InstagramIcon className="apex-svg-icon apex-svg-icon--xs" />
                </a>
                <a href="#socials" className="apex-footer__social-btn" onClick={() => playClickSound()} onMouseEnter={playHoverSound} aria-label="YouTube">
                  <YouTubeIcon className="apex-svg-icon apex-svg-icon--xs" />
                </a>
                <a href="#socials" className="apex-footer__social-btn" onClick={() => playClickSound()} onMouseEnter={playHoverSound} aria-label="TikTok">
                  <TikTokIcon className="apex-svg-icon apex-svg-icon--xs" />
                </a>
                <a href="https://discord.gg/GcUsDxPdv8" target="_blank" rel="noreferrer" className="apex-footer__social-btn" onClick={() => playClickSound('primary')} onMouseEnter={playHoverSound} aria-label="Discord">
                  <DiscordIcon className="apex-svg-icon apex-svg-icon--xs" />
                </a>
                <a href="#socials" className="apex-footer__social-btn" onClick={() => playClickSound()} onMouseEnter={playHoverSound} aria-label="Facebook">
                  <FacebookIcon className="apex-svg-icon apex-svg-icon--xs" />
                </a>
              </div>
            </div>
          </div>

          <div className="apex-footer__bottom">
            <p className="apex-footer__copy">
              © {year} Team Exiles Competitive Organization. All rights reserved.
            </p>
            <div className="apex-footer__studio-badge">
              <span>EXILES</span>
              <small>ENTERTAINMENT & ESPORTS</small>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
