import { motion } from 'motion/react'
import './FloatingNotes.css'

const HEAD = 'M7.4 13.6 C7.3 15.6 5.4 17 3.6 16.6 C2.2 16.3 1.7 15 2.5 13.9 C3.4 12.6 5.4 11.9 6.6 12.4 C7.1 12.7 7.4 13.1 7.4 13.6 Z'
const STEM = 'M7.4 13.4 C7.5 9.6 7.4 5.8 7.6 2 C8.6 4 11.6 4.6 12.2 7.6 C12.5 9 12 10 11.4 10.8'

const NOTES = [
  { x: -20, rotate: -22, color: 'var(--berry)', delay: 0 },
  { x: 18, rotate: 18, color: 'var(--pine-soft)', delay: 0.85 },
  { x: -6, rotate: -8, color: 'var(--gold)', delay: 1.7 },
]

export default function FloatingNotes() {
  return (
    <motion.span
      className="floating-notes"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      {NOTES.map((note) => (
        <motion.svg
          key={note.delay}
          className="floating-notes__note"
          viewBox="0 0 14 18"
          initial={{ x: 0, y: 0, opacity: 0, scale: 0.5, rotate: 0 }}
          animate={{ x: note.x, y: -24, opacity: [0, 1, 1, 0], scale: [0.5, 1, 1, 0.8], rotate: note.rotate }}
          transition={{ duration: 2.55, delay: note.delay, repeat: Infinity, ease: 'easeOut' }}
        >
          <path d={HEAD} fill={note.color} />
          <path d={STEM} />
        </motion.svg>
      ))}
    </motion.span>
  )
}
