import { useEffect } from 'react'
import { motion } from 'motion/react'
import SketchBox from '../sketch/SketchBox'
import SketchButton from '../sketch/SketchButton'
import './ConfirmDialog.css'

export default function ConfirmDialog({ title, body, confirmLabel = 'Yes', cancelLabel = 'Never mind', tone, onConfirm, onCancel }) {
  useEffect(() => {
    const onKey = (event) => event.key === 'Escape' && onCancel()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onCancel])

  return (
    <motion.div
      className="confirm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onCancel}
    >
      <motion.div
        className="confirm__card-wrap"
        initial={{ scale: 0.7, rotate: -6, y: 30 }}
        animate={{ scale: 1, rotate: -1, y: 0 }}
        exit={{ scale: 0.85, rotate: 4, y: 20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: 22 }}
        onClick={(event) => event.stopPropagation()}
      >
        <SketchBox className="confirm__card" seed={512}>
          <h2 id="confirm-title">{title}</h2>
          {body && <p>{body}</p>}
          <div className="confirm__actions">
            <SketchButton variant="secondary" size="sm" onClick={onCancel}>{cancelLabel}</SketchButton>
            <SketchButton variant={tone === 'danger' ? 'primary' : 'pine'} size="sm" onClick={onConfirm} autoFocus>
              {confirmLabel}
            </SketchButton>
          </div>
        </SketchBox>
      </motion.div>
    </motion.div>
  )
}
