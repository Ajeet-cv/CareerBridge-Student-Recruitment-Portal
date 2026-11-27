import { useMemo, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Edit3,
  Eye,
  FileText,
  Search,
  Trash2,
  Users,
  X,
} from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useApp } from '../../context/AppContext';
import { DEPARTMENTS, GRADUATION_YEARS } from '../../services/storage';

const PAGE_SIZE = 6;

function ManageStudents() {
  const { students, updateStudent, deleteStudent } = useApp();

  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [page, setPage] = useState(1);

  const [viewStudent, setViewStudent] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [resumeStudent, setResumeStudent] = useState(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return students.filter((s) => {
      if (deptFilter !== 'All' && s.department !== deptFilter) return false;
      if (q) {
        const matchName = s.fullName.toLowerCase().includes(q);
        const matchEnroll = s.enrollmentNumber.toLowerCase().includes(q);
        const matchEmail = s.email.toLowerCase().includes(q);
        if (!matchName && !matchEnroll && !matchEmail) return false;
      }
      return true;
    });
  }, [students, search, deptFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const openEdit = (stu) => {
    setEditTarget(stu);
    setEditForm({
      fullName: stu.fullName,
      email: stu.email,
      phone: stu.phone,
      enrollmentNumber: stu.enrollmentNumber,
      department: stu.department,
      cgpa: stu.cgpa,
      graduationYear: stu.graduationYear,
      backlogs: stu.backlogs,
    });
  };

  const handleEditSave = (e) => {
    e.preventDefault();
    if (!editTarget) return;
    updateStudent(editTarget.id, {
      ...editForm,
      cgpa: Number(editForm.cgpa),
      backlogs: Number(editForm.backlogs),
    });
    setEditTarget(null);
  };

  return (
    <DashboardLayout
      role="admin"
      title="Manage Students"
      subtitle="View, verify, edit, and manage registered student placement profiles"
    >
      <div className="page-header">
        <div>
          <h1>Student Directory ({filtered.length})</h1>
          <p>Search by student name or enrollment number, inspect academic details, and review resumes.</p>
        </div>
      </div>

      <div className="filter-bar">
        <div className="search-input-wrap">
          <Search size={17} />
          <input
            type="text"
            className="form-control"
            placeholder="Search by student name or enrollment number..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <select
          className="form-control filter-select"
          value={deptFilter}
          onChange={(e) => {
            setDeptFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="All">All Departments</option>
          {DEPARTMENTS.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      <section className="panel">
        <div className="table-wrap">
          {paginated.length === 0 ? (
            <div className="empty-state">
              <Users size={34} />
              <h3>No students found</h3>
              <p>Try adjusting your search query or department filter.</p>
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Enrollment No.</th>
                  <th>Department</th>
                  <th>CGPA</th>
                  <th>Backlogs</th>
                  <th>Resume</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((stu) => (
                  <tr key={stu.id}>
                    <td>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{stu.fullName}</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{stu.email}</div>
                    </td>
                    <td>
                      <code>{stu.enrollmentNumber}</code>
                    </td>
                    <td>{stu.department}</td>
                    <td>
                      <span className="badge badge-blue">{stu.cgpa}</span>
                    </td>
                    <td>
                      <span className={`badge ${stu.backlogs === 0 ? 'badge-green' : 'badge-amber'}`}>
                        {stu.backlogs}
                      </span>
                    </td>
                    <td>
                      {stu.resume ? (
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm"
                          onClick={() => setResumeStudent(stu)}
                        >
                          <FileText size={14} />
                          View PDF
                        </button>
                      ) : (
                        <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Not uploaded</span>
                      )}
                    </td>
                    <td>
                      <div className="table-actions">
                        <button
                          type="button"
                          className="btn btn-outline btn-sm"
                          onClick={() => setViewStudent(stu)}
                          title="View profile"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline btn-sm"
                          onClick={() => openEdit(stu)}
                          title="Edit student"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger-outline btn-sm"
                          onClick={() => setDeleteTarget(stu)}
                          title="Delete student"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="pagination-bar">
          <span>
            Showing {(safePage - 1) * PAGE_SIZE + (paginated.length ? 1 : 0)}–
            {(safePage - 1) * PAGE_SIZE + paginated.length} of {filtered.length} students
          </span>
          <div className="pagination-btns">
            <button
              type="button"
              className="btn btn-outline btn-sm"
              disabled={safePage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft size={15} />
              Prev
            </button>
            <span style={{ padding: '0 8px', fontWeight: 600 }}>
              Page {safePage} of {totalPages}
            </span>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              disabled={safePage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* View Profile Modal */}
      {viewStudent && (
        <div className="modal-backdrop" onClick={() => setViewStudent(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Student Profile – {viewStudent.fullName}</h3>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setViewStudent(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="form-grid-2" style={{ fontSize: '0.88rem' }}>
                <div><strong>Enrollment:</strong> {viewStudent.enrollmentNumber}</div>
                <div><strong>Department:</strong> {viewStudent.department}</div>
                <div><strong>Email:</strong> {viewStudent.email}</div>
                <div><strong>Phone:</strong> {viewStudent.phone}</div>
                <div><strong>Current CGPA:</strong> {viewStudent.cgpa} / 10.0</div>
                <div><strong>Backlogs:</strong> {viewStudent.backlogs}</div>
                <div><strong>Graduation Year:</strong> {viewStudent.graduationYear}</div>
                <div><strong>Date of Birth:</strong> {viewStudent.dob || 'Not provided'}</div>
              </div>
              <div style={{ fontSize: '0.88rem' }}>
                <strong>Address:</strong> {viewStudent.address || 'Not provided'}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary btn-sm" onClick={() => setViewStudent(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {editTarget && (
        <div className="modal-backdrop" onClick={() => setEditTarget(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Student – {editTarget.fullName}</h3>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setEditTarget(null)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleEditSave}>
              <div className="modal-body form-grid-2">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    className="form-control"
                    required
                    value={editForm.fullName}
                    onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Enrollment Number</label>
                  <input
                    className="form-control"
                    required
                    value={editForm.enrollmentNumber}
                    onChange={(e) => setEditForm({ ...editForm, enrollmentNumber: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    required
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input
                    className="form-control"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Department</label>
                  <select
                    className="form-control"
                    value={editForm.department}
                    onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                  >
                    {DEPARTMENTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Graduation Year</label>
                  <select
                    className="form-control"
                    value={editForm.graduationYear}
                    onChange={(e) => setEditForm({ ...editForm, graduationYear: e.target.value })}
                  >
                    {GRADUATION_YEARS.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Current CGPA</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    className="form-control"
                    value={editForm.cgpa}
                    onChange={(e) => setEditForm({ ...editForm, cgpa: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Backlogs</label>
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    value={editForm.backlogs}
                    onChange={(e) => setEditForm({ ...editForm, backlogs: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline btn-sm" onClick={() => setEditTarget(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Resume Preview Modal */}
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
                  title="Student Resume"
                  style={{ width: '100%', height: '60vh', border: '1px solid var(--border)', borderRadius: 8 }}
                />
              ) : (
                <div style={{ padding: 24, backgroundColor: 'var(--bg)', borderRadius: 10 }}>
                  <h4 style={{ color: '#4a0e17', marginBottom: 8 }}>
                    {resumeStudent.resume.fileName}
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: '#475569' }}>
                    Size: {resumeStudent.resume.fileSize} • Uploaded: {resumeStudent.resume.uploadedAt}
                    <br />
                    Verified Student: {resumeStudent.fullName} ({resumeStudent.enrollmentNumber}) • CGPA {resumeStudent.cgpa}
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

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="modal-backdrop" onClick={() => setDeleteTarget(null)}>
          <div className="modal-card" style={{ maxWidth: 420 }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Delete Student Record</h3>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setDeleteTarget(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '0.9rem', color: '#334155' }}>
                Are you sure you want to remove <strong>{deleteTarget.fullName}</strong> ({deleteTarget.enrollmentNumber}) and their associated applications?
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline btn-sm" onClick={() => setDeleteTarget(null)}>
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => {
                  deleteStudent(deleteTarget.id);
                  setDeleteTarget(null);
                }}
              >
                Delete Student
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default ManageStudents;
