import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import api from '../../utils/api'

const Dashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    donations: [],
    requests: [],
    appointments: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/dashboard')
      setStats(response.data)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-red-600">Welcome, {user.name}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Donations</h3>
          {stats.donations.length > 0 ? (
            <ul className="space-y-3">
              {stats.donations.map((donation) => (
                <li key={donation.id} className="text-gray-600">
                  {donation.date} - {donation.bloodGroup} ({donation.units} units)
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No recent donations</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Blood Requests</h3>
          {stats.requests.length > 0 ? (
            <ul className="space-y-3">
              {stats.requests.map((request) => (
                <li key={request.id} className="text-gray-600">
                  {request.date} - {request.bloodGroup} ({request.status})
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No active requests</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Appointments</h3>
          {stats.appointments.length > 0 ? (
            <ul className="space-y-3">
              {stats.appointments.map((appointment) => (
                <li key={appointment.id} className="text-gray-600">
                  {appointment.date} - {appointment.type}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No upcoming appointments</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard 