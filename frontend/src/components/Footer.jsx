import React from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap, Building2, Layers } from 'lucide-react'
import logo from '../assets/logo.svg'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-brand-link">
              <img src={logo} alt="CareerBridge logo" className="footer-logo" />
              <span className="footer-brand-name">CareerBridge</span>
            </Link>
            <p className="footer-description">
              Bridging Students and Opportunities. A modern campus recruitment portal connecting
              university talent, recruiters, and placement cells.
            </p>
            <span className="footer-phase-pill">Phase 2 · Campus Landing Experience</span>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Platform</h4>
            <ul className="footer-list">
              <li>
                <Link to="/#problem-solution">Why CareerBridge</Link>
              </li>
              <li>
                <Link to="/#workflow">Placement Workflow</Link>
              </li>
              <li>
                <Link to="/#features">Core Features</Link>
              </li>
              <li>
                <Link to="/#faq">FAQ</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Portal Access</h4>
            <ul className="footer-list footer-list-icons">
              <li>
                <GraduationCap size={15} />
                <Link to="/#roles">Student Portal</Link>
              </li>
              <li>
                <Building2 size={15} />
                <Link to="/#roles">Recruiter Hub</Link>
              </li>
              <li>
                <Layers size={15} />
                <Link to="/opportunities">Explore Opportunities</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Project Info</h4>
            <ul className="footer-list">
              <li>Project ID: 95</li>
              <li>Department: CSE-11</li>
              <li>Stack: React + Vite + CSS3</li>
              <li>
                <Link to="/get-started">Get Started Preview</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} CareerBridge – Student Recruitment Portal. All rights reserved.</p>
          <p className="footer-authors">Developed by Akash Rauniyar &amp; Ajeet Chaursiya</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
