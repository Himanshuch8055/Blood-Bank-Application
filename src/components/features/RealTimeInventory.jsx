import { useState, useEffect } from 'react'
import { 
  FaTint, 
  FaHospital, 
  FaFilter,
  FaExclamationTriangle,
  FaCalendarAlt,
  FaArrowUp,
  FaArrowDown,
  FaHistory,
  FaDownload,
  FaPrint,
  FaShare,
  FaChartBar
} from 'react-icons/fa'
import { 
  MdBloodtype, 
  MdNotifications, 
  MdWarning,
  MdLocationOn,
  MdRefresh,
  MdFilterList,
  MdHistory
} from 'react-icons/md'
import { BiRefresh } from 'react-icons/bi'
import { AiOutlineStock, AiFillAlert } from 'react-icons/ai'
import { Line } from 'react-chartjs-2'

const RealTimeInventory = () => {
  const [filters, setFilters] = useState({
    bloodType: 'all',
    location: 'all',
    status: 'all',
    timeRange: '24h'
  })
  const [showFilters, setShowFilters] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [isLoading, setIsLoading] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [showHistory, setShowHistory] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'critical',
      message: 'O- blood type reaching critical levels',
      time: '5 minutes ago'
    },
    {
      id: 2,
      type: 'warning',
      message: '10 units of A+ expiring in 48 hours',
      time: '10 minutes ago'
    }
  ])

  // Add bloodInventory data
  const bloodInventory = [
    {
      id: 1,
      location: "Central Blood Bank",
      inventory: {
        "A+": {
          units: 150,
          status: "High",
          trend: "up",
          lastUpdated: "2024-03-10T10:30:00",
          expiringUnits: 5,
          incomingUnits: 10
        },
        "A-": {
          units: 50,
          status: "Medium",
          trend: "stable",
          lastUpdated: "2024-03-10T10:30:00",
          expiringUnits: 2,
          incomingUnits: 5
        },
        "B+": {
          units: 25,
          status: "Low",
          trend: "down",
          lastUpdated: "2024-03-10T10:30:00",
          expiringUnits: 3,
          incomingUnits: 0
        },
        "B-": {
          units: 10,
          status: "Critical",
          trend: "down",
          lastUpdated: "2024-03-10T10:30:00",
          expiringUnits: 0,
          incomingUnits: 5
        },
        "O+": {
          units: 200,
          status: "High",
          trend: "up",
          lastUpdated: "2024-03-10T10:30:00",
          expiringUnits: 8,
          incomingUnits: 15
        },
        "O-": {
          units: 75,
          status: "Medium",
          trend: "stable",
          lastUpdated: "2024-03-10T10:30:00",
          expiringUnits: 4,
          incomingUnits: 8
        },
        "AB+": {
          units: 30,
          status: "Low",
          trend: "up",
          lastUpdated: "2024-03-10T10:30:00",
          expiringUnits: 2,
          incomingUnits: 5
        },
        "AB-": {
          units: 15,
          status: "Critical",
          trend: "stable",
          lastUpdated: "2024-03-10T10:30:00",
          expiringUnits: 1,
          incomingUnits: 3
        }
      }
    },
    {
      id: 2,
      location: "City Hospital",
      inventory: {
        "A+": {
          units: 120,
          status: "High",
          trend: "stable",
          lastUpdated: "2024-03-10T10:30:00",
          expiringUnits: 3,
          incomingUnits: 8
        },
        "A-": {
          units: 45,
          status: "Medium",
          trend: "down",
          lastUpdated: "2024-03-10T10:30:00",
          expiringUnits: 1,
          incomingUnits: 4
        },
        "B+": {
          units: 35,
          status: "Medium",
          trend: "up",
          lastUpdated: "2024-03-10T10:30:00",
          expiringUnits: 2,
          incomingUnits: 6
        },
        "B-": {
          units: 20,
          status: "Low",
          trend: "stable",
          lastUpdated: "2024-03-10T10:30:00",
          expiringUnits: 1,
          incomingUnits: 3
        },
        "O+": {
          units: 180,
          status: "High",
          trend: "up",
          lastUpdated: "2024-03-10T10:30:00",
          expiringUnits: 6,
          incomingUnits: 12
        },
        "O-": {
          units: 65,
          status: "Medium",
          trend: "down",
          lastUpdated: "2024-03-10T10:30:00",
          expiringUnits: 3,
          incomingUnits: 7
        },
        "AB+": {
          units: 25,
          status: "Low",
          trend: "stable",
          lastUpdated: "2024-03-10T10:30:00",
          expiringUnits: 1,
          incomingUnits: 4
        },
        "AB-": {
          units: 12,
          status: "Critical",
          trend: "down",
          lastUpdated: "2024-03-10T10:30:00",
          expiringUnits: 0,
          incomingUnits: 2
        }
      }
    }
  ]

  // Add missing getStatusColor function
  const getStatusColor = (status) => {
    const colors = {
      High: "bg-green-100 text-green-800 border-green-200",
      Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Low: "bg-orange-100 text-orange-800 border-orange-200",
      Critical: "bg-red-100 text-red-800 border-red-200"
    }
    return colors[status] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  // Add missing getTrendIcon function
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <FaArrowUp className="text-green-500" />
      case 'down':
        return <FaArrowDown className="text-red-500" />
      default:
        return <span className="text-yellow-500">→</span>
    }
  }

  // Add missing handleRefresh function
  const handleRefresh = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLastUpdated(new Date())
    setIsLoading(false)
  }

  // Add missing showNotifications state
  const [showNotifications, setShowNotifications] = useState(false)

  // Add inventory history data
  const inventoryHistory = {
    labels: ['6h ago', '5h ago', '4h ago', '3h ago', '2h ago', '1h ago', 'Now'],
    datasets: [
      {
        label: 'O+ Units',
        data: [180, 175, 190, 185, 195, 200, 200],
        borderColor: 'rgb(239, 68, 68)',
        tension: 0.4
      }
    ]
  }

  // Add more detailed blood bank data
  const locations = [
    "Central Blood Bank",
    "City Hospital",
    "Regional Medical Center",
    "Community Blood Center"
  ]

  const timeRanges = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: 'custom', label: 'Custom Range' }
  ]

  // Calculate total stats
  const calculateStats = () => {
    let totalUnits = 0
    let criticalTypes = 0
    let expiringUnits = 0
    let incomingUnits = 0

    bloodInventory.forEach(location => {
      Object.values(location.inventory).forEach(data => {
        totalUnits += data.units
        if (data.status === 'Critical') criticalTypes++
        expiringUnits += data.expiringUnits
        incomingUnits += data.incomingUnits
      })
    })

    return { totalUnits, criticalTypes, expiringUnits, incomingUnits }
  }

  const stats = calculateStats()

  // Add export functions
  const exportData = (format) => {
    // Implement export logic
    console.log(`Exporting data in ${format} format`)
  }

  // Add print function
  const printInventory = () => {
    window.print()
  }

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section with Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <FaTint className="text-red-600 mr-2" />
                Real-Time Blood Inventory
              </h1>
              <p className="text-sm text-gray-500 mt-1 flex items-center">
                <BiRefresh className="mr-1" />
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
              <button
                onClick={() => exportData('csv')}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                <FaDownload />
                <span>Export</span>
              </button>
              <button
                onClick={printInventory}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                <FaPrint />
                <span>Print</span>
              </button>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                <MdHistory />
                <span>History</span>
              </button>
              <button
                onClick={handleRefresh}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg text-white
                  ${isLoading ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'}
                  transition-colors text-sm
                `}
                disabled={isLoading}
              >
                <MdRefresh className={`${isLoading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>

          {/* Filters Section */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-4">
              <select
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 text-sm"
              >
                <option value="all">All Locations</option>
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>

              <select
                value={filters.timeRange}
                onChange={(e) => setFilters({...filters, timeRange: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 text-sm"
              >
                {timeRanges.map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-red-600 text-sm"
              >
                <MdFilterList />
                <span>More Filters</span>
              </button>
            </div>

            {showFilters && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Add additional filters */}
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-red-50 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Critical Types</p>
                  <p className="text-2xl font-bold text-red-600">{stats.criticalTypes}</p>
                </div>
                <AiFillAlert className="text-2xl text-red-500" />
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Units</p>
                  <p className="text-2xl font-bold text-green-600">{stats.totalUnits}</p>
                </div>
                <FaTint className="text-2xl text-green-500" />
              </div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Expiring Soon</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.expiringUnits}</p>
                </div>
                <FaCalendarAlt className="text-2xl text-yellow-500" />
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Incoming Units</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.incomingUnits}</p>
                </div>
                <AiOutlineStock className="text-2xl text-blue-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Trend Chart */}
        {showHistory && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FaChartBar className="mr-2 text-red-600" />
              Inventory Trends
            </h2>
            <div className="h-64">
              <Line data={inventoryHistory} options={{
                responsive: true,
                maintainAspectRatio: false,
                // Add more chart options
              }} />
            </div>
          </div>
        )}

        {/* Main Inventory Grid */}
        {bloodInventory.map((location, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <FaHospital className="text-red-600 text-xl" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    {location.location}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(location.inventory).map(([type, data]) => (
                  <div 
                    key={type}
                    className={`
                      rounded-lg border p-4
                      ${getStatusColor(data.status)}
                    `}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <MdBloodtype className="text-xl" />
                        <span className="font-bold">{type}</span>
                      </div>
                      {getTrendIcon(data.trend)}
                    </div>

                    <div className="mt-2">
                      <div className="text-2xl font-bold mb-1">
                        {data.units} units
                      </div>
                      <div className="text-sm space-y-1">
                        <div className="flex items-center justify-between">
                          <span>Expiring Soon:</span>
                          <span className="font-medium">{data.expiringUnits}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Incoming:</span>
                          <span className="font-medium">{data.incomingUnits}</span>
                        </div>
                      </div>
                    </div>

                    {data.status === 'Critical' && (
                      <div className="mt-3 flex items-center text-red-600 text-sm">
                        <FaExclamationTriangle className="mr-1" />
                        <span>Critical Level</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Notifications Panel */}
        {/* <div className="fixed top-4 right-4 z-50">
          <div className="relative">
            <button 
              className="bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <MdNotifications className="text-xl" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute bottom-full right-0 mb-2 w-80 bg-white rounded-lg shadow-xl">
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Notifications</h3>
                  <div className="space-y-2">
                    {notifications.map(notification => (
                      <div 
                        key={notification.id}
                        className={`p-2 rounded-lg text-sm ${
                          notification.type === 'critical' 
                            ? 'bg-red-50 text-red-700'
                            : 'bg-yellow-50 text-yellow-700'
                        }`}
                      >
                        <div className="font-medium">{notification.message}</div>
                        <div className="text-xs opacity-75">{notification.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default RealTimeInventory 