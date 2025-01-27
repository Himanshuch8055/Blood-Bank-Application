import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

const HospitalDashboard = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')

  const [bloodInventory, setBloodInventory] = useState({
    'A+': { available: 15, reserved: 2 },
    'A-': { available: 8, reserved: 1 },
    'B+': { available: 12, reserved: 3 },
    'B-': { available: 6, reserved: 0 },
    'AB+': { available: 4, reserved: 1 },
    'AB-': { available: 2, reserved: 0 },
    'O+': { available: 20, reserved: 5 },
    'O-': { available: 10, reserved: 2 }
  })

  const [recentRequests] = useState([
    {
      id: 1,
      date: '2024-02-20',
      bloodType: 'O+',
      units: 2,
      status: 'Pending',
      urgency: 'High'
    },
    // Add more requests as needed
  ])

  const [recentDonations] = useState([
    {
      id: 1,
      date: '2024-02-19',
      donorName: 'John Doe',
      bloodType: 'A+',
      units: 1,
      status: 'Completed'
    },
    // Add more donations as needed
  ])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Hospital Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage your blood bank and donation activities</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Blood Units</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">
              {Object.values(bloodInventory).reduce((acc, curr) => acc + curr.available, 0)}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-sm font-medium text-gray-500">Pending Requests</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">
              {recentRequests.filter(req => req.status === 'Pending').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-sm font-medium text-gray-500">Today's Donations</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">
              {recentDonations.filter(don => don.date === new Date().toISOString().split('T')[0]).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-sm font-medium text-gray-500">Critical Levels</h3>
            <p className="mt-2 text-3xl font-semibold text-red-600">
              {Object.entries(bloodInventory).filter(([_, data]) => data.available < 5).length}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {['overview', 'inventory', 'requests', 'donations'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentRequests.slice(0, 3).map(request => (
                  <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Blood Request</p>
                      <p className="text-sm text-gray-600">{request.bloodType} - {request.units} units</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      request.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {request.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Blood Inventory</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(bloodInventory).map(([type, data]) => (
                  <div key={type} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold text-red-600">{type}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        data.available > 10
                          ? 'bg-green-100 text-green-800'
                          : data.available > 5
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {data.available} units
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>Reserved: {data.reserved}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              <span>🔄</span>
              <span>Update Inventory</span>
            </button>
            <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50">
              <span>📋</span>
              <span>New Request</span>
            </button>
            <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50">
              <span>📊</span>
              <span>Generate Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HospitalDashboard 