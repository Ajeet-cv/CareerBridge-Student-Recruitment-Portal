import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Menu } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

function DashboardLayout({ role, title, subtitle, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const { studentNotifications, adminNotifications } = useApp();
  const navigate = useNavigate();

  const unreadCount =
    role === 'admin'
      ? adminNotifications.filter((n) => !n.read).length
      : studentNotifications.filter((n) => n.studentId === user?.id && !n.read).length;

  const initials = (user?.name || 'CB')
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const notifPath = role === 'admin' ? '/admin/notifications' : '/student/notifications';

  return (
    <div className="dashboard-shell">
      <Sidebar role={role} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="topbar-left">
            <button
              type="button"
              className="topbar-menu-btn"
              aria-label="Open sidebar"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div>
              <div className="topbar-title">{title}</div>
              {subtitle && <div className="topbar-subtitle">{subtitle}</div>}
            </div>
          </div>

          <div className="topbar-right">
            <button
              type="button"
              className="icon-bell-btn"
              aria-label="Notifications"
              onClick={() => navigate(notifPath)}
            >
              <Bell size={18} />
              {unreadCount > 0 && <span className="bell-dot">{unreadCount}</span>}
            </button>

            <div className="user-pill">
              <div className="user-pill-avatar">{initials}</div>
              <div className="user-pill-info">
                <div className="user-pill-name">{user?.name}</div>
                <div className="user-pill-role">
                  {role === 'admin' ? 'Placement Admin' : user?.department || 'Student'}
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
