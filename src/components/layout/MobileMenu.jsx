import { Link } from 'react-router-dom'

const MobileMenu = ({ isOpen, items, actions, userRole, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="lg:hidden">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl overflow-y-auto">
        <div className="p-6">
          {/* Admin Quick Access - Only show for admin role */}
          {userRole === 'admin' && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-red-600 uppercase tracking-wider mb-4">
                Management
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/management-dashboard"
                  className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-red-600 text-white"
                  onClick={onClose}
                >
                  <span className="text-lg">📊</span>
                  <span className="text-sm font-medium">Dashboard</span>
                </Link>
                <Link
                  to="/reports"
                  className="flex items-center justify-center space-x-2 p-3 rounded-lg border border-red-600 text-red-600"
                  onClick={onClose}
                >
                  <span className="text-lg">📋</span>
                  <span className="text-sm font-medium">Reports</span>
                </Link>
              </div>
            </div>
          )}

          {/* Emergency Actions */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-red-600 uppercase tracking-wider mb-4">
              Emergency Services
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/emergency-locator"
                className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-red-600 text-white"
                onClick={onClose}
              >
                <span className="text-lg">🚨</span>
                <span className="text-sm font-medium">Emergency</span>
              </Link>
              <Link
                to="/request-blood"
                className="flex items-center justify-center space-x-2 p-3 rounded-lg border border-red-600 text-red-600"
                onClick={onClose}
              >
                <span className="text-lg">🏥</span>
                <span className="text-sm font-medium">Request Blood</span>
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {actions.map((action, index) => (
                <Link
                  key={index}
                  to={action.path}
                  className={`
                    flex items-center justify-center space-x-2 p-3 rounded-lg
                    ${action.primary
                      ? 'bg-red-600 text-white'
                      : 'border border-red-600 text-red-600'
                    }
                  `}
                  onClick={onClose}
                >
                  <span className="text-lg">{action.icon}</span>
                  <span className="text-sm font-medium">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-6">
            {items
              .filter(item => !item.role || item.role === userRole)
              .map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                        {item.label}
                      </h3>
                      <div className="mt-3 space-y-3">
                        {item.children
                          .filter(child => !child.role || child.role === userRole)
                          .map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              className="block text-base text-gray-900 hover:text-red-600"
                              onClick={onClose}
                            >
                              {child.label}
                            </Link>
                          ))
                        }
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className="block text-base text-gray-900 hover:text-red-600"
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu 