import { motion } from 'motion/react'
import RoughCircle from '../sketch/RoughCircle'
import './JoinedStamp.css'

export default function JoinedStamp({ seed = 1 }) {
  return (
    <motion.span
      className="joined-stamp"
      initial={{ scale: 2.2, opacity: 0, rotate: -40 }}
      animate={{ scale: 1, opacity: 1, rotate: -14 }}
      transition={{ delay: 0.6, type: 'spring', stiffness: 500, damping: 18 }}
      title="Signed up"
    >
      <RoughCircle size={60} seed={seed % 1000} stroke="var(--pine)" strokeWidth={2.4} roughness={1.8} />
      <span className="joined-stamp__text">I'm in!</span>
    </motion.span>
  )
}
