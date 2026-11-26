import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Building2, Check, GraduationCap, ShieldCheck } from 'lucide-react'
import SectionHeader from '../SectionHeader'
import { platformRoles } from '../../data/homeData'

const roleIcons = {
  GraduationCap,
  Building2,
  ShieldCheck,
}

const RolesSection = () => {
  return (
    <section id="roles" className="section-block section-alt">
      <div className="container">
        <SectionHeader
          badge="Role-Based Platform"
          badgeVariant="accent"
          title="Tailored Workspaces for Every Campus Stakeholder"
          subtitle="Each user role gets dedicated tools designed around their exact responsibilities in the recruitment lifecycle."
          centered
        />

        <div className="roles-grid">
          {platformRoles.map((roleItem) => {
            const IconComponent = roleIcons[roleItem.iconName]
            return (
              <article
                key={roleItem.id}
                className={`card card-interactive role-card role-card-${roleItem.accent}`}
              >
                <div className="role-icon-wrap">
                  <IconComponent size={24} />
                </div>
                <div>
                  <h3>{roleItem.role}</h3>
                  <p className="role-tagline">{roleItem.tagline}</p>
                </div>

                <ul className="role-list">
                  {roleItem.highlights.map((point) => (
                    <li key={point}>
                      <Check size={16} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/get-started" className="role-link">
                  Preview {roleItem.role} Flow
                  <ArrowRight size={15} />
                </Link>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default RolesSection
