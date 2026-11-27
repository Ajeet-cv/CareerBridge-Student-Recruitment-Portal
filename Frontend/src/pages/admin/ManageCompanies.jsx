import { useState } from 'react';
import { Building2, Edit3, Eye, Globe, Mail, MapPin, Plus, Search, Trash2, X } from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useApp } from '../../context/AppContext';

const EMPTY_FORM = {
  name: '',
  logoUrl: '',
  color: '#7a1624',
  industry: '',
  location: '',
  website: '',
  hrContact: '',
  email: '',
  description: '',
};

function ManageCompanies() {
  const { companies, jobs, addCompany, updateCompany, deleteCompany } = useApp();

  const [search, setSearch] = useState('');
  const [modalMode, setModalMode] = useState(null); // 'add' | 'edit' | 'view'
  const [activeCompany, setActiveCompany] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState('');

  const filtered = companies.filter((c) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) ||
      c.industry.toLowerCase().includes(q) ||
      c.location.toLowerCase().includes(q)
    );
  });

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setFormError('');
    setActiveCompany(null);
    setModalMode('add');
  };

  const openEdit = (comp) => {
    setActiveCompany(comp);
    setForm({
      name: comp.name,
      logoUrl: comp.logoUrl || '',
      color: comp.color || '#7a1624',
      industry: comp.industry,
      location: comp.location,
      website: comp.website,
      hrContact: comp.hrContact,
      email: comp.email,
      description: comp.description || '',
    });
    setFormError('');
    setModalMode('edit');
  };

  const openView = (comp) => {
    setActiveCompany(comp);
    setModalMode('view');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.industry.trim() || !form.location.trim() || !form.hrContact.trim() || !form.email.trim()) {
      setFormError('Please fill in company name, industry, location, HR contact, and email.');
      return;
    }

    if (modalMode === 'add') {
      addCompany(form);
    } else if (modalMode === 'edit' && activeCompany) {
      updateCompany(activeCompany.id, form);
    }
    setModalMode(null);
  };

  return (
    <DashboardLayout
      role="admin"
      title="Manage Companies"
      subtitle="Onboard recruiting companies, maintain HR contacts, and oversee partner profiles"
    >
      <div className="page-header">
        <div>
          <h1>Partner Companies ({filtered.length})</h1>
          <p>Add new employers or update corporate recruitment contacts.</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={openAdd}>
          <Plus size={17} />
          Add New Company
        </button>
      </div>

      <div className="filter-bar">
        <div className="search-input-wrap">
          <Search size={17} />
          <input
            type="text"
            className="form-control"
            placeholder="Search companies by name, industry, or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="panel">
          <div className="empty-state">
            <Building2 size={34} />
            <h3>No companies found</h3>
            <p>Try another search term or add a new hiring partner.</p>
          </div>
        </div>
      ) : (
        <div className="jobs-grid">
          {filtered.map((comp) => {
            const jobCount = jobs.filter((j) => j.companyId === comp.id).length;
            return (
              <article key={comp.id} className="job-card">
                <div className="job-card-top">
                  <div className="company-identity">
                    {comp.logoUrl ? (
                      <img
                        src={comp.logoUrl}
                        alt={comp.name}
                        className="company-logo-box"
                        style={{ objectFit: 'cover', backgroundColor: '#f1f5f9' }}
                      />
                    ) : (
                      <div className="company-logo-box" style={{ backgroundColor: comp.color || '#7a1624' }}>
                        {comp.shortCode || comp.name.slice(0, 3).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h3 className="job-role-title">{comp.name}</h3>
                      <div className="job-company-name">{comp.industry}</div>
                    </div>
                  </div>
                  <span className="badge badge-blue">{jobCount} Drive(s)</span>
                </div>

                <div style={{ fontSize: '0.84rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
                    <MapPin size={14} color="#64748b" /> {comp.location}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
                    <Mail size={14} color="#64748b" /> {comp.hrContact} ({comp.email})
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
                    <Globe size={14} color="#64748b" /> {comp.website || '—'}
                  </span>
                </div>

                <div className="job-card-footer">
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => openView(comp)}>
                    <Eye size={14} /> View
                  </button>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button type="button" className="btn btn-outline btn-sm" onClick={() => openEdit(comp)}>
                      <Edit3 size={14} /> Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger-outline btn-sm"
                      onClick={() => deleteCompany(comp.id)}
                      title="Delete company"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {(modalMode === 'add' || modalMode === 'edit') && (
        <div className="modal-backdrop" onClick={() => setModalMode(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modalMode === 'add' ? 'Add Partner Company' : `Edit ${activeCompany?.name}`}</h3>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setModalMode(null)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {formError && <div className="alert alert-error">{formError}</div>}

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Company Name</label>
                    <input
                      className="form-control"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g., Oracle"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Industry</label>
                    <input
                      className="form-control"
                      value={form.industry}
                      onChange={(e) => setForm({ ...form, industry: e.target.value })}
                      placeholder="e.g., Cloud & Enterprise Software"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Company Logo URL (Optional)</label>
                    <input
                      className="form-control"
                      value={form.logoUrl}
                      onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Brand Accent Color</label>
                    <input
                      type="color"
                      className="form-control"
                      style={{ height: 42, padding: 4 }}
                      value={form.color}
                      onChange={(e) => setForm({ ...form, color: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Location</label>
                    <input
                      className="form-control"
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      placeholder="e.g., Bengaluru, Karnataka"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Website</label>
                    <input
                      className="form-control"
                      value={form.website}
                      onChange={(e) => setForm({ ...form, website: e.target.value })}
                      placeholder="https://www.company.com"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">HR Contact Name</label>
                    <input
                      className="form-control"
                      value={form.hrContact}
                      onChange={(e) => setForm({ ...form, hrContact: e.target.value })}
                      placeholder="e.g., Priya Nair"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">HR Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="campus@company.com"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Company Overview</label>
                  <textarea
                    rows={2}
                    className="form-control"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Brief company overview for students..."
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline btn-sm" onClick={() => setModalMode(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  {modalMode === 'add' ? 'Add Company' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modalMode === 'view' && activeCompany && (
        <div className="modal-backdrop" onClick={() => setModalMode(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{activeCompany.name} – Company Profile</h3>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setModalMode(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <p style={{ fontSize: '0.9rem', color: '#334155' }}>{activeCompany.description}</p>
              <div className="form-grid-2" style={{ fontSize: '0.86rem', backgroundColor: 'var(--bg)', padding: 14, borderRadius: 10 }}>
                <div><strong>Industry:</strong> {activeCompany.industry}</div>
                <div><strong>Location:</strong> {activeCompany.location}</div>
                <div><strong>HR Contact:</strong> {activeCompany.hrContact}</div>
                <div><strong>Email:</strong> {activeCompany.email}</div>
                <div><strong>Website:</strong> {activeCompany.website || '—'}</div>
                <div><strong>Active Drives:</strong> {jobs.filter((j) => j.companyId === activeCompany.id).length}</div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary btn-sm" onClick={() => setModalMode(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default ManageCompanies;
