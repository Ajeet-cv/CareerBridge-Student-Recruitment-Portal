import React from 'react'

const SectionHeader = ({ badge, badgeVariant = 'primary', title, subtitle, centered = false }) => {
  return (
    <div className={`section-header ${centered ? 'section-header-centered' : ''}`}>
      {badge && <span className={`badge badge-${badgeVariant}`}>{badge}</span>}
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  )
}

export default SectionHeader
