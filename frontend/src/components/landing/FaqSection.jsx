import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import SectionHeader from '../SectionHeader'
import { faqItems } from '../../data/homeData'

const FaqSection = () => {
  const [openId, setOpenId] = useState(faqItems[0].id)

  const handleToggle = (id) => {
    setOpenId((prevId) => (prevId === id ? null : id))
  }

  return (
    <section id="faq" className="section-block section-alt">
      <div className="container">
        <SectionHeader
          badge="FAQ"
          badgeVariant="primary"
          title="Frequently Asked Questions"
          subtitle="Quick answers about CareerBridge modules, user roles, and current frontend project scope."
          centered
        />

        <div className="faq-list">
          {faqItems.map((item) => {
            const isOpen = openId === item.id
            return (
              <div key={item.id} className={`faq-item ${isOpen ? 'faq-item-open' : ''}`}>
                <button
                  type="button"
                  className="faq-trigger"
                  onClick={() => handleToggle(item.id)}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <ChevronDown size={19} className="faq-chevron" />
                </button>
                <div className="faq-panel">
                  <div className="faq-panel-inner">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FaqSection
