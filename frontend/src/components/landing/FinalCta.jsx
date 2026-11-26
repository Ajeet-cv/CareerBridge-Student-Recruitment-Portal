import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Compass } from 'lucide-react'

const FinalCta = () => {
  return (
    <section className="section-block final-cta-section">
      <div className="container">
        <div className="final-cta-card">
          <div className="final-cta-content">
            <span className="final-cta-eyebrow">Ready to Bridge Campus Talent &amp; Careers?</span>
            <h2>Start Your Campus Recruitment Journey with CareerBridge</h2>
            <p>
              Whether you are a student preparing for placements, a recruiter hiring fresh talent,
              or a TPO managing drives, CareerBridge brings everything together cleanly.
            </p>
          </div>
          <div className="final-cta-actions">
            <Link to="/get-started" className="btn btn-accent btn-lg">
              Get Started
              <ArrowRight size={18} />
            </Link>
            <Link to="/opportunities" className="btn final-cta-outline btn-lg">
              <Compass size={18} />
              Explore Opportunities
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FinalCta
