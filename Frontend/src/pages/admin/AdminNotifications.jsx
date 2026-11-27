import { Bell, Check, CheckCheck, Trash2 } from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useApp } from '../../context/AppContext';

function AdminNotifications() {
  const {
    adminNotifications,
    markAdminNotificationRead,
    markAllAdminNotificationsRead,
    deleteAdminNotification,
  } = useApp();

  const unreadCount = adminNotifications.filter((n) => !n.read).length;

  return (
    <DashboardLayout
      role="admin"
      title="Notifications"
      subtitle="Placement cell operational alerts, student registrations, and application updates"
    >
      <div className="page-header">
        <div>
          <h1>Admin Notifications</h1>
          <p>
            You have {unreadCount} unread operational alert{unreadCount === 1 ? '' : 's'}.
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            type="button"
            className="btn btn-outline"
            onClick={markAllAdminNotificationsRead}
          >
            <CheckCheck size={16} />
            Mark All as Read
          </button>
        )}
      </div>

      <section className="panel">
        {adminNotifications.length === 0 ? (
          <div className="empty-state">
            <Bell size={34} />
            <h3>No notifications</h3>
            <p>All placement cell alerts have been cleared.</p>
          </div>
        ) : (
          <div className="notification-list">
            {adminNotifications.map((notif) => (
              <div
                key={notif.id}
                className={`notification-item ${!notif.read ? 'unread' : ''}`}
              >
                <div className="notification-main">
                  <span className={`notification-dot ${notif.read ? 'read' : ''}`} />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <strong style={{ color: '#0f172a', fontSize: '0.94rem' }}>
                        {notif.title}
                      </strong>
                      {!notif.read && <span className="badge badge-blue">Unread</span>}
                    </div>
                    <p style={{ fontSize: '0.86rem', color: '#475569', marginTop: 4 }}>
                      {notif.message}
                    </p>
                    <div style={{ fontSize: '0.76rem', color: '#94a3b8', marginTop: 6 }}>
                      {notif.createdAt}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                  {!notif.read && (
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={() => markAdminNotificationRead(notif.id)}
                    >
                      <Check size={14} />
                      Mark Read
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn btn-danger-outline btn-sm"
                    onClick={() => deleteAdminNotification(notif.id)}
                    aria-label="Delete notification"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </DashboardLayout>
  );
}

export default AdminNotifications;
