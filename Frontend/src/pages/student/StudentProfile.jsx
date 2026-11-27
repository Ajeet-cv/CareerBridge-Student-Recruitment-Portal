import { useRef, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Edit3,
  Eye,
  FileText,
  Save,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { DEPARTMENTS, GRADUATION_YEARS } from '../../services/storage';

function StudentProfile() {
  const { user, syncAuthName } = useAuth();
  const { students, updateStudent } = useApp();
  const student = students.find((s) => s.id === user?.id) || students[0];

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    fullName: student?.fullName || '',
    email: student?.email || '',
    phone: student?.phone || '',
    dob: student?.dob || '',
    address: student?.address || '',
    enrollmentNumber: student?.enrollmentNumber || '',
    department: student?.department || DEPARTMENTS[0],
    cgpa: student?.cgpa ?? 8.0,
    graduationYear: student?.graduationYear || '2026',
    backlogs: student?.backlogs ?? 0,
  });

  const [feedback, setFeedback] = useState({ type: '', text: '' });
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleField = (key, val) => {
    setForm((prev) => ({ ...prev, [key]: val }));
  };

  const handleEditStart = () => {
    setForm({
      fullName: student.fullName,
      email: student.email,
      phone: student.phone,
      dob: student.dob || '',
      address: student.address || '',
      enrollmentNumber: student.enrollmentNumber,
      department: student.department,
      cgpa: student.cgpa,
      graduationYear: student.graduationYear,
      backlogs: student.backlogs,
    });
    setFeedback({ type: '', text: '' });
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.email.trim() || !form.phone.trim()) {
      setFeedback({ type: 'error', text: 'Full name, email, and phone number are required.' });
      return;
    }
    const cgpaNum = Number(form.cgpa);
    const backlogsNum = Number(form.backlogs);
    if (Number.isNaN(cgpaNum) || cgpaNum < 0 || cgpaNum > 10) {
      setFeedback({ type: 'error', text: 'Current CGPA must be between 0.0 and 10.0.' });
      return;
    }
    if (Number.isNaN(backlogsNum) || backlogsNum < 0) {
      setFeedback({ type: 'error', text: 'Backlog count cannot be negative.' });
      return;
    }

    updateStudent(student.id, {
      ...form,
      cgpa: Number(cgpaNum.toFixed(2)),
      backlogs: Math.floor(backlogsNum),
    });
    syncAuthName(form.fullName.trim(), form.email.trim());
    setIsEditing(false);
    setFeedback({
      type: 'success',
      text: 'Profile updated and saved. Job eligibility statuses have been refreshed.',
    });
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setFeedback({ type: 'error', text: 'Invalid file format. Please upload a PDF file only.' });
      return;
    }

    if (file.size > 1.5 * 1024 * 1024) {
      setFeedback({
        type: 'error',
        text: 'PDF exceeds 1.5 MB demo storage limit. Please choose a smaller PDF.',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      updateStudent(student.id, {
        resume: {
          fileName: file.name,
          fileSize: `${Math.max(1, Math.round(file.size / 1024))} KB`,
          uploadedAt: new Date().toISOString().slice(0, 10),
          dataUrl: reader.result,
        },
      });
      setFeedback({ type: 'success', text: `Resume "${file.name}" uploaded successfully.` });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveResume = () => {
    updateStudent(student.id, { resume: null });
    setFeedback({ type: 'success', text: 'Resume removed from your profile.' });
  };

  return (
    <DashboardLayout
      role="student"
      title="My Profile"
      subtitle="Manage personal details, academic credentials, and your PDF resume"
    >
      <div className="page-header">
        <div>
          <h1>Student Profile & Resume</h1>
          <p>Your CGPA, branch, and backlog count directly determine drive eligibility.</p>
        </div>
        {!isEditing ? (
          <button type="button" className="btn btn-primary" onClick={handleEditStart}>
            <Edit3 size={16} />
            Edit Profile
          </button>
        ) : (
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
            <button type="submit" form="student-profile-form" className="btn btn-success">
              <Save size={16} />
              Save Changes
            </button>
          </div>
        )}
      </div>

      {feedback.text && (
        <div className={`alert ${feedback.type === 'error' ? 'alert-error' : 'alert-success'}`}>
          {feedback.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
          <span>{feedback.text}</span>
        </div>
      )}

      <form id="student-profile-form" onSubmit={handleSave}>
        <div className="profile-grid">
          {/* Personal Information */}
          <section className="panel">
            <div className="panel-header">
              <h2 className="panel-title">Personal Information</h2>
            </div>
            <div className="panel-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  disabled={!isEditing}
                  value={isEditing ? form.fullName : student.fullName}
                  onChange={(e) => handleField('fullName', e.target.value)}
                />
              </div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    disabled={!isEditing}
                    value={isEditing ? form.email : student.email}
                    onChange={(e) => handleField('email', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    disabled={!isEditing}
                    value={isEditing ? form.phone : student.phone}
                    onChange={(e) => handleField('phone', e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  disabled={!isEditing}
                  value={isEditing ? form.dob : student.dob || ''}
                  onChange={(e) => handleField('dob', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Residential Address</label>
                <textarea
                  rows={2}
                  className="form-control"
                  disabled={!isEditing}
                  value={isEditing ? form.address : student.address || ''}
                  onChange={(e) => handleField('address', e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Academic Information */}
          <section className="panel">
            <div className="panel-header">
              <h2 className="panel-title">Academic Information</h2>
            </div>
            <div className="panel-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Enrollment Number</label>
                  <input
                    type="text"
                    className="form-control"
                    disabled={!isEditing}
                    value={isEditing ? form.enrollmentNumber : student.enrollmentNumber}
                    onChange={(e) => handleField('enrollmentNumber', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Graduation Year</label>
                  <select
                    className="form-control"
                    disabled={!isEditing}
                    value={isEditing ? form.graduationYear : student.graduationYear}
                    onChange={(e) => handleField('graduationYear', e.target.value)}
                  >
                    {GRADUATION_YEARS.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Department / Branch</label>
                <select
                  className="form-control"
                  disabled={!isEditing}
                  value={isEditing ? form.department : student.department}
                  onChange={(e) => handleField('department', e.target.value)}
                >
                  {DEPARTMENTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Current CGPA (out of 10)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    className="form-control"
                    disabled={!isEditing}
                    value={isEditing ? form.cgpa : student.cgpa}
                    onChange={(e) => handleField('cgpa', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Active Backlog Count</label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    className="form-control"
                    disabled={!isEditing}
                    value={isEditing ? form.backlogs : student.backlogs}
                    onChange={(e) => handleField('backlogs', e.target.value)}
                  />
                </div>
              </div>

              <div className="alert alert-info" style={{ marginTop: 4 }}>
                <CheckCircle2 size={17} style={{ flexShrink: 0, marginTop: 2 }} />
                <span>
                  Automatic eligibility checks evaluate <strong>CGPA ({student.cgpa})</strong>,{' '}
                  <strong>{student.department}</strong>, and{' '}
                  <strong>{student.backlogs} backlog(s)</strong> against each placement drive.
                </span>
              </div>
            </div>
          </section>
        </div>
      </form>

      {/* Resume Management */}
      <section className="panel">
        <div className="panel-header">
          <h2 className="panel-title">Resume Management (PDF Only)</h2>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf,.pdf"
            style={{ display: 'none' }}
            onChange={handleResumeUpload}
          />
        </div>
        <div className="panel-body">
          <div className="resume-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                className="stat-icon blue"
                style={{ width: 48, height: 48 }}
              >
                <FileText size={24} />
              </div>
              {student.resume ? (
                <div>
                  <div style={{ fontWeight: 700, color: '#4a0e17' }}>
                    {student.resume.fileName}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                    {student.resume.fileSize} • Uploaded on {student.resume.uploadedAt}
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ fontWeight: 700, color: '#4a0e17' }}>No Resume Uploaded</div>
                  <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                    Upload a PDF resume (max 1.5 MB) for recruiters & placement officers.
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {student.resume ? (
                <>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={() => setResumeModalOpen(true)}
                  >
                    <Eye size={15} />
                    View Resume
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload size={15} />
                    Replace Resume
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger-outline btn-sm"
                    onClick={handleRemoveResume}
                  >
                    <Trash2 size={15} />
                    Remove
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload size={16} />
                  Upload Resume (PDF)
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {resumeModalOpen && student.resume && (
        <div className="modal-backdrop" onClick={() => setResumeModalOpen(false)}>
          <div className="modal-card modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Resume Preview – {student.resume.fileName}</h3>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setResumeModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              {student.resume.dataUrl ? (
                <iframe
                  src={student.resume.dataUrl}
                  title="Student Resume PDF"
                  style={{ width: '100%', height: '62vh', border: '1px solid var(--border)', borderRadius: 8 }}
                />
              ) : (
                <div
                  style={{
                    padding: 28,
                    border: '1px solid var(--border)',
                    borderRadius: 10,
                    backgroundColor: 'var(--bg)',
                  }}
                >
                  <h4 style={{ color: '#4a0e17', marginBottom: 8 }}>
                    {student.fullName} — Verified Resume Summary
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: '#475569', marginBottom: 14 }}>
                    File: <strong>{student.resume.fileName}</strong> ({student.resume.fileSize}) • Uploaded {student.resume.uploadedAt}
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, fontSize: '0.86rem' }}>
                    <div><strong>Enrollment:</strong> {student.enrollmentNumber}</div>
                    <div><strong>Department:</strong> {student.department}</div>
                    <div><strong>CGPA:</strong> {student.cgpa} / 10.0</div>
                    <div><strong>Graduation:</strong> {student.graduationYear}</div>
                    <div><strong>Email:</strong> {student.email}</div>
                    <div><strong>Phone:</strong> {student.phone}</div>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: 14 }}>
                    Tip: Upload a local PDF via "Replace Resume" to view the live embedded PDF document.
                  </p>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => setResumeModalOpen(false)}
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default StudentProfile;
