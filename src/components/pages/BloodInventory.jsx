import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  FaTint, 
  FaFilter, 
  FaDownload, 
  FaPrint,
  FaExclamationTriangle,
  FaCheckCircle,
  FaHistory,
  FaChartLine,
  FaExchangeAlt,
  FaCalendarAlt,
  FaSearch,
  FaMapMarkerAlt,
  FaThermometerHalf
} from 'react-icons/fa'
import { 
  MdBloodtype,
  MdWarning,
  MdNotifications,
  MdRefresh,
  MdInventory,
  MdOutlineInventory2
} from 'react-icons/md'
import { BiDonateBlood } from 'react-icons/bi'
import { AiOutlineStock } from 'react-icons/ai'

const BloodInventory = () => {
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showExpiring, setShowExpiring] = useState(false)

  const [inventory, setInventory] = useState({
    "A+": {
      available: 150,
      reserved: 20,
      expiring: 5,
      incoming: 10,
      lastUpdated: "2024-03-10T10:30:00",
      status: "High",
      temperature: "4°C",
      location: "Main Storage"
    },
    "A-": {
      available: 50,
      reserved: 10,
      expiring: 2,
      incoming: 5,
      lastUpdated: "2024-03-10T10:30:00",
      status: "Medium",
      temperature: "4°C",
      location: "Main Storage"
    },
    // Add more blood types...
  })

  const [transactions] = useState([
    {
      id: 1,
      type: "incoming",
      bloodType: "A+",
      quantity: 10,
      source: "Central Blood Bank",
      date: "2024-03-10",
      status: "completed"
    },
    {
      id: 2,
      type: "outgoing",
      bloodType: "O-",
      quantity: 5,
      destination: "City Hospital",
      date: "2024-03-10",
      status: "in_transit"
    }
  ])

  const [alerts] = useState([
    {
      id: 1,
      type: "critical",
      message: "O- blood type reaching critical level",
      time: "10 minutes ago"
    },
    {
      id: 2,
      type: "warning",
      message: "5 units of A+ blood expiring in 48 hours",
      time: "1 hour ago"
    }
  ])

  useEffect(() => {
    // Simulate API call
    setTimeout(() => setLoading(false), 1000)
  }, [])

  const getStatusColor = (status) => {
    const colors = {
      High: "bg-green-100 text-green-800",
      Medium: "bg-yellow-100 text-yellow-800",
      Low: "bg-orange-100 text-orange-800",
      Critical: "bg-red-100 text-red-800"
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  const handleExport = (format) => {
    // Implement export logic
    console.log(`Exporting inventory in ${format} format`)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <MdInventory className="mr-2 text-red-600" />
              Blood Inventory Management
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Last updated: {new Date().toLocaleString()}
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <button
              onClick={() => handleExport('csv')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <FaDownload className="mr-2" />
              Export
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <FaPrint className="mr-2" />
              Print
            </button>
            <button className="relative p-2 text-gray-600 hover:text-red-600">
              <MdNotifications className="text-2xl" />
              {alerts.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {alerts.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Units</p>
                <p className="text-2xl font-bold text-gray-900">450</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <BiDonateBlood className="text-2xl text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Reserved Units</p>
                <p className="text-2xl font-bold text-gray-900">45</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <MdOutlineInventory2 className="text-2xl text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Expiring Soon</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <FaCalendarAlt className="text-2xl text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Incoming Units</p>
                <p className="text-2xl font-bold text-gray-900">25</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <AiOutlineStock className="text-2xl text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Alerts Section */}
        {alerts.length > 0 && (
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MdWarning className="mr-2 text-yellow-500" />
                Important Alerts
              </h3>
              <div className="space-y-4">
                {alerts.map(alert => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg border ${
                      alert.type === 'critical'
                        ? 'bg-red-50 border-red-200'
                        : 'bg-yellow-50 border-yellow-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {alert.type === 'critical' ? (
                          <FaExclamationTriangle className="text-red-500 mr-2" />
                        ) : (
                          <FaExclamationTriangle className="text-yellow-500 mr-2" />
                        )}
                        <div>
                          <p className={`text-sm font-medium ${
                            alert.type === 'critical' ? 'text-red-800' : 'text-yellow-800'
                          }`}>
                            {alert.message}
                          </p>
                          <p className="text-sm text-gray-500">{alert.time}</p>
                        </div>
                      </div>
                      <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                        Take Action
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Inventory Grid */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <FaTint className="mr-2 text-red-500" />
              Blood Inventory Status
            </h3>

            <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="all">All Blood Types</option>
                {Object.keys(inventory).map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="all">All Status</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
                <option value="Critical">Critical</option>
              </select>

              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={showExpiring}
                  onChange={(e) => setShowExpiring(e.target.checked)}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className="ml-2 text-sm text-gray-600">Show Expiring Only</span>
              </label>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Blood Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Available Units
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reserved
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Temperature
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.entries(inventory).map(([type, data]) => (
                  <tr key={type}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <MdBloodtype className="text-red-500 mr-2" />
                        <span className="text-sm font-medium text-gray-900">{type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{data.available} units</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{data.reserved} units</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`
                        px-2 py-1 text-xs font-medium rounded-full
                        ${getStatusColor(data.status)}
                      `}>
                        {data.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <FaMapMarkerAlt className="text-gray-400 mr-1" />
                        {data.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <FaThermometerHalf className="text-gray-400 mr-1" />
                        {data.temperature}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-3">
                        <button className="text-blue-600 hover:text-blue-700">
                          <FaHistory className="w-5 h-5" title="View History" />
                        </button>
                        <button className="text-green-600 hover:text-green-700">
                          <FaExchangeAlt className="w-5 h-5" title="Transfer" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-700">
                          <FaChartLine className="w-5 h-5" title="View Trends" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FaHistory className="mr-2 text-gray-500" />
            Recent Transactions
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Blood Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source/Destination
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`
                        px-2 py-1 text-xs font-medium rounded-full
                        ${transaction.type === 'incoming' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                        }
                      `}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <MdBloodtype className="text-red-500 mr-2" />
                        <span className="text-sm text-gray-900">{transaction.bloodType}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{transaction.quantity} units</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                        {transaction.source || transaction.destination}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{transaction.date}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`
                        px-2 py-1 text-xs font-medium rounded-full
                        ${transaction.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                        }
                      `}>
                        {transaction.status}
                      </span>
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

export default BloodInventory 