import { Link } from 'react-router-dom'
import MobileMenu from './MobileMenu'

const Navbar = () => {
  return (
    <nav className="bg-red-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold">BloodBank</Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="hover:text-red-200">Home</Link>
            <Link to="/donor-registration" className="hover:text-red-200">Donate</Link>
            <Link to="/request-blood" className="hover:text-red-200">Request Blood</Link>
            <Link to="/inventory" className="hover:text-red-200">Inventory</Link>
            <Link to="/profile" className="hover:text-red-200">Profile</Link>
          </div>

          {/* Mobile Menu */}
          <MobileMenu />
        </div>
      </div>
    </nav>
  )
}

export default Navbar 