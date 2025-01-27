import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { 
  FaTint, 
  FaCalendarAlt, 
  FaCertificate,
  FaUserCircle,
  FaMapMarkerAlt,
  FaMedal,
  FaHeartbeat,
  FaClock,
  FaBell,
  FaChartLine,
  FaFileDownload,
  FaPrint,
  FaShare,
  FaCheckCircle,
  FaExclamationCircle
} from 'react-icons/fa'
import {
  MdDashboard,
  MdNotifications,
  MdEventAvailable,
  MdLocalHospital,
  MdBloodtype
} from 'react-icons/md'
import { BiDonateBlood } from 'react-icons/bi'

const DonorDashboard = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [isLoading, setIsLoading] = useState(true)
  const [donorStats, setDonorStats] = useState({
    totalDonations: 12,
    lastDonation: '2024-02-15',
    nextEligibleDate: '2024-05-15',
    bloodType: 'O+',
    donationStreak: 3,
    livesImpacted: 36,
    badges: ['First Time Donor', 'Regular Donor', 'Life Saver'],
    upcomingAppointment: {
      date: '2024-05-20',
      time: '10:00 AM',
      location: 'Central Blood Bank'
    }
  })

  const [recentDonations] = useState([
    {
      id: 1,
      date: '2024-02-15',
      location: 'Central Blood Bank',
      type: 'Whole Blood',
      status: 'Completed',
      certificate: true,
      impact: 3
    },
    {
      id: 2,
      date: '2023-11-10',
      location: 'City Hospital',
      type: 'Plasma',
      status: 'Completed',
      certificate: true,
      impact: 2
    }
  ])

  const [notifications] = useState([
    {
      id: 1,
      type: 'reminder',
      message: 'You are eligible for donation in 3 days',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'urgent',
      message: 'Urgent need for O+ blood in your area',
      time: '1 day ago'
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
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-red-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Donations</p>
              <p className="text-2xl font-bold text-red-600">{donorStats.totalDonations}</p>
            </div>
            <BiDonateBlood className="text-3xl text-red-500" />
          </div>
        </div>

        <div className="bg-green-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Lives Impacted</p>
              <p className="text-2xl font-bold text-green-600">{donorStats.livesImpacted}</p>
            </div>
            <FaHeartbeat className="text-3xl text-green-500" />
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Donation Streak</p>
              <p className="text-2xl font-bold text-blue-600">{donorStats.donationStreak}</p>
            </div>
            <FaChartLine className="text-3xl text-blue-500" />
          </div>
        </div>

        <div className="bg-purple-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Badges Earned</p>
              <p className="text-2xl font-bold text-purple-600">{donorStats.badges.length}</p>
            </div>
            <FaMedal className="text-3xl text-purple-500" />
          </div>
        </div>
      </div>

      {/* Next Donation & Blood Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FaCalendarAlt className="mr-2 text-red-500" />
            Next Eligible Donation
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-gray-600">
                <FaClock />
                <span>Eligible Date:</span>
              </div>
              <span className="font-medium text-gray-900">
                {new Date(donorStats.nextEligibleDate).toLocaleDateString()}
              </span>
            </div>
            {donorStats.upcomingAppointment && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">Upcoming Appointment</h4>
                <div className="space-y-2 text-sm text-green-700">
                  <div className="flex items-center justify-between">
                    <span>Date & Time:</span>
                    <span>{donorStats.upcomingAppointment.date} {donorStats.upcomingAppointment.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Location:</span>
                    <span>{donorStats.upcomingAppointment.location}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <MdBloodtype className="mr-2 text-red-500" />
            Blood Information
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Blood Type:</span>
              <span className="text-2xl font-bold text-red-600">{donorStats.bloodType}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Last Donation:</span>
              <span className="font-medium text-gray-900">
                {new Date(donorStats.lastDonation).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Donations */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <FaTint className="mr-2 text-red-500" />
            Recent Donations
          </h3>
          <Link 
            to="/donation-history"
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentDonations.map((donation) => (
                <tr key={donation.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(donation.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {donation.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {donation.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`
                      px-2 py-1 text-xs font-medium rounded-full
                      ${donation.status === 'Completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                      }
                    `}>
                      {donation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-3">
                      {donation.certificate && (
                        <button className="text-blue-600 hover:text-blue-700">
                          <FaFileDownload className="w-5 h-5" />
                        </button>
                      )}
                      <button className="text-gray-600 hover:text-gray-700">
                        <FaPrint className="w-5 h-5" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-700">
                        <FaShare className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Achievements & Badges */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FaMedal className="mr-2 text-red-500" />
          Achievements
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {donorStats.badges.map((badge, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
              <FaCertificate className="mx-auto text-3xl text-red-500 mb-2" />
              <p className="text-sm font-medium text-gray-900">{badge}</p>
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
              Donor Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Welcome back, {user?.name}
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <Link
              to="/schedule-donation"
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
            >
              <MdEventAvailable className="mr-2" />
              Schedule Donation
            </Link>
            <button className="relative p-2 text-gray-600 hover:text-red-600 transition-colors">
              <MdNotifications className="text-2xl" />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications.length}
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

export default DonorDashboard 