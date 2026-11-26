import React from 'react'
import {
  Briefcase,
  Building2,
  ClipboardCheck,
  FileSpreadsheet,
  FileText,
  LineChart,
  ShieldCheck,
  UserCircle2,
} from 'lucide-react'
import SectionHeader from '../SectionHeader'
import { coreFeatures } from '../../data/homeData'

const featureIcons = {
  UserCircle2,
  Briefcase,
  FileText,
  ClipboardCheck,
  Building2,
  ShieldCheck,
  LineChart,
  FileSpreadsheet,
}

const FeaturesSection = () => {
  return (
    <section id="features" className="section-block">
      <div className="container">
        <SectionHeader
          badge="Core Features"
          badgeVariant="primary"
          title="Everything Needed for Campus Recruitment"
          subtitle="Purpose-built modules crafted to simplify student applications, recruiter shortlisting, and TPO placement oversight."
        />

        <div className="features-grid">
          {coreFeatures.map((feature) => {
            const IconComponent = featureIcons[feature.iconName]
            return (
              <article key={feature.id} className="card card-interactive feature-card">
                <div className="feature-icon-wrap">
                  <IconComponent size={22} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
