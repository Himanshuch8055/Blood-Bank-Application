import { useState } from 'react'
import { 
  FaAmbulance, 
  FaHospital, 
  FaPhoneVolume, 
  FaMapMarkerAlt,
  FaSearch,
  FaClock
} from 'react-icons/fa'

const EmergencyLocator = () => {
  const [selectedCity, setSelectedCity] = useState('all')

  const bloodBanks = [
    {
      name: "Central Blood Bank",
      address: "123 Main St, New York, NY",
      phone: "+1 (555) 123-4567",
      hours: "24/7",
      city: "New York",
      distance: "0.5 miles",
      status: "Open",
      emergency: true
    },
    {
      name: "City Hospital Blood Center",
      address: "456 Park Ave, New York, NY",
      phone: "+1 (555) 234-5678",
      hours: "8 AM - 8 PM",
      city: "New York",
      distance: "1.2 miles",
      status: "Open",
      emergency: true
    },
    {
      name: "Community Blood Center",
      address: "789 Oak St, Boston, MA",
      phone: "+1 (555) 345-6789",
      hours: "9 AM - 5 PM",
      city: "Boston",
      distance: "0.8 miles",
      status: "Closed",
      emergency: false
    }
  ]

  const cities = [...new Set(bloodBanks.map(bank => bank.city))]
  const filteredBanks = selectedCity === 'all' 
    ? bloodBanks 
    : bloodBanks.filter(bank => bank.city === selectedCity)

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Emergency Contact Section */}
        <div className="bg-red-600 text-white rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-red-500 rounded-lg">
                <FaPhoneVolume className="text-2xl" />
              </div>
              <div>
                <h3 className="font-semibold">Emergency Hotline</h3>
                <p className="text-xl font-bold">1-800-RED-CROSS</p>
                <p className="text-sm opacity-75">Available 24/7</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-red-500 rounded-lg">
                <FaAmbulance className="text-2xl" />
              </div>
              <div>
                <h3 className="font-semibold">Ambulance Service</h3>
                <p className="text-xl font-bold">911</p>
                <p className="text-sm opacity-75">For medical emergencies</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-red-500 rounded-lg">
                <FaHospital className="text-2xl" />
              </div>
              <div>
                <h3 className="font-semibold">Blood Bank Network</h3>
                <p className="text-xl font-bold">1-888-BLOOD-NOW</p>
                <p className="text-sm opacity-75">Find blood banks</p>
              </div>
            </div>
          </div>
        </div>

        {/* Blood Bank Locator */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
              Nearby Blood Banks
            </h2>
            <div className="flex items-center space-x-4">
              <FaSearch className="text-gray-400" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-300"
              >
                <option value="all">All Cities</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBanks.map((bank, index) => (
              <div 
                key={index}
                className={`
                  rounded-xl shadow-lg overflow-hidden
                  ${bank.emergency ? 'border-2 border-red-500' : 'border border-gray-200'}
                `}
              >
                <div className={`p-4 ${bank.emergency ? 'bg-red-50' : 'bg-white'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {bank.name}
                    </h3>
                    <span className={`
                      px-2 py-1 rounded-full text-xs font-medium
                      ${bank.status === 'Open' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                      }
                    `}>
                      {bank.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="w-4 h-4 mr-2 text-red-500" />
                      {bank.address}
                    </div>
                    <div className="flex items-center">
                      <FaPhoneVolume className="w-4 h-4 mr-2 text-red-500" />
                      {bank.phone}
                    </div>
                    <div className="flex items-center">
                      <FaClock className="w-4 h-4 mr-2 text-red-500" />
                      {bank.hours}
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {bank.distance} away
                    </span>
                    <a
                      href={`tel:${bank.phone}`}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                    >
                      Call Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmergencyLocator
