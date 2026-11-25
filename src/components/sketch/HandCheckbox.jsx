import { motion } from 'motion/react'
import './HandCheckbox.css'

const BOX = 'M5 6 C12 4.5 20 5 27 5.5 C27.5 13 27.2 20 26.6 27 C19 27.6 12 27.4 5.4 26.8 C4.8 20 4.6 13 5 6 Z'
const TICK = 'M9 16 C11 18 13 20.5 14.5 23.5 C18 15 22.5 9 30 3'

export default function HandCheckbox({ checked, locked = false, size = 30, delay = 0 }) {
  return (
    <svg
      className={`hand-check ${locked ? 'hand-check--locked' : ''}`}
      viewBox="0 0 32 32"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <path className="hand-check__box" d={BOX} />
      {checked && (
        <motion.path
          className="hand-check__tick"
          d={TICK}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay, duration: 0.45, ease: 'easeOut' }}
        />
      )}
    </svg>
  )
}
