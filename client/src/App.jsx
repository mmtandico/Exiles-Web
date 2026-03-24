import './App.css'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import TeamsSection from './components/TeamsSection'
import AchievementsSection from './components/AchievementsSection'
import ContactSection from './components/ContactSection'
import { achievements, contacts, teams } from './data/siteContent'

function App() {
  return (
    <main className="page">
      <Header />
      <HeroSection />
      <AboutSection />
      <TeamsSection teams={teams} />
      <AchievementsSection achievements={achievements} />
      <ContactSection contacts={contacts} />
    </main>
  )
}

export default App
