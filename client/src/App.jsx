import './App.css'
import { useState, useEffect } from 'react'
import LoadingScreen from './components/LoadingScreen'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import InsideSection from './components/InsideSection'
import CreatorsSection from './components/CreatorsSection'
import ManagementSection from './components/ManagementSection'
import TeamsSection from './components/TeamsSection'
import Footer from './components/Footer'
import AudioToggle from './components/AudioToggle'
import ProfileModal from './components/ProfileModal'
import { teams } from './data/siteContent'

let sessionEntered = false

function App() {
  const [hasEntered, setHasEntered] = useState(() => sessionEntered)
  const [selectedProfile, setSelectedProfile] = useState(null)

  const handleEnter = () => {
    sessionEntered = true
    setHasEntered(true)
  }

  // Scroll-reveal observer for smooth GUI entrance animations across all sections
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal-on-scroll')
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [hasEntered])

  return (
    <main className="tyrant-page">
      {!hasEntered && <LoadingScreen onEnter={handleEnter} />}

      <Header />

      {/* Hero Section with Rotating Exiles Background, Telemetry & Statement */}
      <HeroSection
        onMeetCreators={() =>
          document.getElementById('creators')?.scrollIntoView({ behavior: 'smooth' })
        }
        onExploreTeams={() =>
          document.getElementById('teams')?.scrollIntoView({ behavior: 'smooth' })
        }
      />

      {/* Competitive Lineups / Rosters */}
      <TeamsSection teams={teams} />

      {/* 01 / TOURNAMENT & LAN ARCHIVES */}
      <InsideSection />

      {/* 02 / PLAYERS & TALENT - THE FRONTLINE ROSTER */}
      <CreatorsSection onOpenProfile={(profile) => setSelectedProfile(profile)} />

      {/* 03 / COMMAND & COACHING STAFF */}
      <ManagementSection onOpenProfile={(profile) => setSelectedProfile(profile)} />

      {/* 00 / THE ORGANIZATION - ENGINEERED FOR CHAMPIONSHIPS */}
      <AboutSection
        onMeetTeams={() =>
          document.getElementById('teams')?.scrollIntoView({ behavior: 'smooth' })
        }
      />

      {/* Footer & Socials */}
      <Footer />

      {/* Floating Sound Toggle Button (bottom-right) */}
      <AudioToggle />

      {/* Profile Detail Modal */}
      {selectedProfile && (
        <ProfileModal
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
        />
      )}
    </main>
  )
}

export default App
