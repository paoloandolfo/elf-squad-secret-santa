import { motion } from 'motion/react'
import './PageHeader.css'

export default function PageHeader({ kicker, title, subtitle, aside }) {
  return (
    <header className="page-header">
      <div className="page-header__text">
        {kicker && (
          <motion.p
            className="page-header__kicker"
            initial={{ opacity: 0, y: 8, rotate: -4 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ delay: 0.05, type: 'spring', stiffness: 300, damping: 20 }}
          >
            {kicker}
          </motion.p>
        )}
        <h1 className="page-header__title">{title}</h1>
        {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
      </div>
      {aside && <div className="page-header__aside">{aside}</div>}
    </header>
  )
}
