import React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Compass,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react'

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-bg-decor" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-content">
          <span className="badge badge-accent hero-badge">
            <Sparkles size={14} />
            Campus Placement &amp; Recruitment Platform
          </span>
          <h1 className="hero-title">
            Bridging Students, Recruiters &amp; Placement Cells in One Portal
          </h1>
          <p className="hero-subtitle">
            CareerBridge simplifies university hiring by uniting student profiles, verified campus
            opportunities, recruiter shortlisting, and TPO oversight inside one modern SaaS
            experience.
          </p>

          <div className="hero-actions">
            <Link to="/get-started" className="btn btn-secondary btn-lg">
              Get Started
              <ArrowRight size={18} />
            </Link>
            <Link to="/opportunities" className="btn btn-outline btn-lg">
              <Compass size={18} />
              Explore Opportunities
            </Link>
          </div>

          <div className="hero-meta">
            <span>
              <CheckCircle2 size={16} /> Student Profiles &amp; Resumes
            </span>
            <span>
              <CheckCircle2 size={16} /> Structured Shortlisting
            </span>
            <span>
              <CheckCircle2 size={16} /> TPO Drive Monitoring
            </span>
          </div>
        </div>

        {/* Modern Dashboard-Style Visual Preview */}
        <div className="hero-visual">
          <div className="hero-dashboard-card card">
            <div className="dash-topbar">
              <div className="dash-dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <span className="dash-title">CareerBridge Workspace · Preview</span>
              <span className="badge badge-accent">Live Layout</span>
            </div>

            <div className="dash-stat-row">
              <div className="dash-stat-box">
                <span className="dash-stat-label">Drive Status</span>
                <strong className="dash-stat-value">Campus Season</strong>
              </div>
              <div className="dash-stat-box">
                <span className="dash-stat-label">Sample Pipeline</span>
                <strong className="dash-stat-value dash-value-teal">4 Active Stages</strong>
              </div>
            </div>

            <div className="dash-pipeline">
              <div className="dash-pipeline-head">
                <span>Sample Recruitment Flow</span>
                <TrendingUp size={15} />
              </div>

              <div className="dash-pipeline-item">
                <div className="dash-item-left">
                  <Briefcase size={15} />
                  <span>Software Engineer Intern · Sample Drive</span>
                </div>
                <span className="badge badge-primary">Shortlisting</span>
              </div>

              <div className="dash-pipeline-item">
                <div className="dash-item-left">
                  <ShieldCheck size={15} />
                  <span>TPO Eligibility &amp; Resume Check</span>
                </div>
                <span className="badge badge-accent">Verified</span>
              </div>
            </div>

            <div className="dash-progress-wrap">
              <div className="dash-progress-labels">
                <span>Profile Readiness (Illustrative)</span>
                <strong>85%</strong>
              </div>
              <div className="dash-progress-track">
                <div className="dash-progress-fill" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
