import React from 'react'
import { BarChart3, Briefcase, Search, Send, UserCheck, UserPlus } from 'lucide-react'
import SectionHeader from '../SectionHeader'
import { workflowSteps } from '../../data/homeData'

const workflowIcons = {
  UserPlus,
  Search,
  Briefcase,
  Send,
  UserCheck,
  BarChart3,
}

const WorkflowSection = () => {
  return (
    <section id="workflow" className="section-block section-alt">
      <div className="container">
        <SectionHeader
          badge="Platform Workflow"
          badgeVariant="accent"
          title="How CareerBridge Connects Every Stage"
          subtitle="A clear six-step placement journey linking students, recruiters, and TPO coordinators from onboarding to final reports."
          centered
        />

        <div className="workflow-grid">
          {workflowSteps.map((item) => {
            const IconComponent = workflowIcons[item.iconName]
            return (
              <article key={item.step} className="card card-interactive workflow-card">
                <div className="workflow-card-top">
                  <span className="workflow-step-num">{item.step}</span>
                  <div className="workflow-icon-wrap">
                    <IconComponent size={20} />
                  </div>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WorkflowSection
