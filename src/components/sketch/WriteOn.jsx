import { motion } from 'motion/react'

export default function WriteOn({ text, delay = 0, duration = 1.1, className = '' }) {
  return (
    <motion.span
      className={className}
      style={{ display: 'inline-block', paddingRight: '0.15em' }}
      initial={{ clipPath: 'inset(-20% 100% -20% 0)' }}
      animate={{ clipPath: 'inset(-20% 0% -20% 0)' }}
      transition={{ delay, duration, ease: [0.45, 0.05, 0.4, 1] }}
    >
      {text}
    </motion.span>
  )
}
