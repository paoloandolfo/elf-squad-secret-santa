import { motion } from 'motion/react'
import './MarkerCircle.css'

const LOOP = 'M22 9 C46 1 96 2 112 14 C124 24 106 43 66 45 C30 47 5 40 5 26 C5 13 30 5 66 6'

export default function MarkerCircle({ layoutId, className = '', color = 'var(--berry)' }) {
  return (
    <motion.span
      layoutId={layoutId}
      className={`marker-circle ${className}`}
      transition={{ type: 'spring', stiffness: 460, damping: 36 }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 120 50" preserveAspectRatio="none">
        <motion.path
          d={LOOP}
          stroke={color}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </svg>
    </motion.span>
  )
}
