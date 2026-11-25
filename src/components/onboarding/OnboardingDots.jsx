import { motion } from 'motion/react'
import './OnboardingDots.css'

export default function OnboardingDots({ count, index, onSelect }) {
  return (
    <div className="onboarding-dots" role="tablist" aria-label="Steps">
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === index}
          aria-label={`Step ${i + 1}`}
          className="onboarding-dots__dot"
          onClick={() => onSelect(i)}
        >
          <motion.span animate={{ width: i === index ? 26 : 10 }} transition={{ type: 'spring', stiffness: 400, damping: 28 }} />
        </button>
      ))}
    </div>
  )
}
