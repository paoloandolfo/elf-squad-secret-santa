import { motion } from 'motion/react'
import RoughCircle from '../sketch/RoughCircle'
import { PIN_LENGTH } from '../../config'
import './PinSlots.css'

const BLOB = 'M14 4 C21 3 25 9 24 15 C23 22 17 25 11 24 C5 23 3 17 4 12 C5 7 9 4 15 5 C19 6 21 10 19 14 C17 18 12 18 10 15'

export default function PinSlots({ count, error }) {
  return (
    <div className={`pin-slots ${error ? 'pin-slots--error' : ''}`} aria-hidden="true">
      {Array.from({ length: PIN_LENGTH }, (_, i) => (
        <div key={i} className={`pin-slots__slot ${i === count ? 'pin-slots__slot--active' : ''}`}>
          <RoughCircle size={46} seed={i * 13 + 5} stroke={error ? 'var(--berry)' : 'var(--ink)'} strokeWidth={2.2} roughness={1.6} />
          {i < count && (
            <svg className="pin-slots__blob" viewBox="0 0 28 28">
              <motion.path
                d={BLOB}
                fill="none"
                stroke="var(--ink)"
                strokeWidth="5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  )
}
