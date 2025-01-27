import { useState, useEffect } from 'react'

const Notification = ({ message, type = 'info', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!isVisible) return null

  const bgColor = {
    success: 'bg-green-100 text-green-800 border-green-300',
    error: 'bg-red-100 text-red-800 border-red-300',
    info: 'bg-blue-100 text-blue-800 border-blue-300',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-300'
  }[type]

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-md animate-fade-in`}>
      <div className={`p-4 rounded-lg border ${bgColor} shadow-lg`}>
        <div className="flex items-center">
          <div className="flex-1">{message}</div>
          <button
            onClick={() => {
              setIsVisible(false)
              onClose?.()
            }}
            className="ml-4 text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  )
}

export default Notification 