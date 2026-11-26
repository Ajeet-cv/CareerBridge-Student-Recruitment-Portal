import React from 'react'
import { Quote } from 'lucide-react'
import SectionHeader from '../SectionHeader'
import { sampleTestimonials } from '../../data/homeData'

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="section-block">
      <div className="container">
        <SectionHeader
          badge="Sample Perspectives"
          badgeVariant="primary"
          title="How Campus Users Benefit from CareerBridge"
          subtitle="Illustrative placeholder stories representing fictional student, recruiter, and TPO experiences."
          centered
        />

        <div className="testimonials-grid">
          {sampleTestimonials.map((item) => (
            <article key={item.id} className="card card-interactive testimonial-card">
              <div className="testimonial-quote-icon">
                <Quote size={20} />
              </div>
              <p className="testimonial-quote">&ldquo;{item.quote}&rdquo;</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar" aria-hidden="true">
                  {item.initials}
                </div>
                <div>
                  <strong className="testimonial-name">{item.name}</strong>
                  <span className="testimonial-role">{item.role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
