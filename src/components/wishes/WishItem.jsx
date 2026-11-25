import { motion } from 'motion/react'
import WishLine from './WishLine'
import './WishItem.css'

const SCRIBBLE = 'M2 14 C30 4 50 22 80 10 C110 0 130 20 160 9 C185 2 200 16 218 10'

export default function WishItem({ wish, index, removing, onRemove }) {
  return (
    <motion.li
      layout
      className="wish-item"
      initial={{ opacity: 0, x: -16, rotate: -1 }}
      animate={{ opacity: 1, x: 0, rotate: 0 }}
      exit={{ opacity: 0, height: 0, transition: { duration: 0.25 } }}
    >
      <WishLine wish={wish} index={index} />
      {removing && (
        <svg className="wish-item__scratch" viewBox="0 0 220 24" preserveAspectRatio="none" aria-hidden="true">
          <motion.path
            d={SCRIBBLE}
            fill="none"
            stroke="var(--berry)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          />
        </svg>
      )}
      <button
        type="button"
        className="wish-item__remove"
        onClick={onRemove}
        disabled={removing}
        aria-label={`Remove “${wish.body}”`}
      >
        ×
      </button>
    </motion.li>
  )
}
