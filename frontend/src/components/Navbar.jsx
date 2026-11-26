import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight } from 'lucide-react'
import logo from '../assets/logo.svg'
import './Navbar.css'

const navItems = [
  { label: 'Overview', hash: '#problem-solution' },
  { label: 'Workflow', hash: '#workflow' },
  { label: 'Features', hash: '#features' },
  { label: 'Roles', hash: '#roles' },
  { label: 'FAQ', hash: '#faq' },
]

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleSectionClick = (hash) => {
    closeMenu()
    if (location.pathname === '/') {
      const target = document.getElementById(hash.replace('#', ''))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <header className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <img src={logo} alt="CareerBridge logo" className="navbar-logo" />
          <div className="navbar-brand-text">
            <span className="navbar-title">CareerBridge</span>
            <span className="navbar-subtitle">Campus Recruitment</span>
          </div>
        </Link>

        <nav className={`navbar-nav ${isMenuOpen ? 'navbar-nav-open' : ''}`}>
          {navItems.map((item) => (
            <Link
              key={item.hash}
              to={`/${item.hash}`}
              className="navbar-link"
              onClick={() => handleSectionClick(item.hash)}
            >
              {item.label}
            </Link>
          ))}

          <div className="navbar-actions-mobile">
            <Link to="/opportunities" className="btn btn-outline btn-sm" onClick={closeMenu}>
              Explore Opportunities
            </Link>
            <Link to="/get-started" className="btn btn-secondary btn-sm" onClick={closeMenu}>
              Get Started
              <ArrowRight size={15} />
            </Link>
          </div>
        </nav>

        <div className="navbar-actions">
          <Link to="/opportunities" className="btn btn-ghost btn-sm">
            Explore Opportunities
          </Link>
          <Link to="/get-started" className="btn btn-secondary btn-sm">
            Get Started
            <ArrowRight size={15} />
          </Link>
        </div>

        <button
          type="button"
          className="navbar-toggle"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  )
}

export default Navbar
