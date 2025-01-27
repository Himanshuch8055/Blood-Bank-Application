import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaCalendarAlt,
  FaTint,
  FaIdCard,
  FaWeight,
  FaRulerVertical,
  FaHistory,
  FaHeartbeat,
  FaCheck,
  FaExclamationTriangle
} from 'react-icons/fa'
import { MdBloodtype } from 'react-icons/md'

// Add step configuration
const STEPS = [
  {
    number: 1,
    title: "Personal Details",
    icon: <FaUser />,
    description: "Basic information"
  },
  {
    number: 2,
    title: "Medical History",
    icon: <FaHeartbeat />,
    description: "Health information"
  },
  {
    number: 3,
    title: "Account Setup",
    icon: <FaLock />,
    description: "Create your account"
  }
]

const DonorRegistration = () => {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    bloodType: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    weight: '',
    height: '',
    lastDonation: '',
    medicalConditions: [],
    medications: [],
    idType: '',
    idNumber: '',
    emergencyContact: {
      name: '',
      relation: '',
      phone: ''
    },
    agreement: false
  })

  const [validations, setValidations] = useState({
    password: {
      minLength: false,
      hasNumber: false,
      hasSpecial: false,
      hasUpper: false
    }
  })

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
  const medicalConditionsList = [
    "Diabetes",
    "High Blood Pressure",
    "Heart Disease",
    "HIV/AIDS",
    "Hepatitis",
    "Cancer",
    "None"
  ]

  const validatePassword = (password) => {
    setValidations({
      password: {
        minLength: password.length >= 8,
        hasNumber: /\d/.test(password),
        hasSpecial: /[!@#$%^&*]/.test(password),
        hasUpper: /[A-Z]/.test(password)
      }
    })
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (type === 'checkbox') {
      if (name === 'medicalConditions') {
        let updatedConditions = [...formData.medicalConditions]
        if (checked) {
          updatedConditions.push(value)
        } else {
          updatedConditions = updatedConditions.filter(condition => condition !== value)
        }
        setFormData(prev => ({
          ...prev,
          medicalConditions: updatedConditions
        }))
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }))
      }
    } else if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
      if (name === 'password') {
        validatePassword(value)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Validate form data
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match')
      }

      if (!formData.agreement) {
        throw new Error('Please agree to the terms and conditions')
      }

      // Create user account
      await signup(formData.email, formData.password)
      
      // Save additional donor information
      // Add API call to save donor details

      navigate('/donor-dashboard')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="pl-10 block w-full border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="pl-10 block w-full border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
              </div>

              {/* Add more personal information fields */}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Medical Information</h2>
            
            {/* Blood Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Blood Type</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdBloodtype className="text-gray-400" />
                </div>
                <select
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleInputChange}
                  className="pl-10 block w-full border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                  required
                >
                  <option value="">Select Blood Type</option>
                  {bloodTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Medical Conditions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Medical Conditions
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {medicalConditionsList.map(condition => (
                  <label key={condition} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="medicalConditions"
                      value={condition}
                      checked={formData.medicalConditions.includes(condition)}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-700">{condition}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-gray-600 hover:text-gray-900"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Account Setup</h2>
            
            {/* Email and Password fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 block w-full border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
              </div>

              {/* Password validation indicators */}
              <div className="space-y-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 block w-full border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className={`flex items-center space-x-2 ${validations.password.minLength ? 'text-green-600' : 'text-gray-500'}`}>
                    <FaCheck className={validations.password.minLength ? 'opacity-100' : 'opacity-50'} />
                    <span>At least 8 characters</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${validations.password.hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
                    <FaCheck className={validations.password.hasNumber ? 'opacity-100' : 'opacity-50'} />
                    <span>Contains a number</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${validations.password.hasUpper ? 'text-green-600' : 'text-gray-500'}`}>
                    <FaCheck className={validations.password.hasUpper ? 'opacity-100' : 'opacity-50'} />
                    <span>Contains uppercase</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${validations.password.hasSpecial ? 'text-green-600' : 'text-gray-500'}`}>
                    <FaCheck className={validations.password.hasSpecial ? 'opacity-100' : 'opacity-50'} />
                    <span>Contains special char</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and Agreement */}
            <div className="mt-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="agreement"
                  checked={formData.agreement}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className="text-sm text-gray-700">
                  I agree to the <Link to="/terms" className="text-red-600 hover:text-red-700">Terms and Conditions</Link>
                </span>
              </label>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-gray-600 hover:text-gray-900"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400"
              >
                Register
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const renderProgressSteps = () => (
    <div className="mb-8">
      <div className="flex justify-between items-center relative">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2" />
        <div 
          className="absolute top-1/2 left-0 h-1 bg-red-600 -translate-y-1/2 transition-all duration-300"
          style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
        />

        {/* Steps */}
        {STEPS.map((stepItem) => (
          <div key={stepItem.number} className="relative flex flex-col items-center">
            {/* Step Circle */}
            <div
              className={`
                w-12 h-12 rounded-full flex items-center justify-center
                transition-all duration-300 z-10
                ${stepItem.number <= step 
                  ? 'bg-red-600 text-white' 
                  : 'bg-white text-gray-400 border-2 border-gray-200'
                }
                ${stepItem.number < step && 'ring-4 ring-red-100'}
              `}
            >
              {stepItem.number === step ? (
                stepItem.icon
              ) : (
                <span className="text-lg font-semibold">{stepItem.number}</span>
              )}
            </div>

            {/* Step Title */}
            <div className="absolute -bottom-8 w-32 text-center">
              <p className={`
                font-medium mb-1 text-sm
                ${stepItem.number <= step ? 'text-gray-900' : 'text-gray-500'}
              `}>
                {stepItem.title}
              </p>
              <p className={`
                text-xs
                ${stepItem.number <= step ? 'text-gray-600' : 'text-gray-400'}
              `}>
                {stepItem.description}
              </p>
            </div>

            {/* Step Status */}
            {stepItem.number < step && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-green-100 text-green-600 px-2 py-1 rounded text-xs">
                Completed
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Donor Registration</h1>
          <p className="mt-2 text-gray-600">Join our community of blood donors and help save lives</p>
        </div>

        {/* Replace old progress steps with new one */}
        {renderProgressSteps()}

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center text-red-600">
              <FaExclamationTriangle className="mr-2" />
              <span>{error}</span>
            </div>
          </div>
        )}

        <div className="bg-white shadow-lg rounded-lg p-8 mt-16">
          <form onSubmit={handleSubmit}>
            {renderStep()}
          </form>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-red-600 hover:text-red-700 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default DonorRegistration 