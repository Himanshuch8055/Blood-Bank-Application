import { Link } from 'react-router-dom'
import { FaUserPlus } from 'react-icons/fa'
import { MdEmergency } from 'react-icons/md'
import heroImage from '../../assets/heroImage.webp'

const Hero = () => {

  return (
    <section className="relative min-h-[600px] bg-gradient-to-r from-red-700 to-red-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in">
                Every Drop of Blood
                <span className="block text-red-300">Can Save a Life</span>
              </h1>
              <p className="text-lg md:text-xl text-red-100 max-w-2xl animate-fade-in-delay">
                Join our mission to ensure every patient gets the blood they need, when they need it.
                Your donation can make a difference.
              </p>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 animate-fade-in-delay-2">
              <Link
                to="/donor-registration"
                className="group inline-flex items-center px-6 py-3 bg-white text-red-600 rounded-lg font-medium hover:bg-red-50 transition-all duration-300 transform hover:scale-105"
              >
                <FaUserPlus className="mr-2 group-hover:animate-bounce" />
                Become a Donor
              </Link>
              <Link
                to="/emergency-locator"
                className="group inline-flex items-center px-6 py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-red-600 transition-all duration-300 transform hover:scale-105"
              >
                <MdEmergency className="mr-2 group-hover:animate-pulse" />
                Emergency Request
              </Link>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-8 text-sm text-red-100">
              <div className="flex items-center">
                <span className="font-bold text-2xl mr-2">1000+</span>
                Active Donors
              </div>
              <div className="flex items-center">
                <span className="font-bold text-2xl mr-2">24/7</span>
                Support
              </div>
              <div className="flex items-center">
                <span className="font-bold text-2xl mr-2">50+</span>
                Partner Hospitals
              </div>
            </div>
          </div>

          <div className="hidden lg:block relative animate-float">
            <div className="relative">
              <img 
                src={heroImage}
                alt="Blood Donation Illustration"
                className="w-full max-w-lg mx-auto rounded-lg shadow-2xl transform transition-transform duration-500 hover:scale-105"
                style={{
                  filter: 'drop-shadow(0 20px 30px rgba(0, 0, 0, 0.15))'
                }}
              />
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-red-400 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-red-300 rounded-full opacity-20 animate-pulse delay-150"></div>
            </div>

            {/* Floating Info Cards */}
            <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-lg rounded-lg p-4 transform rotate-6 animate-float-delay shadow-xl">
              <div className="text-sm">
                <div className="font-bold">Latest Donation</div>
                <div className="text-red-200">2 minutes ago</div>
              </div>
            </div>
            <div className="absolute -bottom-2 left-4 bg-white/10 backdrop-blur-lg rounded-lg p-4 transform -rotate-6 animate-float-delay-2 shadow-xl">
              <div className="text-sm">
                <div className="font-bold">Lives Saved</div>
                <div className="text-red-200">500+ this month</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Effect */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          viewBox="0 0 1440 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path 
            d="M0 0L48 8.875C96 17.75 192 35.5 288 44.375C384 53.25 480 53.25 576 44.375C672 35.5 768 17.75 864 26.625C960 35.5 1056 71 1152 79.875C1248 88.75 1344 71 1392 62.125L1440 53.25V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V0Z" 
            fill="white"
          />
        </svg>
      </div>
    </section>
  )
}

export default Hero 