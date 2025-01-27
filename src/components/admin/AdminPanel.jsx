import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import {
  FaUserMd,
  FaHospital,
  FaTint,
  FaUsers,
  FaChartLine,
  FaBell,
  FaClipboardList,
  FaUserCheck,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock,
  FaDownload,
  FaPrint,
  FaFilter,
  FaSearch,
  FaMapMarkerAlt
} from 'react-icons/fa'
import {
  MdDashboard,
  MdLocalHospital,
  MdBloodtype,
  MdNotifications,
  MdVerified,
  MdWarning,
  MdPending
} from 'react-icons/md'
import { BiDonateBlood } from 'react-icons/bi'
import { AiOutlineStock } from 'react-icons/ai'

const AdminPanel = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const [stats, setStats] = useState({
    totalDonors: 1250,
    totalHospitals: 45,
    pendingVerifications: 12,
    totalDonations: 3567,
    criticalRequests: 8,
    activeRequests: 23
  })

  const [recentActivities] = useState([
    {
      id: 1,
      type: 'hospital_registration',
      name: 'City Hospital',
      status: 'pending',
      time: '2 hours ago',
      location: 'New York, NY'
    },
    {
      id: 2,
      type: 'emergency_request',
      name: 'Central Blood Bank',
      status: 'critical',
      time: '4 hours ago',
      bloodType: 'O-',
      location: 'Los Angeles, CA'
    }
  ])

  const [pendingVerifications] = useState([
    {
      id: 1,
      type: 'hospital',
      name: 'Metro Hospital',
      submittedAt: '2024-03-10',
      documents: ['license.pdf', 'registration.pdf'],
      status: 'pending'
    },
    {
      id: 2,
      type: 'donor',
      name: 'John Doe',
      submittedAt: '2024-03-09',
      documents: ['id.pdf'],
      status: 'pending'
    }
  ])

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Donors</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalDonors}</p>
              <p className="text-sm text-green-600">+12% from last month</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <FaUsers className="text-2xl text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Hospitals</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalHospitals}</p>
              <p className="text-sm text-green-600">+5% from last month</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <FaHospital className="text-2xl text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Donations</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalDonations}</p>
              <p className="text-sm text-green-600">+8% from last month</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <BiDonateBlood className="text-2xl text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <MdWarning className="mr-2 text-yellow-500" />
          Critical Alerts
        </h3>
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FaExclamationTriangle className="text-red-500 mr-2" />
                <div>
                  <p className="text-sm font-medium text-red-800">Critical Blood Shortage</p>
                  <p className="text-sm text-red-700">O- blood type at Central Blood Bank</p>
                </div>
              </div>
              <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                View Details
              </button>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MdPending className="text-yellow-500 mr-2" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Pending Verifications</p>
                  <p className="text-sm text-yellow-700">{stats.pendingVerifications} new registrations require review</p>
                </div>
              </div>
              <button className="text-sm text-yellow-600 hover:text-yellow-700 font-medium">
                Review Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <FaClipboardList className="mr-2 text-gray-500" />
            Recent Activities
          </h3>
          <div className="flex items-center space-x-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-sm border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="critical">Critical</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentActivities.map((activity) => (
                <tr key={activity.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {activity.type === 'hospital_registration' ? (
                        <FaHospital className="text-blue-500 mr-2" />
                      ) : (
                        <FaTint className="text-red-500 mr-2" />
                      )}
                      <span className="text-sm text-gray-900">{activity.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="text-gray-400 mr-1" />
                      {activity.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`
                      px-2 py-1 text-xs font-medium rounded-full
                      ${activity.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                      }
                    `}>
                      {activity.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {activity.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pending Verifications */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <MdVerified className="mr-2 text-blue-500" />
          Pending Verifications
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pendingVerifications.map((verification) => (
            <div 
              key={verification.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    {verification.type === 'hospital' ? (
                      <FaHospital className="text-blue-500 mr-2" />
                    ) : (
                      <FaUserMd className="text-green-500 mr-2" />
                    )}
                    <span className="font-medium text-gray-900">{verification.name}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Submitted: {verification.submittedAt}
                  </p>
                </div>
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                  Pending Review
                </span>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Documents:</p>
                <div className="flex flex-wrap gap-2">
                  {verification.documents.map((doc, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-xs"
                    >
                      <FaDownload className="mr-1" />
                      {doc}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex justify-end space-x-2">
                <button className="px-3 py-1 text-sm font-medium text-red-600 hover:text-red-700">
                  Reject
                </button>
                <button className="px-3 py-1 text-sm font-medium text-green-600 hover:text-green-700">
                  Approve
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <MdDashboard className="mr-2 text-red-600" />
              Admin Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Welcome back, {user?.name}
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <button className="relative p-2 text-gray-600 hover:text-red-600">
              <MdNotifications className="text-2xl" />
              {stats.pendingVerifications > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {stats.pendingVerifications}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Main Content */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
          </div>
        ) : (
          renderOverview()
        )}
      </div>
    </div>
  )
}

export default AdminPanel 