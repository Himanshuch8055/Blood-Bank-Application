import { Link } from 'react-router-dom'
import { 
  FaHandHoldingMedical, 
  FaAmbulance, 
  FaHospital, 
  FaSearch, 
  FaUserClock, 
  FaPhoneVolume,
  FaMapMarkedAlt,
  FaTimes,
  FaPlus
} from 'react-icons/fa'
import { useState } from 'react'

const QuickActions = () => {
  const [isOpen, setIsOpen] = useState(false)

  const actions = [
    {
      title: 'Donate Blood',
      description: 'Schedule your donation',
      icon: <FaHandHoldingMedical className="text-red-600" />,
      path: '/donor-registration',
      primary: true
    },
    {
      title: 'Emergency Request',
      description: 'Request blood urgently',
      icon: <FaAmbulance className="text-red-600" />,
      path: '/request-blood',
      primary: true
    },
    {
      title: 'Find Donor',
      description: 'Search donors near you',
      icon: <FaSearch className="text-red-600" />,
      path: '/find-donor'
    },
    {
      title: 'Blood Banks',
      description: 'Locate nearest centers',
      icon: <FaHospital className="text-red-600" />,
      path: '/blood-banks'
    },
    {
      title: 'Track Request',
      description: 'Check request status',
      icon: <FaUserClock className="text-red-600" />,
      path: '/track-request'
    },
    {
      title: 'Emergency Contacts',
      description: 'Important contacts',
      icon: <FaPhoneVolume className="text-red-600" />,
      path: '/emergency-contacts'
    }
  ]

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="relative">
        {/* Main Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-14 h-14 rounded-full shadow-lg flex items-center justify-center
            transition-all duration-300 transform
            ${isOpen 
              ? 'bg-gray-800 rotate-45' 
              : 'bg-red-600 hover:bg-red-700 hover:scale-110'
            }
          `}
        >
          {isOpen ? (
            <FaTimes className="text-white text-xl" />
          ) : (
            <FaPlus className="text-white text-xl" />
          )}
        </button>

        {/* Actions Menu */}
        <div className={`
          absolute bottom-full right-0 mb-4 transition-all duration-300 transform
          ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
        `}>
          <div className="bg-white rounded-2xl shadow-2xl p-4 w-72">
            {/* Primary Actions */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {actions.filter(action => action.primary).map((action, index) => (
                <Link
                  key={index}
                  to={action.path}
                  className="bg-red-50 hover:bg-red-100 p-3 rounded-xl transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex flex-col items-center text-center">
                    <span className="text-2xl mb-2">{action.icon}</span>
                    <h3 className="font-medium text-gray-900 text-sm">
                      {action.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {action.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Secondary Actions */}
            <div className="space-y-2">
              {actions.filter(action => !action.primary).map((action, index) => (
                <Link
                  key={index}
                  to={action.path}
                  className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-xl p-2 bg-red-50 rounded-lg">
                    {action.icon}
                  </span>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {action.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {action.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickActions 