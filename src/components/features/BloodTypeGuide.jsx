import { FaTint } from 'react-icons/fa'

const BloodTypeGuide = () => {
  const bloodTypes = [
    {
      type: 'A+',
      canGiveTo: ['A+', 'AB+'],
      canReceiveFrom: ['A+', 'A-', 'O+', 'O-'],
      percentage: '35.7%'
    },
    {
      type: 'A-',
      canGiveTo: ['A+', 'A-', 'AB+', 'AB-'],
      canReceiveFrom: ['A-', 'O-'],
      percentage: '6.3%'
    },
    {
      type: 'B+',
      canGiveTo: ['B+', 'AB+'],
      canReceiveFrom: ['B+', 'B-', 'O+', 'O-'],
      percentage: '8.5%'
    },
    {
      type: 'B-',
      canGiveTo: ['B+', 'B-', 'AB+', 'AB-'],
      canReceiveFrom: ['B-', 'O-'],
      percentage: '1.5%'
    },
    {
      type: 'AB+',
      canGiveTo: ['AB+'],
      canReceiveFrom: ['All Types'],
      percentage: '3.4%'
    },
    {
      type: 'AB-',
      canGiveTo: ['AB+', 'AB-'],
      canReceiveFrom: ['A-', 'B-', 'AB-', 'O-'],
      percentage: '0.6%'
    },
    {
      type: 'O+',
      canGiveTo: ['A+', 'B+', 'AB+', 'O+'],
      canReceiveFrom: ['O+', 'O-'],
      percentage: '37.4%'
    },
    {
      type: 'O-',
      canGiveTo: ['All Types'],
      canReceiveFrom: ['O-'],
      percentage: '6.6%'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Blood Type Compatibility Guide
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Understanding blood type compatibility is crucial for successful transfusions.
            Find out who you can help and who can help you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bloodTypes.map((blood, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <FaTint className="text-red-600 text-2xl" />
                    <span className="text-3xl font-bold text-gray-900">{blood.type}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-500">{blood.percentage}</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Can Give To:</h4>
                    <div className="flex flex-wrap gap-2">
                      {blood.canGiveTo.map((type, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm font-medium"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Can Receive From:</h4>
                    <div className="flex flex-wrap gap-2">
                      {blood.canReceiveFrom.map((type, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-1 w-full bg-gradient-to-r from-red-500 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          ))}
        </div>

        {/* Emergency Note */}
        <div className="mt-12 bg-red-50 border border-red-100 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <FaTint className="text-red-600 text-2xl" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-red-700 mb-2">
                Emergency Situations
              </h4>
              <p className="text-red-600">
                In emergency situations when the matching blood type is not available:
                <span className="font-semibold"> O-negative blood</span> can be given to patients of all blood types.
                It's known as the universal donor type.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BloodTypeGuide 