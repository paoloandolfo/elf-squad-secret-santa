import { useState } from 'react'
import { motion } from 'motion/react'
import './ConfettiBurst.css'

const COLORS = ['var(--berry)', 'var(--gold)', 'var(--pine)', 'var(--ice)', 'var(--pine-soft)']
const SHAPES = ['strip', 'dot', 'star', 'squiggle']

function makePieces(count) {
  return Array.from({ length: count }, (_, i) => {
    const angle = Math.random() * Math.PI * 2
    const distance = 110 + Math.random() * 230
    const peak = Math.sin(angle) * distance * 0.7 - 90
    return {
      id: i,
      x: Math.cos(angle) * distance,
      peak,
      fall: peak + 220 + Math.random() * 120,
      rotate: (Math.random() - 0.5) * 900,
      delay: Math.random() * 0.15,
      duration: 1.5 + Math.random() * 0.9,
      scale: 0.7 + Math.random() * 0.7,
      color: COLORS[i % COLORS.length],
      shape: SHAPES[i % SHAPES.length],
    }
  })
}

export default function ConfettiBurst({ count = 48 }) {
  const [pieces] = useState(() => makePieces(count))

  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className={`confetti__piece confetti__piece--${p.shape}`}
          style={{ '--c': p.color }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0 }}
          animate={{ x: p.x, y: [0, p.peak, p.fall], opacity: [1, 1, 0], rotate: p.rotate, scale: p.scale }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'easeOut',
            y: { duration: p.duration, delay: p.delay, times: [0, 0.35, 1], ease: ['easeOut', 'easeIn'] },
            opacity: { duration: p.duration, delay: p.delay, times: [0, 0.75, 1] },
          }}
        />
      ))}
    </div>
  )
}
