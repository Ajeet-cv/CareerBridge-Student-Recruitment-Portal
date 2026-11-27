import { NavLink, useNavigate } from 'react-router-dom';
import {
  Bell,
  Briefcase,
  Building2,
  CalendarClock,
  ClipboardCheck,
  FileBarChart2,
  LayoutDashboard,
  LogOut,
  UserCheck,
  Users,
  X,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import abesLogo from '../assets/abes-logo.jpg';

function Sidebar({ role, open, onClose }) {
  const { user, logout } = useAuth();
  const { studentNotifications, adminNotifications } = useApp();
  const navigate = useNavigate();

  const unreadCount =
    role === 'admin'
      ? adminNotifications.filter((n) => !n.read).length
      : studentNotifications.filter((n) => n.studentId === user?.id && !n.read).length;

  const studentLinks = [
    { to: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/student/profile', label: 'My Profile', icon: UserCheck },
    { to: '/student/jobs', label: 'Browse Jobs', icon: Briefcase },
    { to: '/student/applications', label: 'My Applications', icon: ClipboardCheck },
    { to: '/student/notifications', label: 'Notifications', icon: Bell, badge: unreadCount },
  ];

  const adminLinks = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/students', label: 'Manage Students', icon: Users },
    { to: '/admin/companies', label: 'Manage Companies', icon: Building2 },
    { to: '/admin/jobs', label: 'Manage Jobs', icon: Briefcase },
    { to: '/admin/applications', label: 'Manage Applications', icon: ClipboardCheck },
    { to: '/admin/interviews', label: 'Interview Scheduling', icon: CalendarClock },
    { to: '/admin/reports', label: 'Placement Reports', icon: FileBarChart2 },
    { to: '/admin/notifications', label: 'Notifications', icon: Bell, badge: unreadCount },
  ];

  const links = role === 'admin' ? adminLinks : studentLinks;

  const handleLogout = () => {
    logout();
    onClose?.();
    navigate('/login');
  };

  return (
    <>
      <div className={`sidebar-overlay ${open ? 'open' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${open ? 'open' : ''}`} aria-label="Portal Sidebar">
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="sidebar-logo-card">
              <img src={abesLogo} alt="ABES Placement Drive" className="sidebar-logo-img" />
            </div>
            <div style={{ lineHeight: 1.15 }}>
              <div style={{ fontSize: '0.96rem', fontWeight: 800 }}>CareerBridge</div>
              <div style={{ fontSize: '0.68rem', color: '#f3c65f', fontWeight: 600 }}>ABESEC</div>
            </div>
          </div>
          <span className="sidebar-role-tag">{role === 'admin' ? 'Admin' : 'Student'}</span>
          <button type="button" className="sidebar-close-btn" onClick={onClose} aria-label="Close sidebar">
            <X size={18} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              >
                <span className="sidebar-link-main">
                  <Icon size={18} />
                  <span>{item.label}</span>
                </span>
                {item.badge > 0 && <span className="sidebar-badge">{item.badge}</span>}
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button type="button" className="sidebar-link" onClick={handleLogout}>
            <span className="sidebar-link-main">
              <LogOut size={18} />
              <span>Logout</span>
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
