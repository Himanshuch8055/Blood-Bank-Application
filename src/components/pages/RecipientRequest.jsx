import { useState } from 'react'

const RecipientRequest = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    bloodGroup: '',
    unitsRequired: '',
    hospital: '',
    urgency: 'normal',
    contactPerson: '',
    phone: '',
    email: '',
    requiredDate: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log(formData)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-red-600 mb-8">Request Blood</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">Patient Name</label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Blood Group Required</label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
              required
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">Units Required</label>
            <input
              type="number"
              name="unitsRequired"
              value={formData.unitsRequired}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Urgency Level</label>
            <select
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
              required
            >
              <option value="normal">Normal</option>
              <option value="urgent">Urgent</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Hospital Name</label>
          <input
            type="text"
            name="hospital"
            value={formData.hospital}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">Contact Person</label>
            <input
              type="text"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200"
        >
          Submit Request
        </button>
      </form>
    </div>
  )
}

export default RecipientRequest 