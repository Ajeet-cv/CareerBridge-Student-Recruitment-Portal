import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import abesLogo from '../assets/abes-logo.jpg';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSectionLink = (sectionId) => {
    setMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const dashboardPath = user?.role === 'admin' ? '/admin/dashboard' : '/student/dashboard';

  return (
    <header className="public-navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand-logo" onClick={() => setMenuOpen(false)}>
          <img
            src={abesLogo}
            alt="ABES Placement Drive Logo"
            className="brand-logo-img"
          />
          <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15, borderLeft: '1px solid var(--border)', paddingLeft: 10 }}>
            <span>
              Career<span className="accent">Bridge</span>
            </span>
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#6e747a', letterSpacing: '0.02em' }}>
              ABESEC Ghaziabad
            </span>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Primary navigation">
          <button type="button" className="nav-link" style={{ background: 'none', border: 'none' }} onClick={() => handleSectionLink('home')}>
            Home
          </button>
          <button type="button" className="nav-link" style={{ background: 'none', border: 'none' }} onClick={() => handleSectionLink('about')}>
            About
          </button>
          <button type="button" className="nav-link" style={{ background: 'none', border: 'none' }} onClick={() => handleSectionLink('opportunities')}>
            Opportunities
          </button>
          <button type="button" className="nav-link" style={{ background: 'none', border: 'none' }} onClick={() => handleSectionLink('contact')}>
            Contact
          </button>
        </nav>

        <div className="nav-actions">
          {user ? (
            <Link to={dashboardPath} className="btn btn-primary">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="mobile-menu-btn"
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className={`mobile-nav-drawer ${menuOpen ? 'open' : ''}`}>
        <button type="button" className="btn btn-ghost" style={{ justifyContent: 'flex-start' }} onClick={() => handleSectionLink('home')}>
          Home
        </button>
        <button type="button" className="btn btn-ghost" style={{ justifyContent: 'flex-start' }} onClick={() => handleSectionLink('about')}>
          About
        </button>
        <button type="button" className="btn btn-ghost" style={{ justifyContent: 'flex-start' }} onClick={() => handleSectionLink('opportunities')}>
          Opportunities
        </button>
        <button type="button" className="btn btn-ghost" style={{ justifyContent: 'flex-start' }} onClick={() => handleSectionLink('contact')}>
          Contact
        </button>
        {user ? (
          <Link to={dashboardPath} className="btn btn-primary" onClick={() => setMenuOpen(false)}>
            Go to Dashboard
          </Link>
        ) : (
          <div style={{ display: 'flex', gap: 10 }}>
            <Link to="/login" className="btn btn-outline" style={{ flex: 1 }} onClick={() => setMenuOpen(false)}>
              Login
            </Link>
            <Link to="/register" className="btn btn-primary" style={{ flex: 1 }} onClick={() => setMenuOpen(false)}>
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
