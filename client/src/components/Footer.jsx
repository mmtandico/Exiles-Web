import { playClickSound, playHoverSound } from '../utils/soundEffects'

export default function Footer() {
  const year = new Date().getFullYear()

  const scrollToTop = () => {
    playClickSound('primary')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer id="socials" className="tyrant-footer">
      <div className="tyrant-container tyrant-footer__inner">
        <div className="tyrant-footer__top reveal-on-scroll">
          <div className="tyrant-footer__brand-block">
            <h2 className="tyrant-footer__logo">EXILES ESPORTS</h2>
            <p className="tyrant-footer__slogan">BUILT TO DOMINATE. WE RISE ABOVE THE REST.</p>
            <p className="tyrant-footer__desc">
              A premier Philippine competitive esports organization fielding championship rosters,
              tactical coaching staff, and high-impact gaming creators across Southeast Asia.
            </p>
          </div>

          <div className="tyrant-footer__links-group">
            <div className="tyrant-footer__col">
              <span className="tyrant-footer__col-title">DIVISIONS & HQ</span>
              <a href="#hero" onClick={() => playClickSound()} onMouseEnter={playHoverSound}>HOME</a>
              <a href="#teams" onClick={() => playClickSound()} onMouseEnter={playHoverSound}>PRO ROSTERS</a>
              <a href="#creators" onClick={() => playClickSound()} onMouseEnter={playHoverSound}>PLAYERS & TALENT</a>
              <a href="#management" onClick={() => playClickSound()} onMouseEnter={playHoverSound}>COMMAND STAFF</a>
              <a href="#inside" onClick={() => playClickSound()} onMouseEnter={playHoverSound}>TOURNAMENTS</a>
              <a href="#about" onClick={() => playClickSound()} onMouseEnter={playHoverSound}>ORGANIZATION</a>
            </div>

            <div className="tyrant-footer__col">
              <span className="tyrant-footer__col-title">COMMUNITY & BROADCAST</span>
              <a href="https://discord.gg/GcUsDxPdv8" target="_blank" rel="noreferrer" onClick={() => playClickSound('primary')} onMouseEnter={playHoverSound}>OFFICIAL DISCORD</a>
              <a href="#socials" onClick={() => playClickSound()} onMouseEnter={playHoverSound}>YOUTUBE ESPORTS</a>
              <a href="#socials" onClick={() => playClickSound()} onMouseEnter={playHoverSound}>TWITCH TEAM</a>
              <a href="#socials" onClick={() => playClickSound()} onMouseEnter={playHoverSound}>TWITTER / X</a>
              <a href="#socials" onClick={() => playClickSound()} onMouseEnter={playHoverSound}>TIKTOK HIGHLIGHTS</a>
            </div>

            <div className="tyrant-footer__col">
              <span className="tyrant-footer__col-title">ORGANIZATION</span>
              <a href="#about" onClick={() => playClickSound()} onMouseEnter={playHoverSound}>PARTNERSHIPS</a>
              <a href="#teams" onClick={() => playClickSound()} onMouseEnter={playHoverSound}>SCRIM & TRYOUTS</a>
              <a href="#about" onClick={() => playClickSound()} onMouseEnter={playHoverSound}>BRAND & PRESS KIT</a>
              <a href="#about" onClick={() => playClickSound()} onMouseEnter={playHoverSound}>COMPETITIVE CODE</a>
            </div>
          </div>
        </div>

        <div className="tyrant-footer__bottom">
          <p className="tyrant-footer__copy">
            © {year} EXILES COMPETITIVE ESPORTS ORGANIZATION. ALL RIGHTS RESERVED.
          </p>

          <button
            type="button"
            className="tyrant-footer__back-to-top"
            onClick={scrollToTop}
            onMouseEnter={playHoverSound}
          >
            BACK TO TOP ↑
          </button>
        </div>
      </div>
    </footer>
  )
}
