import './App.css'
import { useState, useEffect } from 'react'
import LoadingScreen from './components/LoadingScreen'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
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
    <main className="tyrant-page apex-layout">
      {!hasEntered && <LoadingScreen onEnter={handleEnter} />}

      {/* 1. Top Esports Header with Full-Height Red CTA */}
      <Header />

      {/* 2. Diagonal Crimson & Exiles Background Hero + 10-Games Ribbon Bar */}
      <HeroSection
        onMeetCreators={() =>
          document.getElementById('management')?.scrollIntoView({ behavior: 'smooth' })
        }
        onExploreTeams={() =>
          document.getElementById('teams')?.scrollIntoView({ behavior: 'smooth' })
        }
      />

      {/* 3. 4-Column Tactical Feature Cards (DROP IN / GEAR UP / SQUAD UP / BE THE LAST) */}
      <AboutSection />

      {/* 4. "CHOOSE YOUR LEGEND" Slanted Parallelogram Roster (19 Team Exiles Community Minecraft Characters) */}
      <ManagementSection onOpenProfile={(profile) => setSelectedProfile(profile)} />

      {/* 5. 10 Competitive Games & Divisions */}
      <TeamsSection teams={teams} />

      {/* 6. "STAY UP TO DATE" Subscribe Banner + Esports Multi-Column Footer */}
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
