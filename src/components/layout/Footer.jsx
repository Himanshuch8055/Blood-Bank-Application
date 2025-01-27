import { Link } from 'react-router-dom'
import {
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { MdEmergencyShare } from "react-icons/md";
import { PiFirstAidDuotone } from "react-icons/pi";

const FOOTER_CONFIG = {
  brandName: 'BloodBank',
  tagline: 'Connecting donors with those in need',
  currentYear: new Date().getFullYear()
}

const FOOTER_LINKS = {
  quickLinks: {
    title: 'Quick Links',
    links: [
      { label: 'About Us', path: '/about' },
      { label: 'Become a Donor', path: '/donor-registration' },
      { label: 'Request Blood', path: '/request-blood' },
      { label: 'Blood Banks', path: '/blood-banks' },
      { label: 'Contact Us', path: '/contact' }
    ]
  },
  support: {
    title: 'Support',
    links: [
      { label: 'FAQ', path: '/faq' },
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' },
      { label: 'Help Center', path: '/help' }
    ]
  },
  connect: {
    title: 'Connect',
    links: [
      { label: 'Facebook', path: 'https://facebook.com', external: true },
      { label: 'Twitter', path: 'https://twitter.com', external: true },
      { label: 'Instagram', path: 'https://instagram.com', external: true },
      { label: 'LinkedIn', path: 'https://linkedin.com', external: true }
    ]
  },
  contact: {
    title: 'Contact Info',
    items: [
      { label: 'Emergency: +1 (555) 123-4567', icon: <MdEmergencyShare /> },
      { label: 'Email: help@bloodbank.com', icon: <FaEnvelope /> },
      { label: 'Location: 123 Medical Center', icon: <FaMapMarkerAlt /> }
    ]
  }
}

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-red-700 to-red-900 text-white">
      {/* <FooterNewsletter /> */}
      
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="p-2 rounded-full bg-red-800/50 group-hover:bg-red-700/50 transition-all duration-300">
                <PiFirstAidDuotone className="text-2xl" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{FOOTER_CONFIG.brandName}</h3>
                <p className="text-red-200 text-sm">{FOOTER_CONFIG.tagline}</p>
              </div>
            </Link>
            
            {/* Contact Information */}
            <div className="mt-6 space-y-4">
              {FOOTER_LINKS.contact.items.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-red-100">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <FooterLinkSection
              title={FOOTER_LINKS.quickLinks.title}
              links={FOOTER_LINKS.quickLinks.links}
            />
          </div>

          {/* Support Section */}
          <div>
            <FooterLinkSection
              title={FOOTER_LINKS.support.title}
              links={FOOTER_LINKS.support.links}
            />
          </div>

          {/* Social Links Section */}
          <div>
            <FooterLinkSection
              title={FOOTER_LINKS.connect.title}
              links={FOOTER_LINKS.connect.links}
            />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-red-600/30">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-red-200 text-sm">
              © {FOOTER_CONFIG.currentYear} {FOOTER_CONFIG.brandName}. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-red-200 hover:text-white text-sm transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-red-200 hover:text-white text-sm transition-colors duration-300">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-red-200 hover:text-white text-sm transition-colors duration-300">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

const FooterLinkSection = ({ title, links }) => (
  <div>
    <h4 className="font-semibold text-lg mb-4">{title}</h4>
    <ul className="space-y-3">
      {links.map((link, index) => (
        <li key={index}>
          {link.external ? (
            <a
              href={link.path}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-200 hover:text-white transition-colors duration-300 flex items-center space-x-2"
            >
              <span>{link.label}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ) : (
            <Link
              to={link.path}
              className="text-red-200 hover:text-white transition-colors duration-300"
            >
              {link.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  </div>
)

export default Footer 