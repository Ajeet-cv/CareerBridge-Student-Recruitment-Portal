import React from 'react'
import SectionHeader from '../SectionHeader'
import { illustrativeResults } from '../../data/homeData'

const ResultsSection = () => {
  return (
    <section id="results" className="section-block results-section">
      <div className="container">
        <SectionHeader
          badge="Illustrative Sample Metrics"
          badgeVariant="accent"
          title="Built for Measurable Campus Outcomes"
          subtitle="Sample target benchmarks illustrating the scale and coordination efficiency CareerBridge is designed to support."
          centered
        />

        <div className="results-grid">
          {illustrativeResults.map((stat) => (
            <div key={stat.id} className="result-card">
              <strong className="result-value">{stat.value}</strong>
              <span className="result-label">{stat.label}</span>
              <span className="result-note">{stat.note}</span>
            </div>
          ))}
        </div>

        <p className="results-disclaimer">
          * Figures shown above are illustrative sample benchmarks for UI demonstration and do not
          represent live production metrics.
        </p>
      </div>
    </section>
  )
}

export default ResultsSection
