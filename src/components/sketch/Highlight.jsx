import { motion } from 'motion/react'
import './Highlight.css'

const SWASH = 'M2 7 C22 4 58 5.5 98 3.5 L97 16 C64 17.5 30 16.5 3 18.5 Z'

export default function Highlight({ children, color = 'var(--gold-soft)', delay = 0.35 }) {
  return (
    <span className="highlight">
      <motion.svg
        className="highlight__swash"
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
        aria-hidden="true"
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={{ clipPath: 'inset(0 0% 0 0)' }}
        transition={{ delay, duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
      >
        <path d={SWASH} fill={color} />
      </motion.svg>
      <span className="highlight__text">{children}</span>
    </span>
  )
}
