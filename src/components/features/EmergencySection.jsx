import { FaAmbulance, FaPhoneAlt, FaMapMarkerAlt, FaTint } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const EmergencySection = () => {
  const bloodAvailability = [
    { type: 'A+', status: 'High', color: 'bg-red-50 text-red-600' },
    { type: 'A-', status: 'Low', color: 'bg-red-200 text-red-700' },
    { type: 'B+', status: 'Medium', color: 'bg-red-100 text-red-600' },
    { type: 'B-', status: 'Low', color: 'bg-red-200 text-red-700' },
    { type: 'O+', status: 'Medium', color: 'bg-red-100 text-red-600' },
    { type: 'O-', status: 'Critical', color: 'bg-red-300 text-red-800' },
    { type: 'AB+', status: 'High', color: 'bg-red-50 text-red-600' },
    { type: 'AB-', status: 'Medium', color: 'bg-red-100 text-red-600' }
  ]

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Emergency Contact */}
            <div className="flex items-center space-x-4 p-4 bg-red-50 rounded-xl">
              <div className="bg-red-100 p-3 rounded-lg">
                <FaPhoneAlt className="text-2xl text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Emergency Hotline</h3>
                <p className="text-red-600 font-bold">1-800-RED-CROSS</p>
                <p className="text-sm text-gray-600">Available 24/7</p>
              </div>
            </div>

            {/* Quick Request */}
            <div className="flex items-center space-x-4 p-4 bg-red-50 rounded-xl">
              <div className="bg-red-100 p-3 rounded-lg">
                <FaAmbulance className="text-2xl text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Need Blood Urgently?</h3>
                <Link 
                  to="/request-blood"
                  className="text-red-600 hover:text-red-700 font-medium text-sm inline-flex items-center"
                >
                  Request Now →
                </Link>
              </div>
            </div>

            {/* Nearest Center */}
            <div className="flex items-center space-x-4 p-4 bg-red-50 rounded-xl">
              <div className="bg-red-100 p-3 rounded-lg">
                <FaMapMarkerAlt className="text-2xl text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Find Nearest Center</h3>
                <Link 
                  to="/locations"
                  className="text-red-600 hover:text-red-700 font-medium text-sm inline-flex items-center"
                >
                  Locate Centers →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Blood Availability Status */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <FaTint className="text-red-600 mr-2" />
            Current Blood Availability Status
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {bloodAvailability.map((blood, index) => (
              <div 
                key={index}
                className={`${blood.color} rounded-lg p-4 text-center`}
              >
                <div className="text-2xl font-bold mb-1">{blood.type}</div>
                <div className="text-sm font-medium">{blood.status}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-50 mr-2"></div>
              High Availability
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-100 mr-2"></div>
              Medium Availability
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-200 mr-2"></div>
              Low/Critical
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EmergencySection 