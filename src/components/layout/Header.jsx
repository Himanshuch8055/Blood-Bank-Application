import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { PiFirstAidDuotone } from "react-icons/pi"
import { 
  FaUser, 
  FaHospital, 
  FaTint, 
  FaUserMd,
  FaChevronDown,
  FaSignOutAlt
} from 'react-icons/fa'
import { debounce } from 'lodash'

const HEADER_CONFIG = {
  scrollThreshold: 50,
  debounceTime: 10,
  brandName: 'BloodBank',
  tagline: 'Saving Lives Together'
}

const NAVIGATION_ITEMS = [
  {
    label: 'Services',
    icon: <FaTint />,
    items: [
      { label: 'Find Donor', path: '/find-donor' },
      { label: 'Blood Banks', path: '/blood-banks' },
      { label: 'Emergency Locator', path: '/emergency-locator' },
      { label: 'Request Blood', path: '/request-blood' },
      { label: 'Real-time Inventory', path: '/real-time-inventory' }
    ]
  },
  {
    label: 'Donor Area',
    icon: <FaUser />,
    items: [
      { label: 'Donor Registration', path: '/donor-registration' },
      { label: 'Donor Dashboard', path: '/donor-dashboard' },
      { label: 'Donation History', path: '/donation-history' },
      { label: 'Profile', path: '/profile' }
    ]
  },
  {
    label: 'Hospital Area',
    icon: <FaHospital />,
    items: [
      { label: 'Hospital Registration', path: '/hospital-registration' },
      { label: 'Hospital Dashboard', path: '/hospital-dashboard' },
      { label: 'Blood Inventory', path: '/inventory' },
      { label: 'Request Dashboard', path: '/request-dashboard' }
    ]
  },
  {
    label: 'Admin',
    icon: <FaUserMd />,
    items: [
      { label: 'Admin Panel', path: '/admin' },
      { label: 'Management Dashboard', path: '/management-dashboard' },
      { label: 'Blood Management', path: '/blood-management' }
    ]
  }
]

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const { user, logout } = useAuth()
  const location = useLocation()

  // Handle scroll
  useEffect(() => {
    const handleScroll = debounce(() => {
      setIsScrolled(window.scrollY > HEADER_CONFIG.scrollThreshold)
    }, HEADER_CONFIG.debounceTime)

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${isScrolled 
        ? 'bg-white shadow-md py-2' 
        : 'bg-gradient-to-r from-red-700 to-red-900 py-4'
      }
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Brand */}
          <Link to="/" className="flex items-center space-x-3">
            <div className={`
              p-2 rounded-full transition-colors duration-300
              ${isScrolled 
                ? 'bg-red-100 text-red-600' 
                : 'bg-red-800/50 text-white'
              }
            `}>
              <PiFirstAidDuotone className="text-2xl" />
            </div>
            <div>
              <span className={`text-lg font-bold ${
                isScrolled ? 'text-red-600' : 'text-white'
              }`}>
                {HEADER_CONFIG.brandName}
              </span>
              <span className={`ml-2 text-xs ${
                isScrolled ? 'text-gray-600' : 'text-red-100'
              }`}>
                {HEADER_CONFIG.tagline}
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {NAVIGATION_ITEMS.map((item, index) => (
              <div 
                key={index}
                className="nav-item relative group"
              >
                <button
                  className={`
                    flex items-center space-x-2 py-2 px-3 rounded-lg
                    ${isScrolled 
                      ? 'text-gray-700 hover:bg-gray-100' 
                      : 'text-white hover:bg-red-800'
                    }
                  `}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  <FaChevronDown className="w-3 h-3" />
                </button>

                <div className="absolute top-full left-0 mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="py-2">
                    {item.items.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative nav-item group">
                <button
                  className={`
                    flex items-center space-x-2 py-2 px-3 rounded-lg
                    ${isScrolled 
                      ? 'text-gray-700 hover:bg-gray-100' 
                      : 'text-white hover:bg-red-800'
                    }
                  `}
                >
                  <FaUser />
                  <span>{user.name}</span>
                  <FaChevronDown className="w-3 h-3" />
                </button>

                <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="py-2">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50"
                    >
                      Profile Settings
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50"
                    >
                      <FaSignOutAlt className="inline mr-2" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium
                  ${isScrolled
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-white text-red-600 hover:bg-red-50'
                  }
                `}
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header