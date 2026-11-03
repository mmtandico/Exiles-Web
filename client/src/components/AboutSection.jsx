export default function AboutSection({ onMeetTeams }) {
  const handleScrollToTeams = () => {
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
        <div className="tyrant-about__left">
          <div className="tyrant-section-tag">00 / ABOUT US</div>
          <h2 className="tyrant-about__heading">
            A CULTURE
            <br />
            OF OUR OWN.
          </h2>
          <p className="tyrant-about__intro">
            We are Exiles. A Philippine esports and entertainment organization built on competitive
            ambition, creative expression, and a distinct identity.
          </p>
          <button
            type="button"
            className="tyrant-btn tyrant-btn--primary"
            onClick={handleScrollToTeams}
          >
            MEET THE TEAMS
          </button>
        </div>

        {/* Right Column */}
        <div className="tyrant-about__right">
          <div className="tyrant-about__block">
            <h3 className="tyrant-about__block-title">OUR BEGINNINGS</h3>
            <p className="tyrant-about__block-text">
              Founded in 2025, Exiles grew from a competitive team into an organization spanning
              esports, content, creators, apparel, and live experiences. We have carried the same
              drive into everything we build: earn our place, push our standards, and keep moving forward.
            </p>
          </div>

          <div className="tyrant-about__block">
            <h3 className="tyrant-about__block-title">WHAT WE BUILD</h3>
            <p className="tyrant-about__block-text">
              Today, we're bringing that ambition into entertainment. We help creators develop their
              presence, grow their communities, and turn their talent into lasting opportunities. We give
              aspiring players a platform to prove themselves and pursue a future in esports. Through our
              events and community initiatives, we create opportunities for people to compete, connect,
              and be discovered.
            </p>
          </div>

          <div className="tyrant-about__block">
            <h3 className="tyrant-about__block-title">OUR IDENTITY</h3>
            <p className="tyrant-about__block-text">
              Our identity runs through every part of Exiles, from the content we produce and the apparel
              we design to the experiences we create. We take pride in the details and put in the work
              behind them. Every player, creator, and creative brings an individual voice, united by a
              shared commitment to building something we're proud to put our name on.
            </p>
          </div>

          <div className="tyrant-about__slogan">
            We rise above the rest.
          </div>
        </div>
      </div>
    </section>
  )
}
