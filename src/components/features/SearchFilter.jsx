import { useState } from 'react'

const SearchFilter = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    bloodGroup: '',
    availability: 'all'
  })

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch(value)
  }

  const handleFilter = (e) => {
    const { name, value } = e.target
    const newFilters = { ...filters, [name]: value }
    setFilters(newFilters)
    onFilter(newFilters)
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
          />
        </div>
        <div>
          <select
            name="bloodGroup"
            value={filters.bloodGroup}
            onChange={handleFilter}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
          >
            <option value="">All Blood Groups</option>
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
          <select
            name="availability"
            value={filters.availability}
            onChange={handleFilter}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="shortage">Shortage</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default SearchFilter 