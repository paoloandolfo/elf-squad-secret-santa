import { motion } from 'motion/react'

const variants = {
  enter: (direction) => ({ opacity: 0, x: direction * 36 }),
  center: { opacity: 1, x: 0 },
  exit: (direction) => ({ opacity: 0, x: direction * -28, transition: { duration: 0.15, ease: 'easeIn' } }),
}

export default function PageTransition({ direction, children }) {
  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ type: 'spring', stiffness: 320, damping: 32 }}
    >
      {children}
    </motion.div>
  )
}
