import { useCallback, useEffect, useState } from 'react'
import { api } from '../lib/api'

export function useRoster(slug) {
  const [roster, setRoster] = useState(null)
  const [error, setError] = useState(null)

  const reload = useCallback(async () => {
    try {
      setRoster(await api.roster(slug))
      setError(null)
    } catch (err) {
      setError(err)
    }
  }, [slug])

  useEffect(() => {
    reload()
  }, [reload])

  return { roster, error, reload, setRoster }
}
