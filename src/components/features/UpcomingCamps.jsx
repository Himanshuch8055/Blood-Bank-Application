import { useState } from 'react'
import { FaCalendar, FaMapMarkerAlt, FaClock, FaUsers } from 'react-icons/fa'

const UpcomingCamps = () => {
  const [selectedCity, setSelectedCity] = useState('all')

  const camps = [
    {
      title: "Community Blood Drive",
      date: "2024-03-15",
      time: "9:00 AM - 5:00 PM",
      location: "Central Community Center",
      city: "New York",
      address: "123 Main St, New York, NY",
      slots: 50,
      registered: 32
    },
    {
      title: "Corporate Donation Camp",
      date: "2024-03-20",
      time: "10:00 AM - 4:00 PM",
      location: "Tech Park",
      city: "Boston",
      address: "456 Innovation Drive, Boston, MA",
      slots: 75,
      registered: 45
    },
    {
      title: "University Blood Drive",
      date: "2024-03-25",
      time: "8:00 AM - 6:00 PM",
      location: "State University Campus",
      city: "Chicago",
      address: "789 College Ave, Chicago, IL",
      slots: 100,
      registered: 68
    }
  ]

  const filteredCamps = selectedCity === 'all' 
    ? camps 
    : camps.filter(camp => camp.city === selectedCity)

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Upcoming Blood Donation Camps
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find and register for blood donation camps in your area
          </p>
        </div>

        <div className="mb-8">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="px-4 py-2 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-300"
          >
            <option value="all">All Cities</option>
            {[...new Set(camps.map(camp => camp.city))].map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCamps.map((camp, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border border-red-50 hover:border-red-100 transition-all duration-300">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {camp.title}
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <FaCalendar className="w-5 h-5 mr-3 text-red-500" />
                    <span>{new Date(camp.date).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <FaClock className="w-5 h-5 mr-3 text-red-500" />
                    <span>{camp.time}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <FaMapMarkerAlt className="w-5 h-5 mr-3 text-red-500" />
                    <span>{camp.location}, {camp.city}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <FaUsers className="w-5 h-5 mr-3 text-red-500" />
                    <span>{camp.registered} / {camp.slots} registered</span>
                  </div>
                </div>

                <div className="mt-6">
                  <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors">
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default UpcomingCamps 