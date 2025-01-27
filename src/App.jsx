import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './components/pages/Home'
import Login from './components/auth/Login'
import DonorRegistration from './components/auth/DonorRegistration'
import HospitalRegistration from './components/auth/HospitalRegistration'
import DonorDashboard from './components/pages/DonorDashboard'
import HospitalDashboard from './components/pages/HospitalDashboard'
import BloodRequestDashboard from './components/pages/BloodRequestDashboard'
import BloodInventory from './components/pages/BloodInventory'
import Profile from './components/pages/Profile'
import AdminPanel from './components/admin/AdminPanel'
import BloodManagementDashboard from './components/admin/BloodManagementDashboard'
import FindDonor from './components/pages/FindDonor'
import BloodBanks from './components/pages/BloodBanks'
import EmergencyLocator from './components/features/EmergencyLocator'
import RealTimeInventory from './components/features/RealTimeInventory'
import ForgotPassword from './components/auth/ForgotPassword'
import QuickActions from './components/features/QuickActions'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <main className="flex-grow pt-20">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/donor-registration" element={<DonorRegistration />} />
              <Route path="/hospital-registration" element={<HospitalRegistration />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/blood-banks" element={<BloodBanks />} />
              <Route path="/emergency-locator" element={<EmergencyLocator />} />

              {/* Donor Routes */}
              <Route path="/donor-dashboard" element={<DonorDashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/donation-history" element={<DonorDashboard />} />

              {/* Hospital Routes */}
              <Route path="/hospital-dashboard" element={<HospitalDashboard />} />
              <Route path="/inventory" element={<BloodInventory />} />
              <Route path="/real-time-inventory" element={<RealTimeInventory />} />
              <Route path="/request-blood" element={<BloodRequestDashboard />} />
              <Route path="/find-donor" element={<FindDonor />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/management-dashboard" element={<BloodManagementDashboard />} />
              <Route path="/request-dashboard" element={<BloodRequestDashboard />} />
            </Routes>
          </main>
          <Footer />
          <QuickActions />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
