import React from 'react'
import { AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react'
import SectionHeader from '../SectionHeader'
import { problemSolutionPairs } from '../../data/homeData'

const ProblemSolution = () => {
  return (
    <section id="problem-solution" className="section-block">
      <div className="container">
        <SectionHeader
          badge="Problem vs Solution"
          badgeVariant="primary"
          title="Fixing Fragmented Campus Placements"
          subtitle="Traditional placement coordination relies on disconnected spreadsheets and emails. CareerBridge replaces guesswork with one structured workflow."
        />

        <div className="ps-grid">
          {problemSolutionPairs.map((pair) => (
            <article key={pair.id} className="card card-interactive ps-card">
              <span className="badge badge-neutral">{pair.audience}</span>

              <div className="ps-block ps-problem">
                <div className="ps-label">
                  <AlertCircle size={16} />
                  <span>The Challenge</span>
                </div>
                <h3>{pair.problemTitle}</h3>
                <p>{pair.problemText}</p>
              </div>

              <div className="ps-divider" aria-hidden="true">
                <ArrowRight size={15} />
              </div>

              <div className="ps-block ps-solution">
                <div className="ps-label ps-label-teal">
                  <CheckCircle2 size={16} />
                  <span>CareerBridge Solution</span>
                </div>
                <h4>{pair.solutionTitle}</h4>
                <p>{pair.solutionText}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProblemSolution
