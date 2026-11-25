import { motion } from 'motion/react'
import DoodleSvg from './DoodleSvg'

const STROKES = [
  'M6 14 C50 5 110 4 170 8 C200 10 228 13 294 9',
  'M30 20 C90 14 160 14 270 18',
]

export default function Scribble({ className = '', delay = 0.9, color = 'var(--berry)' }) {
  return (
    <DoodleSvg viewBox="0 0 300 26" className={className} boil={false} preserveAspectRatio="none">
      {STROKES.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          fill="none"
          stroke={color}
          strokeWidth={i === 0 ? 4 : 3}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: delay + i * 0.35, duration: 0.6, ease: 'easeInOut' }}
        />
      ))}
    </DoodleSvg>
  )
}
