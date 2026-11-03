import { playClickSound, playHoverSound } from '../utils/soundEffects'

export default function AboutSection({ onMeetTeams }) {
  const handleScrollToTeams = () => {
    playClickSound('primary')
    if (onMeetTeams) {
      onMeetTeams()
      return
    }
    const el = document.getElementById('teams')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="about" className="tyrant-section tyrant-about">
      <div className="tyrant-container tyrant-about__grid">
        {/* Left Column */}
        <div className="tyrant-about__left reveal-on-scroll">
          <div className="tyrant-section-tag">00 / THE ORGANIZATION</div>
          <h2 className="tyrant-about__heading">
            ENGINEERED FOR
            <br />
            <span className="tyrant-text-accent">CHAMPIONSHIPS.</span>
          </h2>
          <p className="tyrant-about__intro">
            Exiles Esports is a premier competitive team organization forged in the Philippines.
            We recruit top-tier mechanical talent, build structured coaching systems, and compete
            to win every trophy on the regional and international stage.
          </p>
          <button
            type="button"
            className="tyrant-btn tyrant-btn--primary"
            onClick={handleScrollToTeams}
            onMouseEnter={playHoverSound}
          >
            EXPLORE ACTIVE DIVISIONS
          </button>
        </div>

        {/* Right Column */}
        <div className="tyrant-about__right">
          <div className="tyrant-about__block reveal-on-scroll" style={{ '--stagger-index': 0 }}>
            <h3 className="tyrant-about__block-title">01 // COMPETITIVE PEDIGREE</h3>
            <p className="tyrant-about__block-text">
              Founded in 2025 as a dominant championship squad, Exiles rapidly evolved into a
              multi-division esports powerhouse. Every roster under our banner operates with one
              directive: set the standard in server discipline, tactical depth, and tournament results.
            </p>
          </div>

          <div className="tyrant-about__block reveal-on-scroll" style={{ '--stagger-index': 1 }}>
            <h3 className="tyrant-about__block-title">02 // HIGH-PERFORMANCE INFRASTRUCTURE</h3>
            <p className="tyrant-about__block-text">
              Winning championships requires more than raw aim. We equip our divisions with dedicated
              analysts, structured scrimmage blocks, VOD telemetry, and sports performance staff so
              our competitors peak when the lights are brightest.
            </p>
          </div>

          <div className="tyrant-about__block reveal-on-scroll" style={{ '--stagger-index': 2 }}>
            <h3 className="tyrant-about__block-title">03 // CHAMPIONSHIP DNA</h3>
            <p className="tyrant-about__block-text">
              From our flagship pro rosters to our competitive content creators and academy prospects,
              every member of Exiles wears the crest with pride. We play fearless, adapt faster than
              the meta, and rise above the rest.
            </p>
          </div>

          <div className="tyrant-about__slogan reveal-on-scroll" style={{ '--stagger-index': 3 }}>
            // ONE BANNER. ONE OBJECTIVE. VICTORY.
          </div>
        </div>
      </div>
    </section>
  )
}
