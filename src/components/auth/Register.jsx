import { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'donor'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle registration logic here
    console.log(formData)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-red-600 mb-8 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">User Type</label>
          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
            required
          >
            <option value="donor">Donor</option>
            <option value="recipient">Recipient</option>
            <option value="hospital">Hospital</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200"
        >
          Register
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-red-600 hover:text-red-700">
          Login here
        </Link>
      </p>
    </div>
  )
}

export default Register 