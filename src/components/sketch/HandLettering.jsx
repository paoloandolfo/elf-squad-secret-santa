import { motion } from 'motion/react'
import { seededRange } from '../../lib/seeded'
import './HandLettering.css'

function splitWords(text) {
  let offset = 0
  return text.split(' ').map((word) => {
    const chars = [...word]
    const start = offset
    offset += chars.length + 1
    return { chars, start }
  })
}

export default function HandLettering({ text, className = '', delay = 0 }) {
  return (
    <span className={`lettering ${className}`} aria-label={text} role="text">
      {splitWords(text).map(({ chars, start }) => (
        <span key={start} className="lettering__word" aria-hidden="true">
          {chars.map((char, c) => {
            const i = start + c
            const tilt = seededRange(i + 3, -5, 5)
            return (
              <motion.span
                key={i}
                className="lettering__char"
                initial={{ opacity: 0, y: 24, rotate: tilt * 4, scale: 0.4 }}
                animate={{ opacity: 1, y: seededRange(i + 9, -3, 3), rotate: tilt, scale: 1 }}
                whileHover={{ y: -10, rotate: -tilt * 1.5, transition: { type: 'spring', stiffness: 500, damping: 10 } }}
                transition={{ delay: delay + i * 0.055, type: 'spring', stiffness: 420, damping: 15 }}
              >
                {char}
              </motion.span>
            )
          })}
        </span>
      ))}
    </span>
  )
}
