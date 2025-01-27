import { useState } from 'react'

const NOTIFICATIONS = [
  {
    type: 'emergency',
    title: 'Urgent: O- Blood Required',
    message: 'Emergency requirement at City Hospital',
    time: '5 mins ago',
    icon: '🚨'
  },
  {
    type: 'donation',
    title: 'Blood Donation Camp',
    message: 'Upcoming camp at Community Center',
    time: '1 hour ago',
    icon: '🎉'
  },
  {
    type: 'update',
    title: 'Blood Bank Update',
    message: 'New inventory management system',
    time: '2 hours ago',
    icon: '📢'
  }
]

const NotificationCenter = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState(NOTIFICATIONS)

  const clearNotification = (index) => {
    setNotifications(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div 
      className={`
        absolute top-full right-0 mt-2 w-96 bg-white rounded-lg shadow-xl overflow-hidden z-50
        transform transition-all duration-300 origin-top-right
        ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}
      `}
    >
      <div className="p-4 bg-red-50 border-b border-red-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-red-800">Notifications</h3>
          <button 
            onClick={onClose}
            className="text-red-500 hover:text-red-700"
          >
            <span className="sr-only">Close</span>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <p className="mt-4">No new notifications</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {notifications.map((notification, index) => (
              <div 
                key={index} 
                className="p-4 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-start space-x-4">
                  <span className="text-2xl">{notification.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </h4>
                      <button
                        onClick={() => clearNotification(index)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">Dismiss</span>
                        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                        </svg>
                      </button>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      {notification.message}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 bg-gray-50 border-t border-gray-100">
        <button
          onClick={() => setNotifications([])}
          className="w-full px-4 py-2 text-sm text-red-600 hover:text-red-700 font-medium"
        >
          Clear all notifications
        </button>
      </div>
    </div>
  )
}

export default NotificationCenter 