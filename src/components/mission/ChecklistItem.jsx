import { motion } from 'motion/react'
import Icon from '../icons/Icon'
import HandCheckbox from '../sketch/HandCheckbox'
import './ChecklistItem.css'

export default function ChecklistItem({ step, index, onNavigate }) {
  const { label, detail, done, locked, action } = step

  return (
    <motion.li
      className={`checklist-item ${done ? 'is-done' : ''} ${locked ? 'is-locked' : ''}`}
      initial={{ opacity: 0, x: 14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.15 + index * 0.07, type: 'spring', stiffness: 320, damping: 26 }}
    >
      <HandCheckbox checked={done} locked={locked} delay={0.45 + index * 0.12} />
      <div className="checklist-item__text">
        <p className="checklist-item__label">{label}</p>
        {detail && (
          <p className="checklist-item__detail">
            {locked && <Icon name="lock" size={14} strokeWidth={2.2} />}
            {detail}
          </p>
        )}
      </div>
      {action && (
        <button type="button" className="checklist-item__action" onClick={() => onNavigate(action.tab)}>
          {action.label}
          <Icon name="arrowRight" size={16} strokeWidth={2.4} />
        </button>
      )}
    </motion.li>
  )
}
