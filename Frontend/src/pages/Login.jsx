import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  ShieldCheck,
  UserCheck,
  X,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import abesLogo from '../assets/abes-logo.jpg';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetFeedback, setResetFeedback] = useState('');

  const fillDemo = (targetRole) => {
    setRole(targetRole);
    setError('');
    setSuccessMsg('');
    if (targetRole === 'admin') {
      setEmail('admin@careerbridge.edu');
      setPassword('admin123');
    } else {
      setEmail('student@careerbridge.edu');
      setPassword('password123');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    const res = login({ email, password, role, rememberMe });
    if (!res.success) {
      setError(res.message);
      return;
    }

    setSuccessMsg(`Authenticated as ${res.user.name}. Redirecting to dashboard...`);
    setTimeout(() => {
      navigate(res.user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard');
    }, 350);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!resetEmail.trim() || !/\S+@\S+\.\S+/.test(resetEmail.trim())) {
      setResetFeedback('Please enter a valid registered email address.');
      return;
    }
    setResetFeedback(
      `Password reset instructions have been queued for ${resetEmail.trim()} (demo mode).`
    );
  };

  return (
    <div className="auth-page">
      <div className="auth-brand-panel">
        <Link to="/" className="auth-logo-card">
          <img src={abesLogo} alt="ABES Placement Drive" style={{ height: 48, width: 'auto', objectFit: 'contain' }} />
        </Link>

        <div className="auth-brand-content">
          <h1>One Portal for Every Campus Placement Milestone.</h1>
          <p>
            Access verified job drives, automatic eligibility verification, interview schedules, and placement analytics.
          </p>
          <div className="auth-feature-list">
            <div className="auth-feature-item">
              <CheckCircle2 size={18} color="#f3c65f" />
              <span>Real-time application tracking across all partner companies</span>
            </div>
            <div className="auth-feature-item">
              <CheckCircle2 size={18} color="#f3c65f" />
              <span>Role-based dashboards for Students & Placement Officers</span>
            </div>
            <div className="auth-feature-item">
              <CheckCircle2 size={18} color="#f3c65f" />
              <span>Synchronized LocalStorage state for instant end-to-end testing</span>
            </div>
          </div>
        </div>

        <div style={{ fontSize: '0.82rem', color: '#e5d4d6' }}>
          © 2026 ABESEC Ghaziabad • CareerBridge Placement Portal
        </div>
      </div>

      <div className="auth-form-panel">
        <div className="auth-card">
          <div className="auth-header">
            <Link to="/" style={{ fontSize: '0.84rem', color: '#7a1624', fontWeight: 600 }}>
              ← Back to Home
            </Link>
            <h2 style={{ marginTop: 10 }}>Sign in to CareerBridge</h2>
            <p>Select your portal role and enter your credentials.</p>
          </div>

          <div className="role-toggle" role="tablist" aria-label="Account role">
            <button
              type="button"
              role="tab"
              aria-selected={role === 'student'}
              className={`role-toggle-btn ${role === 'student' ? 'active' : ''}`}
              onClick={() => {
                setRole('student');
                setError('');
              }}
            >
              <UserCheck size={16} />
              Student
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={role === 'admin'}
              className={`role-toggle-btn ${role === 'admin' ? 'active' : ''}`}
              onClick={() => {
                setRole('admin');
                setError('');
              }}
            >
              <ShieldCheck size={16} />
              Admin
            </button>
          </div>

          {error && (
            <div className="alert alert-error" style={{ marginBottom: 16 }}>
              <AlertCircle size={18} style={{ flexShrink: 0, marginTop: 1 }} />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="alert alert-success" style={{ marginBottom: 16 }}>
              <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: 1 }} />
              <span>{successMsg}</span>
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="login-email">
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                className="form-control"
                placeholder={role === 'admin' ? 'admin@careerbridge.edu' : 'student@careerbridge.edu'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="login-password">
                Password
              </label>
              <div className="password-input-wrap">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="auth-row-between">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                className="link-btn"
                onClick={() => {
                  setResetEmail(email);
                  setResetFeedback('');
                  setForgotModalOpen(true);
                }}
              >
                Forgot password?
              </button>
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              Login as {role === 'admin' ? 'Admin' : 'Student'}
            </button>
          </form>

          <div className="demo-box">
            <div className="demo-box-header">Quick Demo Access</div>
            <div style={{ color: '#475569' }}>
              Student: <code>student@careerbridge.edu</code> / <code>password123</code>
              <br />
              Admin: <code>admin@careerbridge.edu</code> / <code>admin123</code>
            </div>
            <div className="demo-btn-row">
              <button type="button" className="btn btn-outline btn-sm" onClick={() => fillDemo('student')}>
                Fill Student Demo
              </button>
              <button type="button" className="btn btn-outline btn-sm" onClick={() => fillDemo('admin')}>
                Fill Admin Demo
              </button>
            </div>
          </div>

          <div className="auth-footer-link">
            Need a Student or Admin account? <Link to="/register">Register here</Link>
          </div>
        </div>
      </div>

      {forgotModalOpen && (
        <div className="modal-backdrop" onClick={() => setForgotModalOpen(false)}>
          <div className="modal-card" style={{ maxWidth: 440 }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Reset Account Password</h3>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setForgotModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleForgotSubmit}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <p style={{ fontSize: '0.88rem', color: '#475569' }}>
                  Enter your college or placement email address to receive a password reset link.
                </p>
                <div className="form-group">
                  <label className="form-label" htmlFor="reset-email">
                    Registered Email
                  </label>
                  <input
                    id="reset-email"
                    type="email"
                    className="form-control"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="you@careerbridge.edu"
                  />
                </div>
                {resetFeedback && (
                  <div className="alert alert-info">{resetFeedback}</div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => setForgotModalOpen(false)}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Send Reset Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
