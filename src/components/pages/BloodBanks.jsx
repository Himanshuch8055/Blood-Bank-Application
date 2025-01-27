import { useState } from 'react'
import { 
  FaSearch, 
  FaHospital, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaClock,
  FaFilter,
  FaTint,
  FaDirections,
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaArrowRight,
  FaRegClock,
  FaRegCalendarAlt
} from 'react-icons/fa'
import { MdLocationOn, MdBloodtype, MdEmergency } from 'react-icons/md'
import { BiCurrentLocation } from 'react-icons/bi'

const BloodBanks = () => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    bloodType: '',
    distance: '10',
    openNow: false,
    emergency: false
  })
  const [showFilters, setShowFilters] = useState(false)

  const bloodBanks = [
    {
      id: 1,
      name: "Central Blood Bank",
      type: "Hospital Blood Bank",
      location: "New York, NY",
      address: "123 Medical Center Blvd",
      distance: "2.5",
      phone: "+1 (555) 123-4567",
      email: "info@centralbloodbank.com",
      hours: {
        weekday: "7:00 AM - 9:00 PM",
        weekend: "8:00 AM - 6:00 PM"
      },
      status: "Open",
      emergency: true,
      rating: 4.8,
      reviews: 120,
      bloodAvailability: {
        "A+": "High",
        "A-": "Medium",
        "B+": "Low",
        "B-": "Critical",
        "O+": "High",
        "O-": "Medium",
        "AB+": "High",
        "AB-": "Low"
      },
      services: ["Blood Donation", "Plasma Donation", "Platelet Donation", "Emergency Services"],
      verified: true
    },
    {
      id: 2,
      name: "City Medical Center",
      type: "Medical Center",
      location: "Los Angeles, CA",
      address: "456 Healthcare Ave",
      distance: "5.0",
      phone: "+1 (555) 987-6543",
      email: "contact@citymedical.com",
      hours: {
        weekday: "8:00 AM - 8:00 PM",
        weekend: "9:00 AM - 5:00 PM"
      },
      status: "Open",
      emergency: true,
      rating: 4.5,
      reviews: 85,
      bloodAvailability: {
        "A+": "Medium",
        "A-": "Low",
        "B+": "High",
        "B-": "Medium",
        "O+": "Critical",
        "O-": "Low",
        "AB+": "Medium",
        "AB-": "High"
      },
      services: ["Blood Donation", "Emergency Services"],
      verified: true
    },
    // Add more blood banks...
  ]

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

  const handleSearch = (e) => {
    e.preventDefault()
    // Implement search logic
  }

  const getAvailabilityColor = (level) => {
    const colors = {
      High: "bg-green-100 text-green-800",
      Medium: "bg-yellow-100 text-yellow-800",
      Low: "bg-orange-100 text-orange-800",
      Critical: "bg-red-100 text-red-800"
    }
    return colors[level] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-red-600 mb-4">
            Blood Banks Directory
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find blood banks and donation centers near you. Check real-time blood availability and emergency services.
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdLocationOn className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Enter location"
                  value={searchParams.location}
                  onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-red-500"
                  onClick={() => {/* Implement get current location */}}
                >
                  <BiCurrentLocation className="h-5 w-5" />
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdBloodtype className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={searchParams.bloodType}
                  onChange={(e) => setSearchParams({...searchParams, bloodType: e.target.value})}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">All Blood Types</option>
                  {bloodTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={searchParams.distance}
                  onChange={(e) => setSearchParams({...searchParams, distance: e.target.value})}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                >
                  <option value="5">Within 5 km</option>
                  <option value="10">Within 10 km</option>
                  <option value="20">Within 20 km</option>
                  <option value="50">Within 50 km</option>
                </select>
              </div>

              <button
                type="submit"
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
              >
                <FaSearch />
                <span>Search</span>
              </button>
            </div>

            {/* Advanced Filters */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600"
              >
                <FaFilter />
                <span>Advanced Filters</span>
              </button>

              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={searchParams.openNow}
                    onChange={(e) => setSearchParams({...searchParams, openNow: e.target.checked})}
                    className="form-checkbox h-4 w-4 text-red-600 rounded focus:ring-red-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Open Now</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={searchParams.emergency}
                    onChange={(e) => setSearchParams({...searchParams, emergency: e.target.checked})}
                    className="form-checkbox h-4 w-4 text-red-600 rounded focus:ring-red-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Emergency Services</span>
                </label>
              </div>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                {/* Add more filters here */}
              </div>
            )}
          </form>
        </div>

        {/* Results Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {bloodBanks.map((bank) => (
            <div key={bank.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-red-100 p-2 rounded-lg">
                      <FaHospital className="text-red-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        {bank.name}
                        {bank.verified && (
                          <FaCheckCircle className="text-blue-500 ml-2" title="Verified Center" />
                        )}
                      </h3>
                      <p className="text-sm text-gray-500">{bank.type}</p>
                    </div>
                  </div>
                  <div className={`
                    px-3 py-1 rounded-full text-sm font-medium
                    ${bank.status === 'Open' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                    }
                  `}>
                    {bank.status}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  {Object.entries(bank.bloodAvailability).map(([type, level]) => (
                    <div key={type} className={`px-3 py-2 rounded-lg ${getAvailabilityColor(level)}`}>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{type}</span>
                        <span className="text-sm">{level}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <FaMapMarkerAlt className="text-red-500" />
                    <span>{bank.address} ({bank.distance} km)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaRegClock className="text-red-500" />
                    <span>
                      Weekdays: {bank.hours.weekday} • Weekend: {bank.hours.weekend}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaPhoneAlt className="text-red-500" />
                    <span>{bank.phone}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {bank.services.map((service, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <button className="flex-1 mr-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2">
                    <FaPhoneAlt />
                    <span>Contact</span>
                  </button>
                  <button className="flex-1 ml-2 border border-red-600 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center space-x-2">
                    <FaDirections />
                    <span>Directions</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {bloodBanks.length === 0 && (
          <div className="text-center py-12">
            <FaHospital className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No blood banks found</h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or expanding your search radius.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default BloodBanks 