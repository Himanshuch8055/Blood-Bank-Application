import { useState } from 'react'
import { Link } from 'react-router-dom'

const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

const BloodRequestDashboard = () => {
  const [activeRequests] = useState([
    {
      id: 1,
      patientName: 'Sarah Johnson',
      bloodType: 'B+',
      units: 2,
      hospital: 'City General Hospital',
      urgency: 'High',
      status: 'Active',
      matchedDonors: 3,
      createdAt: '2024-02-20'
    }
  ])

  const [requestHistory] = useState([
    {
      id: 2,
      patientName: 'John Smith',
      bloodType: 'O+',
      units: 1,
      hospital: 'Memorial Hospital',
      status: 'Completed',
      donorName: 'Mike Wilson',
      completedAt: '2024-02-15'
    }
  ])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-lg shadow-lg p-6 text-white mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Blood Request Dashboard</h1>
            <Link
              to="/new-request"
              className="bg-white text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors duration-300"
            >
              New Request
            </Link>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-sm opacity-80">Active Requests</p>
              <p className="text-2xl font-bold">{activeRequests.length}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-sm opacity-80">Total Requests</p>
              <p className="text-2xl font-bold">{activeRequests.length + requestHistory.length}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-sm opacity-80">Matched Donors</p>
              <p className="text-2xl font-bold">3</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-sm opacity-80">Success Rate</p>
              <p className="text-2xl font-bold">85%</p>
            </div>
          </div>
        </div>

        {/* Active Requests */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Requests</h2>
          <div className="space-y-4">
            {activeRequests.map(request => (
              <div 
                key={request.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium text-gray-900">{request.patientName}</h3>
                    <p className="text-sm text-gray-600">{request.hospital}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                      {request.bloodType}
                    </span>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                      {request.urgency}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Units Required</p>
                    <p className="font-medium text-gray-900">{request.units}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Matched Donors</p>
                    <p className="font-medium text-gray-900">{request.matchedDonors}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Created</p>
                    <p className="font-medium text-gray-900">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="font-medium text-green-600">{request.status}</p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-300">
                    View Matched Donors
                  </button>
                  <button className="flex-1 border border-red-600 text-red-600 px-4 py-2 rounded-md hover:bg-red-50 transition-colors duration-300">
                    Update Request
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Request History */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Request History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Blood Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Units
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hospital
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Completed
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requestHistory.map(request => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {request.patientName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        {request.bloodType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.units}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.hospital}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(request.completedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BloodRequestDashboard 