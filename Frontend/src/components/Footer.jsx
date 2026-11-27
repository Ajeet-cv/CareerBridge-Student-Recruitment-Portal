import { Link } from 'react-router-dom';
import { Globe, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import abesLogo from '../assets/abes-logo.jpg';

function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-logo-card">
              <img src={abesLogo} alt="ABES Placement Drive" style={{ height: 48, width: 'auto', objectFit: 'contain' }} />
            </div>
            <div className="brand-logo" style={{ color: '#ffffff', marginBottom: 10 }}>
              <span>
                Career<span style={{ color: '#f3c65f' }}>Bridge</span>
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', color: '#d6ccc8', maxWidth: 320, lineHeight: 1.65 }}>
              A unified university placement & recruitment portal connecting graduating talent with leading global employers through automated eligibility and transparent workflows.
            </p>
          </div>

          <div>
            <div className="footer-heading">Platform</div>
            <div className="footer-links">
              <a href="#home">Home</a>
              <a href="#about">How It Works</a>
              <a href="#opportunities">Opportunities</a>
              <Link to="/login">Student Portal</Link>
              <Link to="/login">Placement Cell Admin</Link>
            </div>
          </div>

          <div>
            <div className="footer-heading">Quick Access</div>
            <div className="footer-links">
              <Link to="/register">Student Registration</Link>
              <Link to="/login">Sign In</Link>
              <a href="#companies">Hiring Partners</a>
              <a href="#success">Student Outcomes</a>
            </div>
          </div>

          <div>
            <div className="footer-heading">Contact Placement Cell</div>
            <div className="footer-links" style={{ color: '#94a3b8' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <Mail size={15} /> placements@careerbridge.edu
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <Phone size={15} /> +91 11 2659 7135
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <MapPin size={15} /> ABESEC Ghaziabad, Campus Placement Cell
              </span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ color: '#e2e8f0', fontWeight: 500 }}>
              {'Developed & Maintained By: <Team member-1 Ajeet Chaurasiya>, <Team Member-2 Akash Rauniyar> (<Branch - CSE and section - 11>)'}
            </span>
            <span style={{ color: '#f3c65f', fontWeight: 600, fontSize: '0.8rem' }}>
              Full Stack Development Team
            </span>
            <span>© 2026 ABESEC Ghaziabad. All Rights Reserved.</span>
          </div>
          <div className="social-links">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-link" aria-label="LinkedIn">
              <Linkedin size={16} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-link" aria-label="Twitter">
              <Twitter size={16} />
            </a>
            <a href="https://careerbridge.edu" target="_blank" rel="noreferrer" className="social-link" aria-label="Website">
              <Globe size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
