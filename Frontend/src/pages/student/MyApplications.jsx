import { useMemo, useState } from 'react';
import { ClipboardCheck, ExternalLink, Eye, Search, X } from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import StatusBadge from '../../components/StatusBadge';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { APPLICATION_STATUSES } from '../../services/storage';

function MyApplications() {
  const { user } = useAuth();
  const { applications, jobs, companies, interviews, students } = useApp();
  const student = students.find((s) => s.id === user?.id) || students[0];

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedApp, setSelectedApp] = useState(null);

  const enrichedApps = useMemo(() => {
    return applications
      .filter((a) => a.studentId === student?.id)
      .map((app) => {
        const job = jobs.find((j) => j.id === app.jobId);
        const company = companies.find((c) => c.id === app.companyId);
        const interview = interviews.find(
          (iv) => iv.jobId === app.jobId && iv.studentIds.includes(student?.id)
        );
        return { ...app, job, company, interview };
      })
      .filter((row) => {
        const q = search.trim().toLowerCase();
        if (q) {
          const matchComp = (row.company?.name || '').toLowerCase().includes(q);
          const matchRole = (row.job?.title || '').toLowerCase().includes(q);
          if (!matchComp && !matchRole) return false;
        }
        if (statusFilter !== 'All' && row.status !== statusFilter) return false;
        return true;
      });
  }, [applications, jobs, companies, interviews, student, search, statusFilter]);

  return (
    <DashboardLayout
      role="student"
      title="My Applications"
      subtitle="Track every placement drive application and interview stage in real time"
    >
      <div className="page-header">
        <div>
          <h1>Application Tracker</h1>
          <p>Updates made by the placement cell appear here immediately.</p>
        </div>
      </div>

      <div className="filter-bar">
        <div className="search-input-wrap">
          <Search size={17} />
          <input
            type="text"
            className="form-control"
            placeholder="Search by company or job role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="form-control filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          aria-label="Filter by status"
        >
          <option value="All">All Statuses</option>
          {APPLICATION_STATUSES.map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>
      </div>

      <section className="panel">
        <div className="table-wrap">
          {enrichedApps.length === 0 ? (
            <div className="empty-state">
              <ClipboardCheck size={34} />
              <h3>No applications match your filter</h3>
              <p>Browse available jobs to apply for upcoming placement drives.</p>
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Job Role</th>
                  <th>Applied Date</th>
                  <th>Package</th>
                  <th>Application Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {enrichedApps.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div
                          className="company-logo-box"
                          style={{
                            width: 34,
                            height: 34,
                            fontSize: '0.72rem',
                            backgroundColor: row.company?.color || '#7a1624',
                          }}
                        >
                          {row.company?.shortCode || 'CO'}
                        </div>
                        <strong>{row.company?.name || 'Company'}</strong>
                      </div>
                    </td>
                    <td>{row.job?.title || 'Role'}</td>
                    <td>{row.appliedDate}</td>
                    <td>
                      <strong>{row.job?.packageLPA || '-'} LPA</strong>
                    </td>
                    <td>
                      <StatusBadge status={row.status} />
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline btn-sm"
                        onClick={() => setSelectedApp(row)}
                      >
                        <Eye size={14} />
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {selectedApp && (
        <div className="modal-backdrop" onClick={() => setSelectedApp(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Application Details</h3>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setSelectedApp(null)}
              >
                <X size={18} />
              </button>
            </div>
            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.08rem', color: '#4a0e17' }}>
                    {selectedApp.job?.title}
                  </div>
                  <div style={{ fontSize: '0.86rem', color: '#475569' }}>
                    {selectedApp.company?.name} • {selectedApp.job?.location}
                  </div>
                </div>
                <StatusBadge status={selectedApp.status} />
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 10,
                  padding: 14,
                  backgroundColor: 'var(--bg)',
                  borderRadius: 10,
                  fontSize: '0.86rem',
                }}
              >
                <div><strong>Applied Date:</strong> {selectedApp.appliedDate}</div>
                <div><strong>Package (CTC):</strong> {selectedApp.job?.packageLPA} LPA</div>
                <div><strong>Job Type:</strong> {selectedApp.job?.jobType}</div>
                <div><strong>Deadline:</strong> {selectedApp.job?.deadline}</div>
              </div>

              {selectedApp.interview && (
                <div
                  style={{
                    padding: 14,
                    borderRadius: 10,
                    backgroundColor: '#fdf2f4',
                    border: '1px solid #f3c7ce',
                    fontSize: '0.86rem',
                  }}
                >
                  <div style={{ fontWeight: 700, color: '#4a0e17', marginBottom: 6 }}>
                    Scheduled Interview Information
                  </div>
                  <div>
                    <strong>Date & Time:</strong> {selectedApp.interview.date} at{' '}
                    {selectedApp.interview.time}
                  </div>
                  <div style={{ marginTop: 4 }}>
                    <strong>Venue / Link:</strong>{' '}
                    {selectedApp.interview.locationOrLink?.startsWith('http') ? (
                      <a
                        href={selectedApp.interview.locationOrLink}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: '#7a1624', fontWeight: 600 }}
                      >
                        Open Meeting Link <ExternalLink size={12} style={{ display: 'inline' }} />
                      </a>
                    ) : (
                      selectedApp.interview.locationOrLink
                    )}
                  </div>
                  <div style={{ marginTop: 4, color: '#334155' }}>
                    <strong>Instructions:</strong> {selectedApp.interview.instructions}
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => setSelectedApp(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default MyApplications;
