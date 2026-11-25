import { useState } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'motion/react'
import HatOfNames from '../doodles/HatOfNames'
import './DrawOverlay.css'

function scatter(names) {
  return names.slice(0, 16).map((name, i) => {
    const angle = (i / Math.min(names.length, 16)) * Math.PI * 2
    return {
      name,
      x: Math.cos(angle) * (180 + Math.random() * 80),
      y: Math.sin(angle) * (140 + Math.random() * 60) - 40,
      rotate: (Math.random() - 0.5) * 60,
      delay: 0.1 + i * 0.09,
    }
  })
}

export default function DrawOverlay({ names }) {
  const [slips] = useState(() => scatter(names))

  return createPortal(
    <motion.div className="draw-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="draw-overlay__stage">
        {slips.map((slip) => (
          <motion.span
            key={slip.name}
            className="draw-overlay__slip"
            initial={{ x: slip.x, y: slip.y, rotate: slip.rotate, opacity: 0, scale: 1 }}
            animate={{ x: 0, y: 10, rotate: 0, opacity: [0, 1, 1, 0], scale: [1, 1, 0.8, 0.4] }}
            transition={{ delay: slip.delay, duration: 0.9, ease: 'easeIn' }}
          >
            {slip.name}
          </motion.span>
        ))}
        <HatOfNames names={names} className="draw-overlay__hat hat-of-names--shaking" />
      </div>
      <p className="draw-overlay__text">Shuffling the names…</p>
    </motion.div>,
    document.body,
  )
}
