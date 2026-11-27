import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DEPARTMENTS, GRADUATION_YEARS } from '../services/storage';
import abesLogo from '../assets/abes-logo.jpg';

const ADMIN_DESIGNATIONS = [
  'Placement Officer',
  'Assistant Placement Officer',
  'Faculty TPO Coordinator',
  'Department Placement Lead',
];

function Register() {
  const { registerStudent, registerAdmin } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState('student');
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    enrollmentNumber: '',
    department: DEPARTMENTS[0],
    graduationYear: '2026',
    employeeId: '',
    designation: ADMIN_DESIGNATIONS[0],
    adminDepartment: 'Training & Placement Cell',
    phone: '',
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleRoleSwitch = (nextRole) => {
    setRole(nextRole);
    setErrors({});
    setSubmitError('');
    setSuccessMsg('');
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.fullName.trim() || form.fullName.trim().length < 2) {
      nextErrors.fullName = 'Full name is required.';
    }
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email.trim())) {
      nextErrors.email =
        role === 'admin' ? 'Valid official email is required.' : 'Valid college email is required.';
    }
    if (role === 'student' && !form.enrollmentNumber.trim()) {
      nextErrors.enrollmentNumber = 'Enrollment number is required.';
    }
    if (role === 'admin' && !form.employeeId.trim()) {
      nextErrors.employeeId = 'Employee / Staff ID is required.';
    }
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 10) {
      nextErrors.phone = 'Valid 10-digit phone number is required.';
    }
    if (!form.password || form.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.';
    }
    if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = 'Passwords do not match.';
    }
    if (!form.agreeTerms) {
      nextErrors.agreeTerms = 'You must accept the terms and placement policy.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError('');
    setSuccessMsg('');
    if (!validate()) return;

    const res = role === 'admin' ? registerAdmin(form) : registerStudent(form);
    if (!res.success) {
      setSubmitError(res.message);
      return;
    }

    const targetPath = role === 'admin' ? '/admin/dashboard' : '/student/dashboard';
    setSuccessMsg(
      `${role === 'admin' ? 'Admin' : 'Student'} account created successfully! Redirecting to dashboard...`
    );
    setTimeout(() => {
      navigate(targetPath);
    }, 450);
  };

  return (
    <div className="auth-page">
      <div className="auth-brand-panel">
        <Link to="/" className="auth-logo-card">
          <img src={abesLogo} alt="ABES Placement Drive" style={{ height: 48, width: 'auto', objectFit: 'contain' }} />
        </Link>

        <div className="auth-brand-content">
          <h1>
            {role === 'admin'
              ? 'Empower Your Placement Cell Operations.'
              : 'Start Your Campus Placement Journey Today.'}
          </h1>
          <p>
            {role === 'admin'
              ? 'Onboard placement coordinators and faculty leads to manage companies, job drives, interviews, and department analytics.'
              : 'Create your verified student profile to discover top hiring companies, check job eligibility automatically, and track every interview stage.'}
          </p>
          <div className="auth-feature-list">
            <div className="auth-feature-item">
              <CheckCircle2 size={18} color="#f3c65f" />
              <span>
                {role === 'admin'
                  ? 'Manage recruiting companies, job drives, and eligibility rules'
                  : 'Instant eligibility check based on CGPA & branch'}
              </span>
            </div>
            <div className="auth-feature-item">
              <CheckCircle2 size={18} color="#f3c65f" />
              <span>
                {role === 'admin'
                  ? 'Shortlist applicants, schedule interviews, and publish results'
                  : 'Upload and preview your PDF resume anytime'}
              </span>
            </div>
            <div className="auth-feature-item">
              <CheckCircle2 size={18} color="#f3c65f" />
              <span>
                {role === 'admin'
                  ? 'Generate interactive placement reports & export summaries'
                  : 'Live notifications for shortlists & interview slots'}
              </span>
            </div>
          </div>
        </div>

        <div style={{ fontSize: '0.82rem', color: '#e5d4d6' }}>
          © 2026 ABESEC Ghaziabad • CareerBridge Placement Portal
        </div>
      </div>

      <div className="auth-form-panel">
        <div className="auth-card wide">
          <div className="auth-header">
            <Link to="/" style={{ fontSize: '0.84rem', color: '#7a1624', fontWeight: 600 }}>
              ← Back to Home
            </Link>
            <h2 style={{ marginTop: 10 }}>
              {role === 'admin' ? 'Admin Registration' : 'Student Registration'}
            </h2>
            <p>
              {role === 'admin'
                ? 'Register a new placement cell administrator or faculty coordinator.'
                : 'Register with your college enrollment details to access placement drives.'}
            </p>
          </div>

          <div className="role-toggle" role="tablist" aria-label="Registration role">
            <button
              type="button"
              role="tab"
              aria-selected={role === 'student'}
              className={`role-toggle-btn ${role === 'student' ? 'active' : ''}`}
              onClick={() => handleRoleSwitch('student')}
            >
              <UserCheck size={16} />
              Student
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={role === 'admin'}
              className={`role-toggle-btn ${role === 'admin' ? 'active' : ''}`}
              onClick={() => handleRoleSwitch('admin')}
            >
              <ShieldCheck size={16} />
              Admin
            </button>
          </div>

          {submitError && (
            <div className="alert alert-error" style={{ marginBottom: 16 }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{submitError}</span>
            </div>
          )}

          {successMsg && (
            <div className="alert alert-success" style={{ marginBottom: 16 }}>
              <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
              <span>{successMsg}</span>
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="auth-form-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="reg-name">
                  Full Name
                </label>
                <input
                  id="reg-name"
                  type="text"
                  className="form-control"
                  placeholder={role === 'admin' ? 'e.g., Prof. Rajesh Verma' : 'e.g., Aarav Sharma'}
                  value={form.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                />
                {errors.fullName && <span className="form-error">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="reg-email">
                  {role === 'admin' ? 'Official Email' : 'College Email'}
                </label>
                <input
                  id="reg-email"
                  type="email"
                  className="form-control"
                  placeholder={
                    role === 'admin' ? 'coordinator@careerbridge.edu' : 'name@careerbridge.edu'
                  }
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>

              {role === 'student' ? (
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-enroll">
                    Enrollment Number
                  </label>
                  <input
                    id="reg-enroll"
                    type="text"
                    className="form-control"
                    placeholder="e.g., CB2022CS048"
                    value={form.enrollmentNumber}
                    onChange={(e) => handleChange('enrollmentNumber', e.target.value)}
                  />
                  {errors.enrollmentNumber && (
                    <span className="form-error">{errors.enrollmentNumber}</span>
                  )}
                </div>
              ) : (
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-empid">
                    Employee / Staff ID
                  </label>
                  <input
                    id="reg-empid"
                    type="text"
                    className="form-control"
                    placeholder="e.g., EMP-CB-004"
                    value={form.employeeId}
                    onChange={(e) => handleChange('employeeId', e.target.value)}
                  />
                  {errors.employeeId && <span className="form-error">{errors.employeeId}</span>}
                </div>
              )}

              <div className="form-group">
                <label className="form-label" htmlFor="reg-phone">
                  Phone Number
                </label>
                <input
                  id="reg-phone"
                  type="tel"
                  className="form-control"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                />
                {errors.phone && <span className="form-error">{errors.phone}</span>}
              </div>

              {role === 'student' ? (
                <>
                  <div className="form-group">
                    <label className="form-label" htmlFor="reg-dept">
                      Department
                    </label>
                    <select
                      id="reg-dept"
                      className="form-control"
                      value={form.department}
                      onChange={(e) => handleChange('department', e.target.value)}
                    >
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="reg-year">
                      Graduation Year
                    </label>
                    <select
                      id="reg-year"
                      className="form-control"
                      value={form.graduationYear}
                      onChange={(e) => handleChange('graduationYear', e.target.value)}
                    >
                      {GRADUATION_YEARS.map((yr) => (
                        <option key={yr} value={yr}>
                          {yr}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group">
                    <label className="form-label" htmlFor="reg-desig">
                      Designation
                    </label>
                    <select
                      id="reg-desig"
                      className="form-control"
                      value={form.designation}
                      onChange={(e) => handleChange('designation', e.target.value)}
                    >
                      {ADMIN_DESIGNATIONS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="reg-admin-dept">
                      Placement Cell / Department
                    </label>
                    <input
                      id="reg-admin-dept"
                      type="text"
                      className="form-control"
                      placeholder="Training & Placement Cell"
                      value={form.adminDepartment}
                      onChange={(e) => handleChange('adminDepartment', e.target.value)}
                    />
                  </div>
                </>
              )}

              <div className="form-group">
                <label className="form-label" htmlFor="reg-pass">
                  Password
                </label>
                <div className="password-input-wrap">
                  <input
                    id="reg-pass"
                    type={showPass ? 'text' : 'password'}
                    className="form-control"
                    placeholder="Min. 6 characters"
                    value={form.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPass((p) => !p)}
                    aria-label={showPass ? 'Hide password' : 'Show password'}
                  >
                    {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
                {errors.password && <span className="form-error">{errors.password}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="reg-confirm">
                  Confirm Password
                </label>
                <input
                  id="reg-confirm"
                  type={showPass ? 'text' : 'password'}
                  className="form-control"
                  placeholder="Re-enter password"
                  value={form.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                />
                {errors.confirmPassword && (
                  <span className="form-error">{errors.confirmPassword}</span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={form.agreeTerms}
                  onChange={(e) => handleChange('agreeTerms', e.target.checked)}
                />
                <span>
                  I agree to the CareerBridge Terms & Conditions and University Placement Cell Guidelines.
                </span>
              </label>
              {errors.agreeTerms && <span className="form-error">{errors.agreeTerms}</span>}
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              {role === 'admin' ? 'Create Admin Account' : 'Create Student Account'}
            </button>
          </form>

          <div className="auth-footer-link">
            Already registered? <Link to="/login">Sign in here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
