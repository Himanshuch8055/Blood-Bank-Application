import { useState } from 'react'
import { 
  FaSearch, 
  FaTint, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaUserAlt,
  FaFilter,
  FaCalendarAlt,
  FaHistory,
  FaCheckCircle,
  FaHeart,
  FaStar
} from 'react-icons/fa'
import { MdBloodtype, MdLocationOn } from 'react-icons/md'

const FindDonor = () => {
  const [searchParams, setSearchParams] = useState({
    bloodType: '',
    location: '',
    distance: '10',
    availability: 'all'
  })
  const [showFilters, setShowFilters] = useState(false)

  const donors = [
    {
      id: 1,
      name: "John Doe",
      bloodType: "O+",
      location: "New York, NY",
      distance: "2.5",
      lastDonation: "2024-01-15",
      availability: "Available",
      donations: 12,
      rating: 4.8,
      verified: true,
      phone: "+1 (555) 123-4567",
      email: "john.doe@example.com"
    },
    {
      id: 2,
      name: "Jane Smith",
      bloodType: "A+",
      location: "Los Angeles, CA",
      distance: "5.0",
      lastDonation: "2024-01-10",
      availability: "Available",
      donations: 10,
      rating: 4.5,
      verified: false,
      phone: "+1 (555) 987-6543",
      email: "jane.smith@example.com"
    },
    {
      id: 3,
      name: "Alice Johnson",
      bloodType: "B-",
      location: "Chicago, IL",
      distance: "15.0",
      lastDonation: "2024-01-05",
      availability: "Unavailable",
      donations: 8,
      rating: 4.2,
      verified: true,
    },
    {
      id: 4,
      name: "Bob Brown",
      bloodType: "AB+",
      location: "Houston, TX",
      distance: "20.0",
      lastDonation: "2024-01-20",
      availability: "Available",
      donations: 15,
      rating: 4.9,
      verified: false,
    }
  ]

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

  const handleSearch = (e) => {
    e.preventDefault()
    // Implement search logic
  }

  const filterDonors = () => {
    return donors.filter(donor => {
      if (searchParams.bloodType && donor.bloodType !== searchParams.bloodType) return false
      if (searchParams.location && !donor.location.toLowerCase().includes(searchParams.location.toLowerCase())) return false
      if (searchParams.availability !== 'all' && donor.availability !== searchParams.availability) return false
      if (parseFloat(donor.distance) > parseFloat(searchParams.distance)) return false
      return true
    })
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-red-600 mb-4">
            Find Blood Donors
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with verified blood donors in your area. Every donation makes a difference.
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                  <MdLocationOn className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Enter location"
                  value={searchParams.location}
                  onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                />
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
                <span>Search Donors</span>
              </button>
            </div>

            {/* Advanced Filters */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600"
              >
                <FaFilter />
                <span>Advanced Filters</span>
              </button>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <select
                  value={searchParams.availability}
                  onChange={(e) => setSearchParams({...searchParams, availability: e.target.value})}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                >
                  <option value="all">All Availability</option>
                  <option value="Available">Available Now</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
                {/* Add more filters as needed */}
              </div>
            )}
          </form>
        </div>

        {/* Results Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterDonors().map((donor) => (
            <div key={donor.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-red-100 p-2 rounded-lg">
                      <FaUserAlt className="text-red-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        {donor.name}
                        {donor.verified && (
                          <FaCheckCircle className="text-blue-500 ml-2" title="Verified Donor" />
                        )}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <FaStar className="text-yellow-400" />
                        <span>{donor.rating} Rating</span>
                        <span>•</span>
                        <span>{donor.donations} donations</span>
                      </div>
                    </div>
                  </div>
                  <div className={`
                    px-3 py-1 rounded-full text-sm font-medium
                    ${donor.availability === 'Available' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                    }
                  `}>
                    {donor.availability}
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <FaTint className="text-red-500" />
                    <span>Blood Type: <strong>{donor.bloodType}</strong></span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaMapMarkerAlt className="text-red-500" />
                    <span>{donor.location} ({donor.distance} km away)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaCalendarAlt className="text-red-500" />
                    <span>Last Donation: {new Date(donor.lastDonation).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <button className="flex-1 mr-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2">
                    <FaPhoneAlt />
                    <span>Contact</span>
                  </button>
                  <button className="flex-1 ml-2 border border-red-600 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center space-x-2">
                    <FaHeart />
                    <span>Save</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filterDonors().length === 0 && (
          <div className="text-center py-12">
            <FaSearch className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No donors found</h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or expanding your search radius.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default FindDonor 