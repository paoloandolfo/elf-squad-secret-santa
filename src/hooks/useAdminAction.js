import { useCallback, useState } from 'react'
import { useToast } from '../context/toast'

export function useAdminAction(onRosterChange) {
  const toast = useToast()
  const [busy, setBusy] = useState(null)

  const run = useCallback(async (key, action, successMessage) => {
    setBusy(key)
    try {
      onRosterChange(await action())
      if (successMessage) toast(successMessage)
      return true
    } catch (err) {
      toast(err.message, 'error')
      return false
    } finally {
      setBusy(null)
    }
  }, [onRosterChange, toast])

  return { busy, run }
}
