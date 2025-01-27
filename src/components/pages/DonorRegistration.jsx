import { useState } from 'react'

const DonorRegistration = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    bloodGroup: '',
    phone: '',
    email: '',
    address: '',
    lastDonation: '',
    medicalConditions: ''
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
      <h2 className="text-3xl font-bold text-red-600 mb-8">Donor Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Blood Group</label>
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
          <label className="block text-gray-700 mb-2">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
            rows="3"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Last Donation Date</label>
          <input
            type="date"
            name="lastDonation"
            value={formData.lastDonation}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Medical Conditions (if any)</label>
          <textarea
            name="medicalConditions"
            value={formData.medicalConditions}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
            rows="3"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200"
        >
          Register as Donor
        </button>
      </form>
    </div>
  )
}

export default DonorRegistration 