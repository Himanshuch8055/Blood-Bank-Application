import { useState } from 'react'
import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const BloodManagementDashboard = () => {
  const [dateRange, setDateRange] = useState('week')
  const [selectedRegion, setSelectedRegion] = useState('all')

  const performanceData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Donations',
        data: [12, 19, 15, 17, 14, 23, 25],
        borderColor: 'rgb(220, 38, 38)',
        backgroundColor: 'rgba(220, 38, 38, 0.5)',
      }
    ]
  }

  const inventoryData = {
    labels: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    datasets: [
      {
        label: 'Available Units',
        data: [65, 30, 45, 25, 15, 10, 85, 40],
        backgroundColor: 'rgba(220, 38, 38, 0.5)',
      }
    ]
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Blood Management Dashboard</h1>
          <p className="mt-2 text-gray-600">Comprehensive blood donation and inventory management</p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>

          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
          >
            <option value="all">All Regions</option>
            <option value="north">North Region</option>
            <option value="south">South Region</option>
            <option value="east">East Region</option>
            <option value="west">West Region</option>
          </select>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <QuickStat
            title="Total Donations"
            value="1,234"
            change="+12.5%"
            trend="up"
          />
          <QuickStat
            title="Active Donors"
            value="856"
            change="+5.2%"
            trend="up"
          />
          <QuickStat
            title="Success Rate"
            value="94.8%"
            change="-0.5%"
            trend="down"
          />
          <QuickStat
            title="Inventory Level"
            value="78%"
            change="+3.2%"
            trend="up"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Donation Performance</h3>
            <Line data={performanceData} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Blood Type Inventory</h3>
            <Bar data={inventoryData} />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Donor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Blood Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentActivity.map((activity) => (
                  <tr key={activity.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {activity.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {activity.donor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        {activity.bloodType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {activity.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        activity.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {activity.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300">
            <span>📊</span>
            <span>Generate Reports</span>
          </button>
          <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-300">
            <span>📧</span>
            <span>Send Notifications</span>
          </button>
          <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-300">
            <span>⚙️</span>
            <span>System Settings</span>
          </button>
        </div>
      </div>
    </div>
  )
}

const QuickStat = ({ title, value, change, trend }) => (
  <div className="bg-white rounded-lg shadow-lg p-6">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <div className="mt-2 flex items-baseline">
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
      <p className={`ml-2 flex items-baseline text-sm font-semibold ${
        trend === 'up' ? 'text-green-600' : 'text-red-600'
      }`}>
        {trend === 'up' ? '↑' : '↓'} {change}
      </p>
    </div>
  </div>
)

const recentActivity = [
  {
    id: 1,
    date: '2024-02-20',
    donor: 'John Doe',
    bloodType: 'O+',
    location: 'City Hospital',
    status: 'Completed'
  },
  // Add more activity data
]

export default BloodManagementDashboard 