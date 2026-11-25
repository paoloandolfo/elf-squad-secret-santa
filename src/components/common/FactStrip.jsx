import { motion } from 'motion/react'
import Icon from '../icons/Icon'
import SketchBox from '../sketch/SketchBox'
import './FactStrip.css'

export default function FactStrip({ facts, seed = 311, className = '' }) {
  return (
    <SketchBox className={`fact-strip ${className}`} seed={seed}>
      <ul className="fact-strip__list" style={{ '--fact-count': facts.length }}>
        {facts.map((fact, i) => (
          <motion.li
            key={fact.label}
            className={`fact-strip__item fact-strip__item--${fact.tone}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
          >
            <span className="fact-strip__icon"><Icon name={fact.icon} size={22} /></span>
            <span className="fact-strip__value">{fact.value}</span>
            <span className="fact-strip__label">{fact.label}</span>
          </motion.li>
        ))}
      </ul>
    </SketchBox>
  )
}
