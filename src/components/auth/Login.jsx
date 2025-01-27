import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { 
  FaEnvelope, 
  FaLock, 
  FaGoogle, 
  FaFacebook, 
  FaEye, 
  FaEyeSlash,
  FaExclamationCircle,
  FaUserMd,
  FaHospital,
  FaUserPlus
} from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { BiDonateBlood } from 'react-icons/bi'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, loginWithGoogle } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState('donor') // donor, hospital, admin
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })

  const userTypes = [
    { id: 'donor', label: 'Donor', icon: <BiDonateBlood /> },
    { id: 'hospital', label: 'Hospital', icon: <FaHospital /> },
    { id: 'admin', label: 'Admin', icon: <FaUserMd /> }
  ]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(formData.email, formData.password)
      
      // Redirect based on user type
      const redirectPath = {
        donor: '/donor-dashboard',
        hospital: '/hospital-dashboard',
        admin: '/admin-dashboard'
      }[userType]

      navigate(location.state?.from || redirectPath)
    } catch (error) {
      setError('Failed to sign in. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle()
      navigate('/donor-dashboard')
    } catch (error) {
      setError('Failed to sign in with Google.')
    }
  }

  const getRegistrationLink = () => {
    const links = {
      donor: '/donor-registration',
      hospital: '/hospital-registration',
      admin: '/contact-admin'
    }
    return links[userType]
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>

        {/* User Type Selection */}
        <div className="mt-8 bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <div className="mb-6">
            <div className="grid grid-cols-3 gap-3">
              {userTypes.map(type => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setUserType(type.id)}
                  className={`
                    flex flex-col items-center justify-center p-4 rounded-lg
                    transition-colors duration-200
                    ${userType === type.id 
                      ? 'bg-red-50 text-red-700 ring-2 ring-red-600' 
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }
                  `}
                >
                  <div className="text-xl mb-2">{type.icon}</div>
                  <span className="text-sm font-medium">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center text-red-600">
                <FaExclamationCircle className="mr-2" />
                <span>{error}</span>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdEmail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="pl-10 block w-full border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="pl-10 pr-10 block w-full border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>

              <Link
                to="/forgot-password"
                className="text-sm font-medium text-red-600 hover:text-red-500"
              >
                Forgot password?
              </Link>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <FaGoogle className="h-5 w-5 text-red-500" />
                <span className="ml-2">Google</span>
              </button>

              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <FaFacebook className="h-5 w-5 text-blue-600" />
                <span className="ml-2">Facebook</span>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to={getRegistrationLink()}
                className="font-medium text-red-600 hover:text-red-500 inline-flex items-center"
              >
                <FaUserPlus className="mr-1" />
                Register now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login 