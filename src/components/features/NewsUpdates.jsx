import { useState } from 'react'
import { FaNewspaper, FaCalendarAlt, FaArrowRight, FaBell, FaBullhorn, FaCalendar, FaEnvelope, FaPaperPlane } from 'react-icons/fa'

const NewsUpdates = () => {
  const [activeCategory, setActiveCategory] = useState('all')

  const news = [
    {
      title: "New Mobile Blood Donation Unit Launched",
      category: "announcement",
      date: "2024-03-01",
      summary: "We're excited to announce our new mobile donation unit that will serve remote areas.",
      image: "https://placehold.co/600x400"
    },
    {
      title: "Blood Shortage Alert: Type O Negative",
      category: "urgent",
      date: "2024-03-05",
      summary: "Urgent need for O negative blood donors. Current supplies are critically low.",
      image: "https://placehold.co/600x400"
    },
    {
      title: "World Blood Donor Day Celebration",
      category: "event",
      date: "2024-03-10",
      summary: "Join us for World Blood Donor Day celebrations with special recognition for regular donors.",
      image: "https://placehold.co/600x400"
    }
  ]

  const categories = {
    all: { label: 'All Updates', icon: <FaNewspaper /> },
    urgent: { label: 'Urgent Needs', icon: <FaBell /> },
    announcement: { label: 'Announcements', icon: <FaBullhorn /> },
    event: { label: 'Events', icon: <FaCalendar /> }
  }

  const filteredNews = activeCategory === 'all' 
    ? news 
    : news.filter(item => item.category === activeCategory)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Latest Updates
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay informed about blood donation needs and events
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(categories).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors flex items-center space-x-2
                ${activeCategory === key 
                  ? 'bg-red-600 text-white' 
                  : 'bg-red-50 text-red-600 hover:bg-red-100'
                }`}
            >
              <span>{categories[key].icon}</span>
              <span>{categories[key].label}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((item, index) => (
            <div key={index} className="group bg-white rounded-xl shadow-lg overflow-hidden border border-red-50 hover:border-red-100">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                {item.category === 'urgent' && (
                  <span className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                    Urgent
                  </span>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <FaCalendarAlt className="mr-2" />
                  {new Date(item.date).toLocaleDateString()}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {item.summary}
                </p>
                
                <button className="text-red-600 hover:text-red-700 font-medium inline-flex items-center group">
                  Read More 
                  <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8">
          <div className="max-w-2xl mx-auto text-center">
            <FaEnvelope className="mx-auto text-3xl text-red-500 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter for blood donation updates, upcoming camps, and urgent requirements.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-red-200 focus:ring-2 focus:ring-red-500 focus:border-red-300"
              />
              <button
                type="submit"
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
              >
                <FaPaperPlane />
                <span>Subscribe</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsUpdates 