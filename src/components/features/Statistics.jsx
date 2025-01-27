import { useState, useEffect } from 'react'
import { FaHeartbeat, FaHospital, FaUsers, FaClock, FaTint, FaAward } from 'react-icons/fa'
import CountUp from 'react-countup'

const Statistics = () => {
  const [isVisible, setIsVisible] = useState(false)

  const stats = [
    {
      icon: <FaUsers className="w-8 h-8" />,
      value: 1000,
      label: 'Active Donors',
      suffix: '+',
      duration: 2.5,
      color: 'bg-red-50 text-red-600'
    },
    {
      icon: <FaHeartbeat className="w-8 h-8" />,
      value: 500,
      label: 'Lives Saved',
      suffix: '+',
      duration: 2,
      color: 'bg-pink-50 text-pink-600'
    },
    {
      icon: <FaHospital className="w-8 h-8" />,
      value: 50,
      label: 'Partner Hospitals',
      suffix: '+',
      duration: 1.5,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: <FaClock className="w-8 h-8" />,
      value: 24,
      label: 'Hour Support',
      suffix: '/7',
      duration: 1,
      color: 'bg-green-50 text-green-600'
    }
  ]

  const achievements = [
    {
      icon: <FaTint />,
      title: 'Certified Blood Bank',
      description: 'ISO 9001:2015 Certified'
    },
    {
      icon: <FaAward />,
      title: 'Best Service Award',
      description: '2023 Healthcare Excellence'
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('stats-section')
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  return (
    <section 
      id="stats-section"
      className="py-16 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Every donation counts towards saving lives. See how we're making a difference together.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl transform transition-transform group-hover:scale-105 opacity-0 group-hover:opacity-100 -z-10"></div>
              <div className={`
                bg-white rounded-2xl p-6 transform transition-all duration-300
                group-hover:translate-x-2 group-hover:-translate-y-2
                hover:shadow-xl
              `}>
                <div className={`${stat.color} p-3 rounded-lg inline-block mb-4`}>
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {isVisible && (
                    <CountUp
                      end={stat.value}
                      suffix={stat.suffix}
                      duration={stat.duration}
                      separator=","
                    />
                  )}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className="flex items-center space-x-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-xl">
                {achievement.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                <p className="text-gray-600">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Statistics 