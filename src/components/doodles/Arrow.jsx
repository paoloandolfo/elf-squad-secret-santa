import { motion } from 'motion/react'
import DoodleSvg from './DoodleSvg'

export default function Arrow({ className = '', delay = 0.8 }) {
  return (
    <DoodleSvg viewBox="0 0 80 90" className={className} boil={false}>
      <motion.path
        className="ink"
        d="M8 8 C44 2 72 22 60 48 C54 62 42 70 30 76"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay, duration: 0.8, ease: 'easeInOut' }}
      />
      <motion.path
        className="ink"
        d="M43 75 L29 77 L35 64"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: delay + 0.75, duration: 0.3 }}
      />
    </DoodleSvg>
  )
}
