import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { 
  FaHospital,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaMapMarkerAlt,
  FaIdCard,
  FaBuilding,
  FaUserMd,
  FaCheck,
  FaExclamationTriangle,
  FaGlobe,
  FaAmbulance,
  FaClock,
  FaFileUpload,
  FaInfoCircle
} from 'react-icons/fa'
import { 
  MdLocalHospital, 
  MdVerified, 
  MdLocationCity,
  MdEmail,
  MdBloodtype
} from 'react-icons/md'
import { BiCurrentLocation } from 'react-icons/bi'

const HospitalRegistration = () => {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Basic Information
    hospitalName: '',
    registrationNumber: '',
    licenseNumber: '',
    type: '',
    yearEstablished: '',
    
    // Contact Information
    email: '',
    phone: '',
    emergencyContact: '',
    website: '',
    
    // Location Details
    address: '',
    city: '',
    state: '',
    zipCode: '',
    coordinates: {
      latitude: '',
      longitude: ''
    },
    
    // Facilities & Services
    facilities: [],
    bloodBankLicense: '',
    operatingHours: {
      weekday: '',
      weekend: ''
    },
    emergencyServices: false,
    ambulanceServices: false,
    
    // Account Security
    password: '',
    confirmPassword: '',
    
    // Documents
    registrationDoc: null,
    licenseDocs: null,
    
    // Terms
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

  const hospitalTypes = [
    "Government Hospital",
    "Private Hospital",
    "Multi-Specialty Hospital",
    "Blood Bank Center",
    "Community Health Center"
  ]

  const facilityOptions = [
    "24/7 Blood Bank",
    "Component Separation",
    "Mobile Blood Collection",
    "Plasma Storage",
    "Advanced Testing Lab",
    "Emergency Transfusion"
  ]

  // Step configuration
  const STEPS = [
    {
      number: 1,
      title: "Basic Details",
      icon: <FaHospital />,
      description: "Hospital information"
    },
    {
      number: 2,
      title: "Contact & Location",
      icon: <FaMapMarkerAlt />,
      description: "Contact details"
    },
    {
      number: 3,
      title: "Facilities",
      icon: <MdLocalHospital />,
      description: "Services offered"
    },
    {
      number: 4,
      title: "Verification",
      icon: <MdVerified />,
      description: "Documents & verification"
    }
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
    const { name, value, type, checked, files } = e.target
    
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }))
    } else if (type === 'checkbox') {
      if (name === 'facilities') {
        let updatedFacilities = [...formData.facilities]
        if (checked) {
          updatedFacilities.push(value)
        } else {
          updatedFacilities = updatedFacilities.filter(facility => facility !== value)
        }
        setFormData(prev => ({
          ...prev,
          facilities: updatedFacilities
        }))
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }))
      }
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

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            coordinates: {
              latitude: position.coords.latitude.toString(),
              longitude: position.coords.longitude.toString()
            }
          }))
        },
        (error) => {
          console.error("Error getting location:", error)
        }
      )
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

      // Create hospital account
      await signup(formData.email, formData.password)
      
      // Save additional hospital information
      // Add API call to save hospital details

      navigate('/hospital-dashboard')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
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
          </div>
        ))}
      </div>
    </div>
  )

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
            
            {/* Hospital Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Hospital Name</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaHospital className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="hospitalName"
                  value={formData.hospitalName}
                  onChange={handleInputChange}
                  className="pl-10 block w-full border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                  required
                />
              </div>
            </div>

            {/* Hospital Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Hospital Type</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaBuilding className="text-gray-400" />
                </div>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="pl-10 block w-full border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                  required
                >
                  <option value="">Select Hospital Type</option>
                  {hospitalTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Registration Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Registration Number</label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaIdCard className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleInputChange}
                    className="pl-10 block w-full border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Year Established</label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaClock className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="yearEstablished"
                    value={formData.yearEstablished}
                    onChange={handleInputChange}
                    className="pl-10 block w-full border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
              </div>
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
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Contact & Location</h2>
            
            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MdEmail className="text-gray-400" />
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

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="pl-10 block w-full border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    className="pl-10 block w-full border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Website</label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaGlobe className="text-gray-400" />
                  </div>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="pl-10 block w-full border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                    placeholder="https://"
                  />
                </div>
              </div>
            </div>

            {/* Location Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="text-gray-400" />
                  </div>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="pl-10 block w-full border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MdLocationCity className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="pl-10 block w-full border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">State</label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaMapMarkerAlt className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="pl-10 block w-full border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaMapMarkerAlt className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="pl-10 block w-full border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">GPS Coordinates</label>
                <div className="mt-1 flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <BiCurrentLocation className="mr-2" />
                    Get Current Location
                  </button>
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="coordinates.latitude"
                      value={formData.coordinates.latitude}
                      placeholder="Latitude"
                      readOnly
                      className="block w-full border-gray-300 rounded-lg bg-gray-50"
                    />
                    <input
                      type="text"
                      name="coordinates.longitude"
                      value={formData.coordinates.longitude}
                      placeholder="Longitude"
                      readOnly
                      className="block w-full border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                </div>
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
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Facilities & Services</h2>

            {/* Blood Bank License */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Blood Bank License Number</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdBloodtype className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="bloodBankLicense"
                  value={formData.bloodBankLicense}
                  onChange={handleInputChange}
                  className="pl-10 block w-full border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                  required
                />
              </div>
            </div>

            {/* Operating Hours */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Weekday Hours</label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaClock className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="operatingHours.weekday"
                    value={formData.operatingHours.weekday}
                    onChange={handleInputChange}
                    placeholder="e.g., 9:00 AM - 5:00 PM"
                    className="pl-10 block w-full border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Weekend Hours</label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaClock className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="operatingHours.weekend"
                    value={formData.operatingHours.weekend}
                    onChange={handleInputChange}
                    placeholder="e.g., 10:00 AM - 2:00 PM"
                    className="pl-10 block w-full border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Available Facilities */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Available Facilities</label>
              <div className="grid grid-cols-2 gap-4">
                {facilityOptions.map(facility => (
                  <label key={facility} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="facilities"
                      value={facility}
                      checked={formData.facilities.includes(facility)}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-700">{facility}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="emergencyServices"
                  checked={formData.emergencyServices}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className="text-sm text-gray-700">24/7 Emergency Services</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="ambulanceServices"
                  checked={formData.ambulanceServices}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className="text-sm text-gray-700">Ambulance Services</span>
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
                type="button"
                onClick={() => setStep(4)}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Verification & Documents</h2>

            {/* Document Upload */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Registration Document</label>
                <div className="mt-1">
                  <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      <FaFileUpload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500">
                          <span>Upload a file</span>
                          <input
                            type="file"
                            name="registrationDoc"
                            onChange={handleInputChange}
                            className="sr-only"
                            required
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PDF up to 10MB</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">License Documents</label>
                <div className="mt-1">
                  <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      <FaFileUpload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500">
                          <span>Upload files</span>
                          <input
                            type="file"
                            name="licenseDocs"
                            onChange={handleInputChange}
                            className="sr-only"
                            multiple
                            required
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PDF up to 10MB</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and Agreement */}
            <div className="space-y-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="agreement"
                  checked={formData.agreement}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  required
                />
                <span className="text-sm text-gray-700">
                  I agree to the <Link to="/terms" className="text-red-600 hover:text-red-700">Terms and Conditions</Link>
                </span>
              </label>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FaInfoCircle className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      Important Notice
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        By submitting this form, you confirm that all provided information is accurate and complete.
                        False information may result in registration cancellation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="text-gray-600 hover:text-gray-900"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400"
              >
                {loading ? 'Registering...' : 'Complete Registration'}
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Hospital Registration</h1>
          <p className="mt-2 text-gray-600">Join our network of blood banks and help save lives</p>
        </div>

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
            Already registered?{' '}
            <Link to="/login" className="text-red-600 hover:text-red-700 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default HospitalRegistration 