import { FaTint, FaHospital, FaUserMd, FaAmbulance, FaHeartbeat, FaMobile } from 'react-icons/fa'

const Features = () => {
  const features = [
    {
      icon: <FaTint />,
      title: 'Blood Donation',
      description: 'Easy and safe blood donation process with professional staff',
      color: 'bg-red-50 text-red-600'
    },
    {
      icon: <FaHospital />,
      title: 'Blood Bank Network',
      description: 'Connected with major hospitals and blood banks',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: <FaUserMd />,
      title: 'Expert Support',
      description: '24/7 medical professional support and guidance',
      color: 'bg-green-50 text-green-600'
    },
    {
      icon: <FaAmbulance />,
      title: 'Emergency Service',
      description: 'Quick response for emergency blood requirements',
      color: 'bg-yellow-50 text-yellow-600'
    },
    {
      icon: <FaHeartbeat />,
      title: 'Health Tracking',
      description: 'Regular health updates and donation tracking',
      color: 'bg-pink-50 text-pink-600'
    },
    {
      icon: <FaMobile />,
      title: 'Mobile App',
      description: 'Manage donations and requests on the go',
      color: 'bg-purple-50 text-purple-600'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Us
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive blood donation services with modern facilities
            and professional care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`
                ${feature.color} w-14 h-14 rounded-lg flex items-center justify-center
                text-2xl mb-6 transform transition-transform group-hover:scale-110
              `}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features 