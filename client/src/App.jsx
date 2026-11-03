import './App.css'
import { useState } from 'react'
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

    return (
      <main className="tyrant-page">
        {!hasEntered && <LoadingScreen onEnter={handleEnter} />}

        <Header />

        {/* Hero Section with Exiles Background & Statement */}
        <HeroSection
          onMeetCreators={() =>
            document.getElementById('creators')?.scrollIntoView({ behavior: 'smooth' })
          }
        />

        {/* 00 / ABOUT US - A CULTURE OF OUR OWN */}
        <AboutSection
          onMeetTeams={() =>
            document.getElementById('teams')?.scrollIntoView({ behavior: 'smooth' })
          }
        />

        {/* INSIDE EXILES Showcase Carousel */}
        <InsideSection />

        {/* 01 / THE CREATORS - OWN THE SPOTLIGHT */}
        <CreatorsSection onOpenProfile={(profile) => setSelectedProfile(profile)} />

        {/* 02 / THE PEOPLE - BEHIND EXILES */}
        <ManagementSection onOpenProfile={(profile) => setSelectedProfile(profile)} />

        {/* Competitive Lineups / Rosters */}
        <TeamsSection teams={teams} />

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
