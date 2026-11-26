import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import HeroSection from '../components/landing/HeroSection'
import ProblemSolution from '../components/landing/ProblemSolution'
import WorkflowSection from '../components/landing/WorkflowSection'
import FeaturesSection from '../components/landing/FeaturesSection'
import RolesSection from '../components/landing/RolesSection'
import ResultsSection from '../components/landing/ResultsSection'
import TestimonialsSection from '../components/landing/TestimonialsSection'
import FaqSection from '../components/landing/FaqSection'
import FinalCta from '../components/landing/FinalCta'
import './Home.css'

const Home = () => {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.replace('#', ''))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [hash])

  return (
    <div className="home-page">
      <HeroSection />
      <ProblemSolution />
      <WorkflowSection />
      <FeaturesSection />
      <RolesSection />
      <ResultsSection />
      <TestimonialsSection />
      <FaqSection />
      <FinalCta />
    </div>
  )
}

export default Home
