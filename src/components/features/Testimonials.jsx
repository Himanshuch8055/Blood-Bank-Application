import { useState } from 'react'
import { FaQuoteLeft, FaHeart, FaShare, FaComment, FaCheckCircle } from 'react-icons/fa'

const Testimonials = () => {
  const testimonials = [
    {
      name: 'John Doe',
      username: 'Regular Donor',
      role: '10+ Donations',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      quote: 'Just completed my 10th donation! The process was smooth as always. Feels great to know I\'m helping save lives. #BloodDonation #SaveLives 🩸',
      timestamp: '2 hours ago',
      likes: 234,
      shares: 56,
      comments: 12,
      verified: true
    },
    {
      name: 'Sarah Smith',
      username: 'Blood Recipient',
      role: 'Life Saved',
      image: 'https://randomuser.me/api/portraits/women/10.jpg',
      quote: 'Forever grateful to the donors who saved my life during emergency surgery. The quick response made all the difference. ❤️ #ThankYouDonors',
      timestamp: '1 day ago',
      likes: 542,
      shares: 128,
      comments: 45,
      verified: true
    },
    {
      name: 'Dr. Michael Chen',
      username: 'Hospital Partner',
      role: 'City General Hospital',
      image: 'https://randomuser.me/api/portraits/men/20.jpg',
      quote: 'Our partnership has revolutionized how we handle emergencies. Real-time inventory tracking is a game-changer! 🏥 #Healthcare #Innovation',
      timestamp: '3 days ago',
      likes: 876,
      shares: 234,
      comments: 67,
      verified: true
    }
  ]

  const [likedTweets, setLikedTweets] = useState(new Set())

  const handleLike = (index) => {
    setLikedTweets(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-red-600 text-sm font-semibold tracking-wide uppercase">
            Community Stories
          </span>
          <h2 className="mt-2 text-3xl font-bold text-gray-900 mb-4">
            What People Are Saying
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real experiences shared by our amazing community of donors and recipients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1"
            >
              {/* Card Header */}
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-red-100"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {testimonial.name}
                      </p>
                      {testimonial.verified && (
                        <FaCheckCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500 truncate">{testimonial.username}</p>
                    <p className="text-xs text-red-500 font-medium">{testimonial.role}</p>
                  </div>
                  <FaQuoteLeft className="text-red-400 text-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Content */}
                <div className="mt-4">
                  <p className="text-gray-800 text-base leading-relaxed">
                    {testimonial.quote}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    {testimonial.timestamp}
                  </p>
                </div>

                {/* Engagement Metrics */}
                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                  <button
                    onClick={() => handleLike(index)}
                    className={`flex items-center space-x-2 group ${
                      likedTweets.has(index) ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                    }`}
                  >
                    <FaHeart className={`text-lg transition-transform group-hover:scale-125 ${
                      likedTweets.has(index) ? 'fill-current' : 'stroke-current'
                    }`} />
                    <span className="text-sm">
                      {likedTweets.has(index) ? testimonial.likes + 1 : testimonial.likes}
                    </span>
                  </button>

                  <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 group">
                    <FaComment className="text-lg transition-transform group-hover:scale-125" />
                    <span className="text-sm">{testimonial.comments}</span>
                  </button>

                  <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 group">
                    <FaShare className="text-lg transition-transform group-hover:scale-125" />
                    <span className="text-sm">{testimonial.shares}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Share Your Story CTA */}
        <div className="mt-12 text-center">
          <a
            href="#share"
            className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all duration-300 space-x-2 transform hover:scale-105"
          >
            <FaQuoteLeft className="text-lg" />
            <span>Share Your Story</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Testimonials 