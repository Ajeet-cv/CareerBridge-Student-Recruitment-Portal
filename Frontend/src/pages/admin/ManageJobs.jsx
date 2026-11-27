import { useMemo, useState } from 'react';
import { Briefcase, Edit3, Lock, Plus, Search, Trash2, Unlock, X } from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import StatusBadge from '../../components/StatusBadge';
import { useApp } from '../../context/AppContext';
import { DEPARTMENTS } from '../../services/storage';

const createEmptyJob = (defaultCompanyId) => ({
  companyId: defaultCompanyId || '',
  title: '',
  description: '',
  location: '',
  packageLPA: '7.0',
  jobType: 'Full-Time',
  minCGPA: '7.0',
  eligibleBranches: ['Computer Science', 'Information Technology'],
  allowedBacklogs: '0',
  deadline: '2026-12-30',
  status: 'Open',
});

function ManageJobs() {
  const { jobs, companies, addJob, updateJob, toggleJobStatus, deleteJob } = useApp();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(() => createEmptyJob(companies[0]?.id));
  const [formError, setFormError] = useState('');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return jobs.filter((job) => {
      const comp = companies.find((c) => c.id === job.companyId);
      if (statusFilter !== 'All' && job.status !== statusFilter) return false;
      if (q) {
        const matchTitle = job.title.toLowerCase().includes(q);
        const matchComp = (comp?.name || '').toLowerCase().includes(q);
        if (!matchTitle && !matchComp) return false;
      }
      return true;
    });
  }, [jobs, companies, search, statusFilter]);

  const openAdd = () => {
    setEditingId(null);
    setForm(createEmptyJob(companies[0]?.id));
    setFormError('');
    setModalOpen(true);
  };

  const openEdit = (job) => {
    setEditingId(job.id);
    setForm({
      companyId: job.companyId,
      title: job.title,
      description: job.description,
      location: job.location,
      packageLPA: String(job.packageLPA),
      jobType: job.jobType,
      minCGPA: String(job.minCGPA),
      eligibleBranches: job.eligibleBranches,
      allowedBacklogs: String(job.allowedBacklogs),
      deadline: job.deadline,
      status: job.status,
    });
    setFormError('');
    setModalOpen(true);
  };

  const toggleBranch = (branch) => {
    setForm((prev) => {
      const exists = prev.eligibleBranches.includes(branch);
      return {
        ...prev,
        eligibleBranches: exists
          ? prev.eligibleBranches.filter((b) => b !== branch)
          : [...prev.eligibleBranches, branch],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.companyId || !form.title.trim() || !form.location.trim() || !form.deadline) {
      setFormError('Company, job title, location, and application deadline are required.');
      return;
    }
    if (form.eligibleBranches.length === 0) {
      setFormError('Select at least one eligible department.');
      return;
    }

    if (editingId) {
      updateJob(editingId, form);
    } else {
      addJob(form);
    }
    setModalOpen(false);
  };

  return (
    <DashboardLayout
      role="admin"
      title="Manage Jobs"
      subtitle="Create placement drives, set eligibility criteria, and publish or close openings"
    >
      <div className="page-header">
        <div>
          <h1>Job Openings ({filtered.length})</h1>
          <p>Changes published here immediately reflect on the Student Browse Jobs portal.</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={openAdd}>
          <Plus size={17} />
          Add New Job
        </button>
      </div>

      <div className="filter-bar">
        <div className="search-input-wrap">
          <Search size={17} />
          <input
            type="text"
            className="form-control"
            placeholder="Search jobs by title or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="form-control filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Open">Open / Published</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      <section className="panel">
        <div className="table-wrap">
          {filtered.length === 0 ? (
            <div className="empty-state">
              <Briefcase size={34} />
              <h3>No job openings found</h3>
              <p>Create a new job opening or adjust your filter.</p>
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Job Title</th>
                  <th>Package</th>
                  <th>Min CGPA</th>
                  <th>Backlogs</th>
                  <th>Deadline</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((job) => {
                  const comp = companies.find((c) => c.id === job.companyId);
                  return (
                    <tr key={job.id}>
                      <td>
                        <strong>{comp?.name || 'Company'}</strong>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{job.title}</div>
                        <div style={{ fontSize: '0.76rem', color: '#64748b' }}>
                          {job.location} • {job.jobType}
                        </div>
                      </td>
                      <td>
                        <strong>{job.packageLPA} LPA</strong>
                      </td>
                      <td>{job.minCGPA}</td>
                      <td>{job.allowedBacklogs}</td>
                      <td>{job.deadline}</td>
                      <td>
                        <StatusBadge status={job.status} />
                      </td>
                      <td>
                        <div className="table-actions">
                          <button
                            type="button"
                            className="btn btn-outline btn-sm"
                            onClick={() => toggleJobStatus(job.id)}
                            title={job.status === 'Open' ? 'Close job' : 'Publish job'}
                          >
                            {job.status === 'Open' ? <Lock size={14} /> : <Unlock size={14} />}
                            {job.status === 'Open' ? 'Close' : 'Publish'}
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline btn-sm"
                            onClick={() => openEdit(job)}
                            title="Edit job"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger-outline btn-sm"
                            onClick={() => deleteJob(job.id)}
                            title="Delete job"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {modalOpen && (
        <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="modal-card modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingId ? 'Edit Job Opening' : 'Create New Job Opening'}</h3>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {formError && <div className="alert alert-error">{formError}</div>}

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Company</label>
                    <select
                      className="form-control"
                      value={form.companyId}
                      onChange={(e) => setForm({ ...form, companyId: e.target.value })}
                    >
                      {companies.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Job Title</label>
                    <input
                      className="form-control"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      placeholder="e.g., Software Development Engineer"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Location</label>
                    <input
                      className="form-control"
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      placeholder="e.g., Bengaluru / Hybrid"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Package (LPA)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      className="form-control"
                      value={form.packageLPA}
                      onChange={(e) => setForm({ ...form, packageLPA: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Job Type</label>
                    <select
                      className="form-control"
                      value={form.jobType}
                      onChange={(e) => setForm({ ...form, jobType: e.target.value })}
                    >
                      <option value="Full-Time">Full-Time</option>
                      <option value="Internship + PPO">Internship + PPO</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Application Deadline</label>
                    <input
                      type="date"
                      className="form-control"
                      value={form.deadline}
                      onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Minimum CGPA</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      className="form-control"
                      value={form.minCGPA}
                      onChange={(e) => setForm({ ...form, minCGPA: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Allowed Backlogs</label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      className="form-control"
                      value={form.allowedBacklogs}
                      onChange={(e) => setForm({ ...form, allowedBacklogs: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Eligible Branches</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {DEPARTMENTS.map((branch) => (
                      <label key={branch} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={form.eligibleBranches.includes(branch)}
                          onChange={() => toggleBranch(branch)}
                        />
                        <span>{branch}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Job Description</label>
                  <textarea
                    rows={3}
                    className="form-control"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Key responsibilities, tech stack, and selection rounds..."
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline btn-sm" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  {editingId ? 'Save Job Changes' : 'Publish Job Opening'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default ManageJobs;
