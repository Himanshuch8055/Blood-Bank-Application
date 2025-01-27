import { 
  FaUserCheck, 
  FaVial, 
  FaTint, 
  FaHeart, 
  FaWeight, 
  FaCalendarAlt, 
  FaStethoscope,
  FaUserClock,
  FaBed,
  FaUtensils,
  FaWater,
  FaHamburger,
  FaIdCard,
  FaList,
  FaHistory,
  FaAddressCard,
  FaChair,
  FaCoffee,
  FaDumbbell,
  FaGlassWhiskey
} from 'react-icons/fa'

const DonationProcess = () => {
  const steps = [
    {
      icon: <FaUserCheck />,
      title: "Registration & Screening",
      description: "Quick registration followed by basic health screening",
      duration: "10-15 minutes"
    },
    {
      icon: <FaVial />,
      title: "Medical Check",
      description: "Brief medical examination and hemoglobin test",
      duration: "10 minutes"
    },
    {
      icon: <FaTint />,
      title: "Blood Donation",
      description: "Safe and comfortable donation process",
      duration: "8-10 minutes"
    },
    {
      icon: <FaHeart />,
      title: "Rest & Refresh",
      description: "Light refreshments and short rest",
      duration: "10-15 minutes"
    }
  ]

  const eligibilityCriteria = [
    { label: "Age", value: "18-65 years", icon: <FaUserClock /> },
    { label: "Weight", value: "≥ 50 kg", icon: <FaWeight /> },
    { label: "Hemoglobin", value: "≥ 12.5 g/dL", icon: <FaStethoscope /> },
    { label: "Last Donation", value: "≥ 3 months ago", icon: <FaCalendarAlt /> }
  ]

  const restrictions = [
    "Recent surgery or major illness",
    "Pregnancy or recent childbirth",
    "Certain medications",
    "Recent tattoos or piercings"
  ]

  const preDonationTips = {
    before: [
      { text: "Get adequate sleep", icon: <FaBed /> },
      { text: "Eat a healthy meal", icon: <FaUtensils /> },
      { text: "Drink plenty of water", icon: <FaWater /> },
      { text: "Avoid fatty foods", icon: <FaHamburger /> }
    ],
    bring: [
      { text: "Valid ID", icon: <FaIdCard /> },
      { text: "List of medications", icon: <FaList /> },
      { text: "Medical history", icon: <FaHistory /> },
      { text: "Donor card (if any)", icon: <FaAddressCard /> }
    ],
    after: [
      { text: "Rest for 10-15 minutes", icon: <FaChair /> },
      { text: "Have refreshments", icon: <FaCoffee /> },
      { text: "Avoid heavy lifting", icon: <FaDumbbell /> },
      { text: "Stay hydrated", icon: <FaGlassWhiskey /> }
    ]
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Simple Donation Process
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Donating blood is a simple and safe process that takes less than an hour
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-xl shadow-lg p-6 relative z-10">
                <div className="text-red-500 text-3xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 mb-4">{step.description}</p>
                <span className="text-sm text-red-500 font-medium">
                  {step.duration}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 w-full h-0.5 bg-red-200 transform translate-x-1/2">
                  <div className="absolute right-0 w-3 h-3 bg-red-500 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Eligibility Criteria */}
          <div className="bg-red-50 rounded-xl p-6 hover:bg-red-100 transition-colors duration-300">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Basic Eligibility Criteria
            </h3>
            <div className="space-y-4">
              {eligibilityCriteria.map((criteria, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-red-500 text-xl">
                      {criteria.icon}
                    </div>
                    <span className="text-gray-600">{criteria.label}</span>
                  </div>
                  <span className="font-semibold text-gray-900">{criteria.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Restrictions */}
          <div className="bg-red-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Temporary Restrictions
            </h3>
            <div className="space-y-3">
              {restrictions.map((restriction, index) => (
                <div 
                  key={index}
                  className="flex items-start bg-white p-4 rounded-lg shadow-sm"
                >
                  <span className="text-red-500 mr-3">•</span>
                  <span className="text-gray-600">{restriction}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pre-donation Tips */}
        <div className="mt-12 bg-red-50 rounded-xl p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Pre-donation Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-red-100">
              <h4 className="font-semibold text-gray-900 mb-4">Before Donation</h4>
              <ul className="text-gray-600 space-y-3">
                {preDonationTips.before.map((tip, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <span className="text-red-500">{tip.icon}</span>
                    <span>{tip.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-red-100">
              <h4 className="font-semibold text-gray-900 mb-4">Bring with You</h4>
              <ul className="text-gray-600 space-y-3">
                {preDonationTips.bring.map((tip, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <span className="text-red-500">{tip.icon}</span>
                    <span>{tip.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-red-100">
              <h4 className="font-semibold text-gray-900 mb-4">After Donation</h4>
              <ul className="text-gray-600 space-y-3">
                {preDonationTips.after.map((tip, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <span className="text-red-500">{tip.icon}</span>
                    <span>{tip.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DonationProcess 