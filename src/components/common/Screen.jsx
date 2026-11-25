import { motion } from 'motion/react'

export default function Screen({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28, rotate: -0.8 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      exit={{ opacity: 0, y: -18, rotate: 0.6, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', stiffness: 220, damping: 24 }}
    >
      {children}
    </motion.div>
  )
}
