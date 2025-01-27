import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt,
  FaTint,
  FaCalendarAlt,
  FaIdCard,
  FaHistory,
  FaCertificate,
  FaMedal,
  FaEdit,
  FaCamera,
  FaLock,
  FaExclamationTriangle,
  FaCheckCircle,
  FaUserMd,
  FaHospital
} from 'react-icons/fa'
import {
  MdBloodtype,
  MdVerified,
  MdNotifications,
  MdHealthAndSafety,
  MdSettings
} from 'react-icons/md'
import { BiDonateBlood } from 'react-icons/bi'
import { IoMdNotifications } from 'react-icons/io'
import { RiHealthBookFill } from 'react-icons/ri'
import { AiFillSafetyCertificate } from 'react-icons/ai'
import { BsShieldCheck, BsGearFill } from 'react-icons/bs'
import { IoMdTrendingUp } from 'react-icons/io'
import { GiHeartPlus } from 'react-icons/gi'
import { HiDocumentReport } from 'react-icons/hi'
import { BsGraphUp, BsCalendarCheck, BsAward } from 'react-icons/bs'

const Profile = () => {
  const { user, updateProfile } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const [activeSection, setActiveSection] = useState('personal')
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [healthMetrics, setHealthMetrics] = useState({
    bloodPressure: '120/80',
    hemoglobin: '14',
    pulse: '72',
    lastCheckup: '2024-02-15'
  })

  const [profileData, setProfileData] = useState({
    // Personal Information
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    dateOfBirth: '1990-01-01',
    gender: 'Male',
    bloodType: 'O+',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    
    // Medical Information
    lastDonation: '2024-02-15',
    nextEligibleDate: '2024-05-15',
    medicalConditions: [],
    medications: [],
    allergies: [],
    weight: '70',
    height: '175',
    
    // Emergency Contact
    emergencyContact: {
      name: 'Jane Doe',
      relation: 'Spouse',
      phone: '+1987654321'
    },

    // Donation History
    totalDonations: 12,
    donationStreak: 3,
    lastHealthCheck: '2024-01-15',
    certificates: ['First Time Donor', 'Regular Donor', 'Life Saver'],
    
    // Preferences
    notificationPreferences: {
      email: true,
      sms: true,
      push: false
    },
    privacySettings: {
      showProfile: true,
      showDonationHistory: true
    }
  })

  const [donationHistory] = useState([
    {
      id: 1,
      date: '2024-02-15',
      type: 'Whole Blood',
      location: 'Central Blood Bank',
      status: 'Completed',
      certificate: true
    },
    {
      id: 2,
      date: '2023-11-10',
      type: 'Plasma',
      location: 'City Hospital',
      status: 'Completed',
      certificate: true
    }
  ])

  const achievements = [
    {
      id: 1,
      title: 'Life Saver',
      description: 'Donated blood 10 times',
      icon: <FaMedal className="text-yellow-500" />,
      progress: 100,
      achieved: true
    },
    {
      id: 2,
      title: 'Regular Donor',
      description: 'Donated 3 times in 6 months',
      icon: <AiFillSafetyCertificate className="text-blue-500" />,
      progress: 66,
      achieved: false
    }
  ]

  const [appointments] = useState([
    {
      id: 1,
      type: 'Blood Donation',
      date: '2024-04-15',
      time: '10:00 AM',
      location: 'Central Blood Bank',
      status: 'confirmed'
    }
  ])

  const [healthTrends] = useState({
    bloodPressure: [
      { date: '2024-01', value: '118/78' },
      { date: '2024-02', value: '120/80' },
      { date: '2024-03', value: '122/82' }
    ],
    hemoglobin: [
      { date: '2024-01', value: '13.8' },
      { date: '2024-02', value: '14.0' },
      { date: '2024-03', value: '14.2' }
    ]
  })

  const [donationImpact] = useState({
    livesImpacted: 36,
    hospitalsServed: 5,
    totalBloodVolume: '5.4L',
    lastImpactUpdate: '2024-03-15'
  })

  const additionalAchievements = [
    {
      id: 3,
      title: 'Quick Responder',
      description: 'Responded to 3 emergency requests',
      icon: <GiHeartPlus className="text-red-500" />,
      progress: 100,
      achieved: true
    },
    {
      id: 4,
      title: 'Blood Champion',
      description: 'Maintained perfect donation schedule for 1 year',
      icon: <BsAward className="text-purple-500" />,
      progress: 75,
      achieved: false
    }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      // Update profile logic here
      await updateProfile(profileData)
      setSuccess('Profile updated successfully!')
      setIsEditing(false)
    } catch (error) {
      setError('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0]
    // Handle profile picture upload
  }

  const renderPersonalInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
        <input
          type="text"
          name="firstName"
          value={profileData.firstName}
          onChange={handleInputChange}
          disabled={!isEditing}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
        />
      </div>
      {/* Add more personal info fields */}
    </div>
  )

  const renderMedicalInfo = () => (
    <div className="space-y-6">
      {/* Health Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Blood Pressure</span>
            <RiHealthBookFill className="text-red-500" />
          </div>
          <p className="text-xl font-semibold text-gray-900">{healthMetrics.bloodPressure}</p>
        </div>
        {/* Add more health metrics */}
      </div>

      {/* Medical History */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Medical Conditions</h3>
        <div className="space-y-2">
          {profileData.medicalConditions.map((condition, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">{condition}</span>
              {isEditing && (
                <button className="text-red-500 hover:text-red-600">
                  <FaExclamationTriangle />
                </button>
              )}
            </div>
          ))}
          {isEditing && (
            <button className="w-full py-2 text-sm text-red-600 hover:text-red-700 border border-dashed border-red-300 rounded-lg">
              + Add Medical Condition
            </button>
          )}
        </div>
      </div>
    </div>
  )

  const renderDonationHistory = () => (
    <div className="space-y-6">
      {/* Donation Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm opacity-90">Total Donations</span>
            <BiDonateBlood className="text-2xl" />
          </div>
          <p className="text-3xl font-bold">{profileData.totalDonations}</p>
          <p className="text-sm opacity-75 mt-2">Lives Impacted: {profileData.totalDonations * 3}</p>
        </div>
        {/* Add more donation stats */}
      </div>

      {/* Recent Donations Table - Enhanced version */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Donations</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Certificate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {donationHistory.map((donation) => (
                <tr key={donation.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {donation.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {donation.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {donation.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      {donation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {donation.certificate && (
                      <FaCertificate className="text-yellow-500" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border ${
                achievement.achieved ? 'border-yellow-200 bg-yellow-50' : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-white rounded-full shadow-sm">
                  {achievement.icon}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                  {!achievement.achieved && (
                    <div className="mt-2">
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-red-500 rounded-full"
                          style={{ width: `${achievement.progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {achievement.progress}% completed
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderSettings = () => (
    <div className="space-y-6">
      {/* Notification Preferences */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <IoMdNotifications className="mr-2 text-gray-500" />
          Notification Preferences
        </h3>
        <div className="space-y-4">
          {Object.entries(profileData.notificationPreferences).map(([key, value]) => (
            <label key={key} className="flex items-center justify-between">
              <span className="text-sm text-gray-700 capitalize">{key} Notifications</span>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  name={`notifications.${key}`}
                  checked={value}
                  onChange={handleInputChange}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label
                  className={`toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer ${
                    value ? 'bg-red-500' : ''
                  }`}
                />
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <BsShieldCheck className="mr-2 text-gray-500" />
          Privacy Settings
        </h3>
        {/* Add privacy settings toggles */}
      </div>

      {/* Account Security */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <BsGearFill className="mr-2 text-gray-500" />
          Account Security
        </h3>
        <button
          onClick={() => setShowPasswordModal(true)}
          className="w-full py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Change Password
        </button>
      </div>
    </div>
  )

  const generateHealthReport = () => {
    // Implementation for health report generation
    console.log('Generating health report...')
  }

  const renderHealthTrends = () => (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <IoMdTrendingUp className="mr-2 text-blue-500" />
        Health Trends
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(healthTrends).map(([metric, data]) => (
          <div key={metric} className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700 capitalize">{metric}</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              {data.map((item, index) => (
                <div key={index} className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">{item.date}</span>
                  <span className="text-sm font-medium text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderDonationImpact = () => (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <BsGraphUp className="mr-2 text-green-500" />
        Donation Impact
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Lives Impacted</p>
          <p className="text-2xl font-bold text-green-600">{donationImpact.livesImpacted}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Hospitals Served</p>
          <p className="text-2xl font-bold text-blue-600">{donationImpact.hospitalsServed}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Volume</p>
          <p className="text-2xl font-bold text-purple-600">{donationImpact.totalBloodVolume}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Last Updated</p>
          <p className="text-sm font-medium text-red-600">{donationImpact.lastImpactUpdate}</p>
        </div>
      </div>
    </div>
  )

  const renderQuickActions = () => (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => {/* Schedule donation logic */}}
          className="flex items-center justify-center p-4 bg-red-50 rounded-lg text-red-700 hover:bg-red-100 transition-colors"
        >
          <BsCalendarCheck className="mr-2" />
          Schedule Donation
        </button>
        <button
          onClick={generateHealthReport}
          className="flex items-center justify-center p-4 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors"
        >
          <HiDocumentReport className="mr-2" />
          Generate Report
        </button>
      </div>
    </div>
  )

  // Add CSS for toggle switch
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      .toggle-checkbox:checked {
        right: 0;
        border-color: #fff;
      }
      .toggle-checkbox:checked + .toggle-label {
        background-color: #EF4444;
      }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100">
                <img
                  src={user?.photoURL || "https://randomuser.me/api/portraits/women/5.jpg"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <label className="absolute bottom-0 right-0 bg-red-600 text-white p-2 rounded-full cursor-pointer hover:bg-red-700">
                <FaCamera className="w-4 h-4" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                />
              </label>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {profileData.firstName} {profileData.lastName}
                  </h1>
                  <div className="flex items-center mt-1 space-x-4">
                    <span className="flex items-center text-sm text-gray-500">
                      <MdBloodtype className="mr-1 text-red-500" />
                      {profileData.bloodType}
                    </span>
                    <span className="flex items-center text-sm text-gray-500">
                      <FaMapMarkerAlt className="mr-1" />
                      {profileData.city}, {profileData.state}
                    </span>
                    <span className="flex items-center text-sm text-gray-500">
                      <BiDonateBlood className="mr-1" />
                      {profileData.totalDonations} donations
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <FaEdit className="mr-2" />
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </button>
                  {isEditing && (
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </button>
                  )}
                </div>
              </div>

              {/* Profile Badges */}
              <div className="mt-4 flex flex-wrap gap-2">
                {profileData.certificates.map((certificate, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"
                  >
                    <FaCertificate className="mr-1" />
                    {certificate}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Navigation */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <nav className="flex space-x-4">
            {[
              { id: "profile", label: "Profile", icon: <FaUser /> },
              {
                id: "medical",
                label: "Medical Info",
                icon: <MdHealthAndSafety />,
              },
              {
                id: "donations",
                label: "Donation History",
                icon: <FaHistory />,
              },
              { id: "settings", label: "Settings", icon: <MdSettings /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center px-4 py-2 text-sm font-medium rounded-lg
                  ${
                    activeTab === tab.id
                      ? "bg-red-50 text-red-700"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }
                `}
              >
                {tab.icon}
                <span className="ml-2">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center text-green-600">
              <FaCheckCircle className="mr-2" />
              <span>{success}</span>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center text-red-600">
              <FaExclamationTriangle className="mr-2" />
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Profile Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {activeTab === "profile" && (
              <>
                {renderPersonalInfo()}
                {renderQuickActions()}
              </>
            )}
            {activeTab === "medical" && (
              <>
                {renderMedicalInfo()}
                {renderHealthTrends()}
              </>
            )}
            {activeTab === "donations" && (
              <>
                {renderDonationHistory()}
                {renderDonationImpact()}
              </>
            )}
            {activeTab === "settings" && renderSettings()}
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Previous sidebar content with improved styling */}
            {/* Add upcoming appointments section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FaCalendarAlt className="mr-2 text-gray-500" />
                Upcoming Appointments
              </h2>
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">
                        {appointment.type}
                      </span>
                      <span className="text-sm text-gray-500">
                        {appointment.date}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{appointment.time}</p>
                    <p className="text-sm text-gray-600">
                      {appointment.location}
                    </p>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile 