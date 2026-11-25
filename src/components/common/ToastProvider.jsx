import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ToastContext } from '../../context/toast'
import './Toast.css'

let nextId = 1

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const toast = useCallback((message, tone = 'info') => {
    const id = nextId++
    setToasts((list) => [...list, { id, message, tone }])
    setTimeout(() => setToasts((list) => list.filter((t) => t.id !== id)), 3800)
  }, [])

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="toasts" aria-live="polite">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              className={`toast toast--${t.tone}`}
              initial={{ opacity: 0, y: 40, rotate: -6, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, rotate: t.id % 2 ? -2 : 2, scale: 1 }}
              exit={{ opacity: 0, y: 20, rotate: 8, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 360, damping: 22 }}
            >
              {t.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}
