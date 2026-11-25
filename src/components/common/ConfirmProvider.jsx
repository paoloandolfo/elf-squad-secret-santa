import { useCallback, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { ConfirmContext } from '../../context/confirm'
import ConfirmDialog from './ConfirmDialog'

export default function ConfirmProvider({ children }) {
  const [request, setRequest] = useState(null)

  const confirm = useCallback((options) => new Promise((resolve) => setRequest({ ...options, resolve })), [])

  const settle = (answer) => {
    request?.resolve(answer)
    setRequest(null)
  }

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      <AnimatePresence>
        {request && <ConfirmDialog key="confirm" {...request} onConfirm={() => settle(true)} onCancel={() => settle(false)} />}
      </AnimatePresence>
    </ConfirmContext.Provider>
  )
}
