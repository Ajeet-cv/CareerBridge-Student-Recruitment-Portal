import { Link } from 'react-router-dom';
import {
  Activity,
  Award,
  Briefcase,
  Building2,
  CalendarClock,
  ClipboardCheck,
  UserCheck,
  UserMinus,
  Users,
} from 'lucide-react';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import DashboardLayout from '../../layouts/DashboardLayout';
import StatCard from '../../components/StatCard';
import StatusBadge from '../../components/StatusBadge';
import { useApp } from '../../context/AppContext';
import { DEPARTMENTS } from '../../services/storage';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

function AdminDashboard() {
  const { students, companies, jobs, applications, interviews, activities } = useApp();

  const placedStudentIds = new Set(
    applications.filter((a) => a.status === 'Selected').map((a) => a.studentId)
  );
  const selectedCount = placedStudentIds.size;
  const unplacedCount = Math.max(0, students.length - selectedCount);

  const recentApps = applications.slice(0, 5);
  const recentStudents = [...students]
    .sort((a, b) => (b.registeredAt || '').localeCompare(a.registeredAt || ''))
    .slice(0, 5);
  const upcomingInterviews = interviews.filter((i) => i.status === 'Upcoming').slice(0, 4);

  const deptChartData = {
    labels: DEPARTMENTS.map((d) => d.split(' ')[0]),
    datasets: [
      {
        label: 'Total Students',
        data: DEPARTMENTS.map((dept) => students.filter((s) => s.department === dept).length),
        backgroundColor: '#f3c65f',
        borderRadius: 6,
      },
      {
        label: 'Placed Students',
        data: DEPARTMENTS.map(
          (dept) =>
            students.filter((s) => s.department === dept && placedStudentIds.has(s.id)).length
        ),
        backgroundColor: '#7a1624',
        borderRadius: 6,
      },
    ],
  };

  const placementPieData = {
    labels: ['Placed Students', 'Unplaced Students'],
    datasets: [
      {
        data: [selectedCount, unplacedCount],
        backgroundColor: ['#16a34a', '#e2e8f0'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <DashboardLayout
      role="admin"
      title="Admin Dashboard"
      subtitle="Placement Cell Overview • Real-time campus recruitment control center"
    >
      <div className="page-header">
        <div>
          <h1>Placement Cell Command Center</h1>
          <p>Monitor student registrations, company drives, applications, and interview pipelines.</p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Link to="/admin/jobs" className="btn btn-outline btn-sm">
            + Post Job Opening
          </Link>
          <Link to="/admin/interviews" className="btn btn-primary btn-sm">
            Schedule Interview
          </Link>
        </div>
      </div>

      {/* 6 KPI Stat Cards */}
      <section className="stats-grid cols-6">
        <StatCard
          label="Total Students"
          value={students.length}
          subtext="Registered graduating candidates"
          icon={Users}
          tone="blue"
        />
        <StatCard
          label="Total Companies"
          value={companies.length}
          subtext="Active hiring partners"
          icon={Building2}
          tone="navy"
        />
        <StatCard
          label="Total Job Openings"
          value={jobs.filter((j) => j.status === 'Open').length}
          subtext={`${jobs.length} total drives created`}
          icon={Briefcase}
          tone="purple"
        />
        <StatCard
          label="Total Applications"
          value={applications.length}
          subtext="Submitted across all drives"
          icon={ClipboardCheck}
          tone="amber"
        />
        <StatCard
          label="Selected Students"
          value={selectedCount}
          subtext="Confirmed placement offers"
          icon={Award}
          tone="green"
        />
        <StatCard
          label="Unplaced Students"
          value={unplacedCount}
          subtext="Eligible & actively interviewing"
          icon={UserMinus}
          tone="red"
        />
      </section>

      {/* Placement Overview Charts */}
      <div className="dashboard-grid-2">
        <section className="panel">
          <div className="panel-header">
            <h2 className="panel-title">Department-wise Placement Overview</h2>
            <Link to="/admin/reports" className="link-btn">
              Full Analytics →
            </Link>
          </div>
          <div className="panel-body">
            <div className="chart-container" style={{ height: 270 }}>
              <Bar
                data={deptChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { position: 'top' } },
                  scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
                }}
              />
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <h2 className="panel-title">Placed vs Unplaced Split</h2>
            <span className="badge badge-green">
              {students.length ? Math.round((selectedCount / students.length) * 100) : 0}% Placed
            </span>
          </div>
          <div className="panel-body">
            <div className="chart-container" style={{ height: 270 }}>
              <Doughnut
                data={placementPieData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { position: 'bottom' } },
                  cutout: '64%',
                }}
              />
            </div>
          </div>
        </section>
      </div>

      {/* Recent Applications & Registered Students */}
      <div className="dashboard-grid-equal">
        <section className="panel">
          <div className="panel-header">
            <h2 className="panel-title">Recent Applications</h2>
            <Link to="/admin/applications" className="link-btn">
              Manage All →
            </Link>
          </div>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Company & Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentApps.map((app) => {
                  const stu = students.find((s) => s.id === app.studentId);
                  const comp = companies.find((c) => c.id === app.companyId);
                  const job = jobs.find((j) => j.id === app.jobId);
                  return (
                    <tr key={app.id}>
                      <td>
                        <div style={{ fontWeight: 600 }}>{stu?.fullName || 'Student'}</div>
                        <div style={{ fontSize: '0.76rem', color: '#64748b' }}>
                          {stu?.enrollmentNumber}
                        </div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{comp?.name}</div>
                        <div style={{ fontSize: '0.76rem', color: '#64748b' }}>{job?.title}</div>
                      </td>
                      <td>
                        <StatusBadge status={app.status} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <h2 className="panel-title">Recent Registered Students</h2>
            <Link to="/admin/students" className="link-btn">
              Directory →
            </Link>
          </div>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Branch</th>
                  <th>CGPA</th>
                </tr>
              </thead>
              <tbody>
                {recentStudents.map((stu) => (
                  <tr key={stu.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <UserCheck size={15} color="#7a1624" />
                        <div>
                          <div style={{ fontWeight: 600 }}>{stu.fullName}</div>
                          <div style={{ fontSize: '0.76rem', color: '#64748b' }}>
                            {stu.enrollmentNumber}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{stu.department}</td>
                    <td>
                      <span className="badge badge-blue">{stu.cgpa}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Upcoming Interviews & Recent Activities */}
      <div className="dashboard-grid-equal">
        <section className="panel">
          <div className="panel-header">
            <h2 className="panel-title">Upcoming Interviews</h2>
            <Link to="/admin/interviews" className="link-btn">
              Schedule →
            </Link>
          </div>
          <div className="panel-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {upcomingInterviews.length === 0 ? (
              <div className="empty-state" style={{ padding: '20px 10px' }}>
                <CalendarClock size={26} />
                <p style={{ marginTop: 6 }}>No upcoming interviews scheduled.</p>
              </div>
            ) : (
              upcomingInterviews.map((iv) => {
                const comp = companies.find((c) => c.id === iv.companyId);
                const job = jobs.find((j) => j.id === iv.jobId);
                return (
                  <div
                    key={iv.id}
                    style={{
                      padding: 13,
                      borderRadius: 10,
                      border: '1px solid var(--border)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, color: '#4a0e17', fontSize: '0.92rem' }}>
                        {comp?.name} – {job?.title}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                        {iv.date} at {iv.time} • {iv.studentIds.length} candidate(s)
                      </div>
                    </div>
                    <StatusBadge status={iv.status} />
                  </div>
                );
              })
            )}
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <h2 className="panel-title">Recent Activities</h2>
            <Activity size={17} color="#64748b" />
          </div>
          <div className="panel-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {activities.slice(0, 5).map((act) => (
              <div
                key={act.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: 12,
                  paddingBottom: 10,
                  borderBottom: '1px solid var(--border)',
                  fontSize: '0.85rem',
                }}
              >
                <span style={{ color: '#0f172a', fontWeight: 500 }}>{act.action}</span>
                <span style={{ color: '#94a3b8', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
                  {act.timestamp}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

export default AdminDashboard;
