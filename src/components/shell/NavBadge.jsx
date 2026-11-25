import { AnimatePresence, motion } from 'motion/react'
import './NavBadge.css'

export default function NavBadge({ badge }) {
  return (
    <AnimatePresence>
      {badge && (
        <motion.span
          className={`nav-badge ${badge.label ? 'nav-badge--count' : ''}`}
          title={badge.title}
          initial={{ scale: 0, rotate: -40 }}
          animate={{ scale: 1, rotate: -8 }}
          exit={{ scale: 0 }}
          transition={{ type: 'spring', stiffness: 520, damping: 16 }}
        >
          {badge.label}
          <span className="visually-hidden">{badge.title}</span>
        </motion.span>
      )}
    </AnimatePresence>
  )
}
