import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  Bell,
  Briefcase,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import StatCard from '../../components/StatCard';
import StatusBadge from '../../components/StatusBadge';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { checkJobEligibility } from '../../services/storage';

function padTwo(n) {
  return String(n).padStart(2, '0');
}

function StudentDashboard() {
  const { user } = useAuth();
  const { jobs, companies, students, applications, interviews, studentNotifications } = useApp();

  const student = students.find((s) => s.id === user?.id) || students[0];
  const openJobs = jobs.filter((j) => j.status === 'Open');
  const myApps = applications.filter((a) => a.studentId === student?.id);
  const shortlistedCount = myApps.filter((a) => a.status === 'Shortlisted').length;
  const selectedCount = myApps.filter((a) => a.status === 'Selected').length;

  const recentJobs = [...openJobs]
    .sort((a, b) => b.postedDate.localeCompare(a.postedDate))
    .slice(0, 4);

  const myUpcomingInterviews = interviews.filter(
    (iv) => iv.status === 'Upcoming' && iv.studentIds.includes(student?.id)
  );

  const myNotifications = studentNotifications
    .filter((n) => n.studentId === student?.id)
    .slice(0, 4);

  const statusBreakdown = [
    { label: 'Applied', count: myApps.filter((a) => a.status === 'Applied').length, color: '#7a1624' },
    { label: 'Shortlisted', count: shortlistedCount, color: '#d97706' },
    {
      label: 'Interview Scheduled',
      count: myApps.filter((a) => a.status === 'Interview Scheduled').length,
      color: '#7c3aed',
    },
    { label: 'Selected', count: selectedCount, color: '#16a34a' },
    { label: 'Rejected', count: myApps.filter((a) => a.status === 'Rejected').length, color: '#dc2626' },
  ];

  const recommendedCompanies = companies
    .map((comp) => {
      const compOpenJobs = openJobs.filter((j) => j.companyId === comp.id);
      const eligibleJobs = compOpenJobs.filter(
        (j) => checkJobEligibility(student, j).eligible
      );
      return {
        ...comp,
        openCount: compOpenJobs.length,
        eligibleCount: eligibleJobs.length,
      };
    })
    .filter((c) => c.openCount > 0)
    .slice(0, 4);

  return (
    <DashboardLayout
      role="student"
      title="Student Dashboard"
      subtitle={`${student?.enrollmentNumber || ''} • ${student?.department || ''} • CGPA ${student?.cgpa || ''}`}
    >
      {/* Welcome Banner */}
      <section className="welcome-banner">
        <div>
          <h1>Welcome back, Student!</h1>
          <p>
            Signed in as <strong>{student?.fullName}</strong> ({student?.department}, Batch {student?.graduationYear}). Track your placement drives, eligibility, and interview rounds below.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Link to="/student/jobs" className="btn btn-primary">
            Browse Open Jobs
            <ArrowRight size={16} />
          </Link>
          <Link
            to="/student/profile"
            className="btn btn-outline"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#ffffff', borderColor: 'rgba(255,255,255,0.25)' }}
          >
            Update Profile
          </Link>
        </div>
      </section>

      {/* Statistics Cards */}
      <section className="stats-grid">
        <StatCard
          label="Available Jobs"
          value={padTwo(openJobs.length)}
          subtext="Active campus drives open now"
          icon={Briefcase}
          tone="blue"
        />
        <StatCard
          label="Applied Jobs"
          value={padTwo(myApps.length)}
          subtext="Total applications submitted"
          icon={ClipboardCheck}
          tone="navy"
        />
        <StatCard
          label="Shortlisted"
          value={padTwo(shortlistedCount)}
          subtext="Cleared initial screening"
          icon={Sparkles}
          tone="amber"
        />
        <StatCard
          label="Selected"
          value={padTwo(selectedCount)}
          subtext="Final placement offers received"
          icon={Award}
          tone="green"
        />
      </section>

      {/* Main Grid: Recent Jobs & Application Overview */}
      <div className="dashboard-grid-2">
        <section className="panel">
          <div className="panel-header">
            <h2 className="panel-title">Recent Job Opportunities</h2>
            <Link to="/student/jobs" className="link-btn">
              View All ({openJobs.length}) →
            </Link>
          </div>
          <div className="panel-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {recentJobs.map((job) => {
              const company = companies.find((c) => c.id === job.companyId);
              const { eligible } = checkJobEligibility(student, job);
              const applied = myApps.some((a) => a.jobId === job.id);

              return (
                <div
                  key={job.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                    padding: '12px 14px',
                    border: '1px solid var(--border)',
                    borderRadius: 10,
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div
                      className="company-logo-box"
                      style={{
                        width: 40,
                        height: 40,
                        fontSize: '0.8rem',
                        backgroundColor: company?.color || '#7a1624',
                      }}
                    >
                      {company?.shortCode || 'CO'}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.94rem' }}>
                        {job.title}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                        {company?.name} • {job.location} • <strong>{job.packageLPA} LPA</strong>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <StatusBadge status={eligible ? 'Eligible' : 'Not Eligible'} />
                    {applied && <span className="badge badge-blue">Applied</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <h2 className="panel-title">Application Status Overview</h2>
            <Link to="/student/applications" className="link-btn">
              Track All →
            </Link>
          </div>
          <div className="panel-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {statusBreakdown.map((item) => {
              const pct = myApps.length ? Math.round((item.count / myApps.length) * 100) : 0;
              return (
                <div key={item.label}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '0.86rem',
                      marginBottom: 6,
                    }}
                  >
                    <span style={{ fontWeight: 600, color: '#334155' }}>{item.label}</span>
                    <span style={{ color: '#64748b', fontWeight: 600 }}>
                      {item.count} ({pct}%)
                    </span>
                  </div>
                  <div
                    style={{
                      height: 8,
                      borderRadius: 999,
                      backgroundColor: '#f1f5f9',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${pct}%`,
                        height: '100%',
                        backgroundColor: item.color,
                        borderRadius: 999,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Bottom Grid: Upcoming Interviews, Notifications, Recommended Companies */}
      <div className="dashboard-grid-equal">
        <section className="panel">
          <div className="panel-header">
            <h2 className="panel-title">Upcoming Interviews</h2>
            <span className="badge badge-purple">{myUpcomingInterviews.length} Scheduled</span>
          </div>
          <div className="panel-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {myUpcomingInterviews.length === 0 ? (
              <div className="empty-state" style={{ padding: '24px 12px' }}>
                <CalendarClock size={28} />
                <p style={{ marginTop: 8 }}>No upcoming interviews scheduled yet.</p>
              </div>
            ) : (
              myUpcomingInterviews.map((iv) => {
                const comp = companies.find((c) => c.id === iv.companyId);
                const job = jobs.find((j) => j.id === iv.jobId);
                const isUrl = iv.locationOrLink?.startsWith('http');
                return (
                  <div
                    key={iv.id}
                    style={{
                      padding: 14,
                      borderRadius: 10,
                      border: '1px solid var(--border)',
                      backgroundColor: 'var(--bg)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: 8,
                        marginBottom: 6,
                      }}
                    >
                      <strong style={{ color: '#4a0e17', fontSize: '0.93rem' }}>
                        {comp?.name} – {job?.title}
                      </strong>
                      <StatusBadge status={iv.status} />
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#475569', marginBottom: 4 }}>
                      Date: <strong>{iv.date}</strong> at <strong>{iv.time}</strong>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#475569' }}>
                      {isUrl ? (
                        <a
                          href={iv.locationOrLink}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: '#7a1624', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}
                        >
                          Join Interview Link <ExternalLink size={13} />
                        </a>
                      ) : (
                        <span>Venue: {iv.locationOrLink}</span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <h2 className="panel-title">Recent Notifications</h2>
            <Link to="/student/notifications" className="link-btn">
              All Alerts →
            </Link>
          </div>
          <div className="notification-list">
            {myNotifications.length === 0 ? (
              <div className="empty-state" style={{ padding: '24px 12px' }}>
                <Bell size={26} />
                <p style={{ marginTop: 8 }}>You are all caught up.</p>
              </div>
            ) : (
              myNotifications.map((notif) => (
                <div key={notif.id} className={`notification-item ${!notif.read ? 'unread' : ''}`}>
                  <div className="notification-main">
                    <span className={`notification-dot ${notif.read ? 'read' : ''}`} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#0f172a' }}>
                        {notif.title}
                      </div>
                      <div style={{ fontSize: '0.81rem', color: '#475569', marginTop: 2 }}>
                        {notif.message}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: 4 }}>
                        {notif.createdAt}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* Recommended Companies */}
      <section className="panel">
        <div className="panel-header">
          <h2 className="panel-title">Recommended Companies for Your Profile</h2>
          <Link to="/student/jobs" className="link-btn">
            Explore Eligible Roles →
          </Link>
        </div>
        <div
          className="panel-body"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 14,
          }}
        >
          {recommendedCompanies.map((comp) => (
            <div
              key={comp.id}
              style={{
                border: '1px solid var(--border)',
                borderRadius: 10,
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  className="company-logo-box"
                  style={{ width: 40, height: 40, backgroundColor: comp.color }}
                >
                  {comp.shortCode}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#4a0e17' }}>{comp.name}</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{comp.industry}</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem' }}>
                <span style={{ color: '#475569' }}>{comp.openCount} open drive(s)</span>
                <span className="badge badge-green">
                  <CheckCircle2 size={12} /> {comp.eligibleCount} Eligible
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
}

export default StudentDashboard;
