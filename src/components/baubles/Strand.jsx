import { motion } from 'motion/react'
import Bow from '../doodles/Bow'
import './Strand.css'

const WIRE = 'M0 0 Q50 20 100 0'
const ECHO = 'M0 0.8 Q50 21.6 100 0.8'
const BOW_COLORS = ['var(--berry)', 'var(--pine)', 'var(--gold)']

export default function Strand({ index, children }) {
  const delay = 0.25 + index * 0.18
  const bowColor = BOW_COLORS[index % BOW_COLORS.length]

  return (
    <div className="strand">
      <motion.svg
        className="strand__wire"
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        aria-hidden="true"
        initial={{ clipPath: 'inset(-50% 100% -50% 0)' }}
        animate={{ clipPath: 'inset(-50% 0% -50% 0)' }}
        transition={{ delay, duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
      >
        <path className="strand__line" d={WIRE} />
        <path className="strand__line strand__line--echo" d={ECHO} />
      </motion.svg>
      {['start', 'end'].map((side, i) => (
        <motion.span
          key={side}
          className={`strand__bow strand__bow--${side}`}
          initial={{ scale: 0, rotate: i ? 40 : -40 }}
          animate={{ scale: 1, rotate: i ? 8 : -8 }}
          transition={{ delay: delay + i * 0.8, type: 'spring', stiffness: 380, damping: 12 }}
        >
          <Bow color={bowColor} />
        </motion.span>
      ))}
      <ul className="strand__row">{children}</ul>
    </div>
  )
}
