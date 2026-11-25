import { motion } from 'motion/react'
import Sparkle from '../doodles/Sparkle'
import './SparkleBurst.css'

const COLORS = ['var(--gold)', 'var(--berry)', 'var(--ice)', 'var(--pine-soft)']

export default function SparkleBurst({ count = 9, radius = 72 }) {
  return (
    <span className="sparkle-burst" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 - Math.PI / 2
        const reach = radius * (i % 2 ? 0.75 : 1)
        return (
          <motion.span
            key={i}
            className="sparkle-burst__bit"
            initial={{ x: 0, y: 0, scale: 0, rotate: 0 }}
            animate={{ x: Math.cos(angle) * reach, y: Math.sin(angle) * reach, scale: [0, 1.15, 0], rotate: 140 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <Sparkle color={COLORS[i % COLORS.length]} />
          </motion.span>
        )
      })}
    </span>
  )
}
