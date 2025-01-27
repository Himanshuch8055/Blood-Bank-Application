import Hero from '../features/Hero'
import Statistics from '../features/Statistics'
import Features from '../features/Features'
import Testimonials from '../features/Testimonials'
import FAQ from '../features/FAQ'
import Contact from '../features/Contact'
import BloodTypeGuide from '../features/BloodTypeGuide'
import EmergencySection from '../features/EmergencySection'
import DonationProcess from '../features/DonationProcess'
import UpcomingCamps from '../features/UpcomingCamps'
import NewsUpdates from '../features/NewsUpdates'

const Home = () => {
  return (
    <div>
      <Hero />
      <EmergencySection />
      <Statistics />
      <Features />
      <DonationProcess />
      <BloodTypeGuide />
      <UpcomingCamps />
      <Testimonials />
      <NewsUpdates />
      <FAQ />
      <Contact />
    </div>
  )
}

export default Home 