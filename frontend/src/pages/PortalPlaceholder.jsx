import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Briefcase, Compass, Lock } from 'lucide-react'
import './PortalPlaceholder.css'

const placeholderConfig = {
  auth: {
    badge: 'Upcoming Module · Phase 3',
    title: 'Account Access & Role Onboarding',
    description:
      'Student, Recruiter, and TPO sign-in and registration flows are scheduled for the next development phase. No authentication is active in Phase 2.',
    icon: Lock,
    highlights: [
      'Student registration & profile setup',
      'Recruiter verification & workspace access',
      'TPO / Administrator placement controls',
    ],
  },
  opportunities: {
    badge: 'Upcoming Module · Job Board',
    title: 'Campus Opportunities Directory',
    description:
      'The dedicated searchable job and internship board with branch filters and one-click applications will be introduced in an upcoming phase.',
    icon: Briefcase,
    highlights: [
      'Filter full-time roles and summer internships',
      'Check branch, CGPA, and deadline eligibility',
      'Track shortlisted and interview stages live',
    ],
  },
}

const PortalPlaceholder = ({ variant = 'auth' }) => {
  const content = placeholderConfig[variant] || placeholderConfig.auth
  const IconComponent = content.icon

  return (
    <section className="placeholder-page">
      <div className="container">
        <div className="card placeholder-card">
          <div className="placeholder-icon-wrap">
            <IconComponent size={28} />
          </div>
          <span className="badge badge-accent">{content.badge}</span>
          <h1>{content.title}</h1>
          <p className="placeholder-description">{content.description}</p>

          <div className="placeholder-list">
            {content.highlights.map((item) => (
              <div key={item} className="placeholder-list-item">
                <Compass size={16} />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="placeholder-actions">
            <Link to="/" className="btn btn-primary">
              <ArrowLeft size={16} />
              Back to Landing Page
            </Link>
            <Link to="/#workflow" className="btn btn-outline">
              View Platform Workflow
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PortalPlaceholder
