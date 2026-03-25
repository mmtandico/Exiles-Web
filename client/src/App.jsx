import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import TeamsSection from './components/TeamsSection'
import AchievementsSection from './components/AchievementsSection'
import ContactSection from './components/ContactSection'
import ContentGrid from './components/layout/ContentGrid'
import TrailersRow from './components/home/TrailersRow'
import TopNews from './components/home/TopNews'
import RatingPanel from './components/home/RatingPanel'
import HallOfFame from './components/home/HallOfFame'
import SalePromo from './components/home/SalePromo'
import GalleryGrid from './components/home/GalleryGrid'
import UpcomingGames from './components/home/UpcomingGames'
import ReviewsRow from './components/home/ReviewsRow'
import Footer from './components/Footer'
import { achievements, contacts, teams } from './data/siteContent'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ProfilePage from './pages/ProfilePage'

function LandingPage() {
  return (
    <main className="page">
      <Header />
      <HeroSection />
      <ContentGrid>
        <div data-slot="main">
          <TrailersRow />
          <TopNews />
          <SalePromo />
          <GalleryGrid />
          <ReviewsRow />
        </div>
        <aside data-slot="sidebar">
          <RatingPanel />
          <HallOfFame />
          <UpcomingGames />
        </aside>
      </ContentGrid>
      <AboutSection />
      <TeamsSection teams={teams} />
      <AchievementsSection achievements={achievements} />
      <ContactSection contacts={contacts} />
      <Footer />
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/account" element={<ProfilePage />} />
        <Route path="/profile/security" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
