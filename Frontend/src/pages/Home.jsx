import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  Briefcase,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  MapPin,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserCheck,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

const STEPS = [
  {
    num: '01',
    title: 'Create Academic Profile',
    desc: 'Register with your college enrollment number, CGPA, branch details, and upload your verified PDF resume.',
  },
  {
    num: '02',
    title: 'Check Instant Eligibility',
    desc: 'Our engine automatically compares your CGPA, branch, and backlogs against every company drive requirement.',
  },
  {
    num: '03',
    title: 'Apply & Track Rounds',
    desc: 'Submit one-click applications and follow real-time status updates from Shortlisted to Interview Scheduled.',
  },
  {
    num: '04',
    title: 'Interview & Get Selected',
    desc: 'Receive direct interview schedules, meeting links, and final placement offers on your student dashboard.',
  },
];

const TESTIMONIALS = [
  {
    quote:
      'CareerBridge eliminated spreadsheet chaos during campus drives. I could immediately see which roles matched my CGPA and track every interview round in real time.',
    name: 'Priya Verma',
    role: 'Systems Engineer – Prime at TCS',
    batch: 'CSE Class of 2026 • 11.5 LPA',
    initials: 'PV',
  },
  {
    quote:
      'Automated eligibility checks saved hours of guesswork. Within two weeks of uploading my resume, I was shortlisted by Deloitte and cleared the final interview.',
    name: 'Ananya Gupta',
    role: 'Cyber Risk Engineer at Deloitte',
    batch: 'CSE Class of 2026 • 9.0 LPA',
    initials: 'AG',
  },
  {
    quote:
      'From receiving notifications on new openings to checking my seminar hall interview slot, everything felt transparent, fast, and stress-free.',
    name: 'Rohan Deshmukh',
    role: 'Senior Analyst at Capgemini',
    batch: 'IT Class of 2026 • 7.5 LPA',
    initials: 'RD',
  },
];

function Home() {
  const { companies, jobs } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();

  const openJobs = jobs.filter((j) => j.status === 'Open').slice(0, 6);

  const handleApplyRedirect = () => {
    if (user?.role === 'student') {
      navigate('/student/jobs');
    } else if (user?.role === 'admin') {
      navigate('/admin/jobs');
    } else {
      navigate('/register');
    }
  };

  return (
    <div id="home">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div>
            <div className="hero-pill">
              <Sparkles size={15} />
              <span>University Placement & Recruitment SaaS</span>
            </div>
            <h1 className="hero-title">
              Bridge Your Skills to Your <span>Dream Career</span>
            </h1>
            <p className="hero-desc">
              CareerBridge streamlines campus placements for students and university placement cells—combining automated eligibility verification, structured drive management, interview scheduling, and real-time analytics in one unified portal.
            </p>

            <div className="hero-actions">
              <Link to={user ? (user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard') : '/register'} className="btn btn-primary btn-lg">
                Get Started
                <ArrowRight size={18} />
              </Link>
              <a href="#opportunities" className="btn btn-outline btn-lg">
                Explore Opportunities
              </a>
            </div>

            <div className="hero-trust">
              <span className="hero-trust-item">
                <ShieldCheck size={16} color="#16a34a" />
                Automated Eligibility Check
              </span>
              <span className="hero-trust-item">
                <CheckCircle2 size={16} color="#7a1624" />
                Live Interview Scheduling
              </span>
              <span className="hero-trust-item">
                <TrendingUp size={16} color="#4a0e17" />
                Real-Time Placement Insights
              </span>
            </div>
          </div>

          {/* Live Portal Snapshot */}
          <div className="hero-preview-card">
            <div className="hero-preview-header">
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#7a1624', textTransform: 'uppercase' }}>
                  Live Campus Drive Snapshot
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#4a0e17' }}>
                  2026 Recruitment Season
                </div>
              </div>
              <span className="badge badge-green">Active Drives</span>
            </div>

            <div className="hero-preview-kpis">
              <div className="hero-kpi-box">
                <div className="label">Open Drives</div>
                <div className="value">{jobs.filter((j) => j.status === 'Open').length}</div>
              </div>
              <div className="hero-kpi-box">
                <div className="label">Recruiting Partners</div>
                <div className="value">{companies.length}+</div>
              </div>
            </div>

            <div className="hero-drive-list">
              {openJobs.slice(0, 3).map((job) => {
                const company = companies.find((c) => c.id === job.companyId);
                return (
                  <div key={job.id} className="hero-drive-item">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div
                        className="company-logo-box"
                        style={{
                          width: 38,
                          height: 38,
                          fontSize: '0.76rem',
                          backgroundColor: company?.color || '#7a1624',
                        }}
                      >
                        {company?.shortCode || 'CO'}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#0f172a' }}>
                          {job.title}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                          {company?.name} • {job.location}
                        </div>
                      </div>
                    </div>
                    <span className="badge badge-blue">{job.packageLPA} LPA</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Hiring Companies */}
      <section id="companies" className="landing-section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">Featured Hiring Companies</div>
            <h2 className="section-title">Trusted by Leading Global Employers</h2>
            <p className="section-subtitle">
              Top technology and consulting enterprises recruit directly through CareerBridge campus drives every academic year.
            </p>
          </div>

          <div className="companies-strip">
            {companies.map((company) => (
              <div key={company.id} className="company-tile">
                <div
                  className="company-logo-box"
                  style={{ width: 52, height: 52, backgroundColor: company.color }}
                >
                  {company.shortCode}
                </div>
                <div style={{ fontWeight: 700, color: '#4a0e17', fontSize: '1rem' }}>
                  {company.name}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{company.industry}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How CareerBridge Works */}
      <section id="about" className="landing-section white">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">How CareerBridge Works</div>
            <h2 className="section-title">Built for Seamless Campus Recruitment</h2>
            <p className="section-subtitle">
              A structured four-step workflow designed for students, placement officers, and visiting corporate recruiters.
            </p>
          </div>

          <div className="steps-grid">
            {STEPS.map((step) => (
              <div key={step.num} className="step-card">
                <div className="step-number">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Opportunities Preview */}
      <section id="opportunities" className="landing-section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">Current Openings</div>
            <h2 className="section-title">Explore Featured Placement Drives</h2>
            <p className="section-subtitle">
              Preview active campus opportunities. Sign in or create your student account to check automatic eligibility and apply.
            </p>
          </div>

          <div className="opportunities-preview-grid">
            {openJobs.map((job) => {
              const company = companies.find((c) => c.id === job.companyId);
              return (
                <div key={job.id} className="job-card">
                  <div className="job-card-top">
                    <div className="company-identity">
                      <div
                        className="company-logo-box"
                        style={{ backgroundColor: company?.color || '#7a1624' }}
                      >
                        {company?.shortCode || 'CO'}
                      </div>
                      <div>
                        <h3 className="job-role-title">{job.title}</h3>
                        <div className="job-company-name">{company?.name}</div>
                      </div>
                    </div>
                    <span className="badge badge-green">{job.packageLPA} LPA</span>
                  </div>

                  <p style={{ fontSize: '0.86rem', color: '#475569' }}>{job.description}</p>

                  <div className="job-meta-grid">
                    <div className="job-meta-item">
                      <MapPin size={14} color="#64748b" />
                      <span>{job.location}</span>
                    </div>
                    <div className="job-meta-item">
                      <Briefcase size={14} color="#64748b" />
                      <span>Min CGPA: {job.minCGPA}</span>
                    </div>
                  </div>

                  <div className="job-card-footer">
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      Deadline: {job.deadline}
                    </span>
                    <button type="button" className="btn btn-primary btn-sm" onClick={handleApplyRedirect}>
                      Check & Apply
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Platform Statistics */}
      <section className="landing-section navy">
        <div className="container">
          <div className="section-header" style={{ marginBottom: 38 }}>
            <div className="section-eyebrow" style={{ color: '#f3c65f' }}>
              Platform Impact
            </div>
            <h2 className="section-title" style={{ color: '#ffffff' }}>
              Measurable Placement Outcomes Across Departments
            </h2>
          </div>

          <div className="platform-stats-grid">
            <div className="platform-stat-card">
              <div className="num">94.2%</div>
              <div className="lbl">Eligible Student Placement Rate</div>
            </div>
            <div className="platform-stat-card">
              <div className="num">120+</div>
              <div className="lbl">Verified Recruiting Companies</div>
            </div>
            <div className="platform-stat-card">
              <div className="num">1,850+</div>
              <div className="lbl">Campus Offers Extended</div>
            </div>
            <div className="platform-stat-card">
              <div className="num">12.0 LPA</div>
              <div className="lbl">Highest Package This Season</div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Success Section */}
      <section id="success" className="landing-section white">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">Student Success Stories</div>
            <h2 className="section-title">From Campus Prep to Offer Letters</h2>
            <p className="section-subtitle">
              Hear from graduating students who navigated their placement journey using CareerBridge.
            </p>
          </div>

          <div className="testimonials-grid">
            {TESTIMONIALS.map((item) => (
              <div key={item.name} className="testimonial-card">
                <div>
                  <div style={{ display: 'flex', gap: 6, marginBottom: 12, color: '#7a1624' }}>
                    <Award size={18} />
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase' }}>
                      Verified Placement
                    </span>
                  </div>
                  <p className="testimonial-quote">"{item.quote}"</p>
                </div>

                <div className="testimonial-author">
                  <div className="avatar-circle">{item.initials}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#4a0e17' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#475569' }}>{item.role}</div>
                    <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600 }}>
                      {item.batch}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div
            style={{
              marginTop: 48,
              backgroundColor: '#fdf2f4',
              border: '1px solid #f3c7ce',
              borderRadius: 14,
              padding: '28px 32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 18,
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#4a0e17', marginBottom: 4 }}>
                Ready to Launch Your Campus Placement Drive?
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#475569' }}>
                Sign in as a student or placement administrator to experience the complete portal.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/login" className="btn btn-outline">
                <UserCheck size={17} />
                Login to Portal
              </Link>
              <Link to="/register" className="btn btn-primary">
                <Building2 size={17} />
                Student Register
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
