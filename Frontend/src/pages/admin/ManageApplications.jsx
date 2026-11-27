import { useMemo, useState } from 'react';
import { Award, CheckCircle2, ClipboardCheck, Eye, FileText, Search, X, XCircle } from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import StatusBadge from '../../components/StatusBadge';
import { useApp } from '../../context/AppContext';
import { APPLICATION_STATUSES } from '../../services/storage';

function ManageApplications() {
  const { applications, students, companies, jobs, updateApplicationStatus } = useApp();

  const [search, setSearch] = useState('');
  const [companyFilter, setCompanyFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const [detailRow, setDetailRow] = useState(null);
  const [resumeStudent, setResumeStudent] = useState(null);

  const uniqueRoles = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.title))),
    [jobs]
  );

  const enriched = useMemo(() => {
    const q = search.trim().toLowerCase();
    return applications
      .map((app) => {
        const student = students.find((s) => s.id === app.studentId);
        const company = companies.find((c) => c.id === app.companyId);
        const job = jobs.find((j) => j.id === app.jobId);
        return { ...app, student, company, job };
      })
      .filter((row) => {
        if (companyFilter !== 'All' && row.companyId !== companyFilter) return false;
        if (roleFilter !== 'All' && row.job?.title !== roleFilter) return false;
        if (statusFilter !== 'All' && row.status !== statusFilter) return false;
        if (q) {
          const matchName = (row.student?.fullName || '').toLowerCase().includes(q);
          const matchEnroll = (row.student?.enrollmentNumber || '').toLowerCase().includes(q);
          const matchComp = (row.company?.name || '').toLowerCase().includes(q);
          const matchRole = (row.job?.title || '').toLowerCase().includes(q);
          if (!matchName && !matchEnroll && !matchComp && !matchRole) return false;
        }
        return true;
      });
  }, [applications, students, companies, jobs, search, companyFilter, roleFilter, statusFilter]);

  return (
    <DashboardLayout
      role="admin"
      title="Manage Applications"
      subtitle="Review applicants, inspect resumes, and update shortlist or final selection statuses"
    >
      <div className="page-header">
        <div>
          <h1>Student Applications ({enriched.length})</h1>
          <p>Status updates immediately sync to the student dashboard and trigger alerts.</p>
        </div>
      </div>

      <div className="filter-bar">
        <div className="search-input-wrap">
          <Search size={17} />
          <input
            type="text"
            className="form-control"
            placeholder="Search by student, enrollment no., company, or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="form-control filter-select"
          value={companyFilter}
          onChange={(e) => setCompanyFilter(e.target.value)}
        >
          <option value="All">All Companies</option>
          {companies.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <select
          className="form-control filter-select"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="All">All Job Roles</option>
          {uniqueRoles.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

        <select
          className="form-control filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          {APPLICATION_STATUSES.map((st) => (
            <option key={st} value={st}>{st}</option>
          ))}
        </select>
      </div>

      <section className="panel">
        <div className="table-wrap">
          {enriched.length === 0 ? (
            <div className="empty-state">
              <ClipboardCheck size={34} />
              <h3>No applications match your filters</h3>
              <p>Try clearing one of the company, role, or status filters.</p>
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Company & Role</th>
                  <th>CGPA</th>
                  <th>Applied Date</th>
                  <th>Status</th>
                  <th>Decision Actions</th>
                </tr>
              </thead>
              <tbody>
                {enriched.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <div style={{ fontWeight: 700 }}>{row.student?.fullName || 'Student'}</div>
                      <div style={{ fontSize: '0.76rem', color: '#64748b' }}>
                        {row.student?.enrollmentNumber} • {row.student?.department}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{row.company?.name}</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                        {row.job?.title} ({row.job?.packageLPA} LPA)
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-blue">{row.student?.cgpa ?? '-'}</span>
                    </td>
                    <td>{row.appliedDate}</td>
                    <td>
                      <StatusBadge status={row.status} />
                    </td>
                    <td>
                      <div className="table-actions" style={{ flexWrap: 'wrap' }}>
                        <button
                          type="button"
                          className="btn btn-outline btn-sm"
                          onClick={() => setDetailRow(row)}
                          title="View student details"
                        >
                          <Eye size={14} />
                        </button>
                        {row.student?.resume && (
                          <button
                            type="button"
                            className="btn btn-outline btn-sm"
                            onClick={() => setResumeStudent(row.student)}
                            title="View resume"
                          >
                            <FileText size={14} />
                          </button>
                        )}
                        <button
                          type="button"
                          className="btn btn-outline btn-sm"
                          disabled={row.status === 'Shortlisted'}
                          onClick={() => updateApplicationStatus(row.id, 'Shortlisted')}
                          title="Shortlist applicant"
                        >
                          <CheckCircle2 size={14} color="#d97706" />
                          Shortlist
                        </button>
                        <button
                          type="button"
                          className="btn btn-success btn-sm"
                          disabled={row.status === 'Selected'}
                          onClick={() => updateApplicationStatus(row.id, 'Selected')}
                          title="Mark as selected"
                        >
                          <Award size={14} />
                          Select
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger-outline btn-sm"
                          disabled={row.status === 'Rejected'}
                          onClick={() => updateApplicationStatus(row.id, 'Rejected')}
                          title="Reject applicant"
                        >
                          <XCircle size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {detailRow && (
        <div className="modal-backdrop" onClick={() => setDetailRow(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Applicant Details – {detailRow.student?.fullName}</h3>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setDetailRow(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="form-grid-2" style={{ fontSize: '0.88rem', backgroundColor: 'var(--bg)', padding: 14, borderRadius: 10 }}>
                <div><strong>Enrollment:</strong> {detailRow.student?.enrollmentNumber}</div>
                <div><strong>Department:</strong> {detailRow.student?.department}</div>
                <div><strong>CGPA:</strong> {detailRow.student?.cgpa}</div>
                <div><strong>Backlogs:</strong> {detailRow.student?.backlogs}</div>
                <div><strong>Email:</strong> {detailRow.student?.email}</div>
                <div><strong>Phone:</strong> {detailRow.student?.phone}</div>
              </div>
              <div style={{ fontSize: '0.88rem' }}>
                <strong>Drive Applied:</strong> {detailRow.company?.name} – {detailRow.job?.title} ({detailRow.job?.packageLPA} LPA)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <strong style={{ fontSize: '0.88rem' }}>Current Status:</strong>
                <StatusBadge status={detailRow.status} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary btn-sm" onClick={() => setDetailRow(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {resumeStudent && resumeStudent.resume && (
        <div className="modal-backdrop" onClick={() => setResumeStudent(null)}>
          <div className="modal-card modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Resume – {resumeStudent.fullName}</h3>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setResumeStudent(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              {resumeStudent.resume.dataUrl ? (
                <iframe
                  src={resumeStudent.resume.dataUrl}
                  title="Applicant Resume"
                  style={{ width: '100%', height: '60vh', border: '1px solid var(--border)', borderRadius: 8 }}
                />
              ) : (
                <div style={{ padding: 24, backgroundColor: 'var(--bg)', borderRadius: 10 }}>
                  <h4 style={{ color: '#4a0e17', marginBottom: 8 }}>{resumeStudent.resume.fileName}</h4>
                  <p style={{ fontSize: '0.88rem', color: '#475569' }}>
                    Size: {resumeStudent.resume.fileSize} • Uploaded: {resumeStudent.resume.uploadedAt}
                    <br />
                    {resumeStudent.fullName} ({resumeStudent.enrollmentNumber}) • CGPA {resumeStudent.cgpa}
                  </p>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary btn-sm" onClick={() => setResumeStudent(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default ManageApplications;
