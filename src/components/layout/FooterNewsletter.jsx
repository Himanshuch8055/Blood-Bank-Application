import { useState } from 'react'
import Notification from '../common/Notification'

const FooterNewsletter = () => {
  const [email, setEmail] = useState('')
  const [notification, setNotification] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setNotification({
      type: 'success',
      message: 'Thank you for subscribing to our newsletter!'
    })
    setEmail('')
  }

  return (
    <div className="bg-red-700 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-lg font-medium text-white">Subscribe to our newsletter</h3>
          <p className="mt-1 text-sm text-red-100">
            Get the latest updates about blood donation camps and emergency requirements.
          </p>
          <form className="mt-4 sm:flex sm:max-w-md sm:mx-auto" onSubmit={handleSubmit}>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              name="email-address"
              id="email-address"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 placeholder-gray-500 focus:ring-red-500 focus:border-red-500 sm:max-w-xs border-red-300 rounded-md"
              placeholder="Enter your email"
            />
            <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
              <button
                type="submit"
                className="w-full bg-red-500 px-5 py-3 border border-transparent text-base font-medium rounded-md text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-700 focus:ring-red-500"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  )
}

export default FooterNewsletter 