import { Bell, Check, CheckCheck, Trash2 } from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

function Notifications() {
  const { user } = useAuth();
  const {
    studentNotifications,
    markStudentNotificationRead,
    markAllStudentNotificationsRead,
    deleteStudentNotification,
  } = useApp();

  const myList = studentNotifications.filter((n) => n.studentId === user?.id);
  const unreadCount = myList.filter((n) => !n.read).length;

  return (
    <DashboardLayout
      role="student"
      title="Notifications"
      subtitle="Stay updated on new companies, drive openings, shortlists, and interviews"
    >
      <div className="page-header">
        <div>
          <h1>Student Notifications</h1>
          <p>
            You have {unreadCount} unread notification{unreadCount === 1 ? '' : 's'}.
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => markAllStudentNotificationsRead(user?.id)}
          >
            <CheckCheck size={16} />
            Mark All as Read
          </button>
        )}
      </div>

      <section className="panel">
        {myList.length === 0 ? (
          <div className="empty-state">
            <Bell size={34} />
            <h3>No notifications right now</h3>
            <p>Important placement updates and interview alerts will appear here.</p>
          </div>
        ) : (
          <div className="notification-list">
            {myList.map((notif) => (
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
                      onClick={() => markStudentNotificationRead(notif.id)}
                      title="Mark as read"
                    >
                      <Check size={14} />
                      Mark Read
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn btn-danger-outline btn-sm"
                    onClick={() => deleteStudentNotification(notif.id)}
                    aria-label="Delete notification"
                    title="Delete notification"
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

export default Notifications;
