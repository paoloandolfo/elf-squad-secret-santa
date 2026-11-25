import { useCallback, useEffect, useState } from 'react'
import { api } from '../lib/api'
import { clearToken, loadToken, saveToken } from '../lib/storage'

export function useSession() {
  const [token, setToken] = useState(loadToken)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!token) return
    let cancelled = false
    api.me(token)
      .then((next) => !cancelled && setData(next))
      .catch((err) => {
        if (cancelled) return
        if (err.code === 'session_expired') {
          clearToken()
          setToken(null)
        } else {
          setError(err)
        }
      })
    return () => {
      cancelled = true
    }
  }, [token])

  const signIn = useCallback((nextToken) => {
    saveToken(nextToken)
    setError(null)
    setToken(nextToken)
  }, [])

  const signOut = useCallback(() => {
    if (token) api.logout(token).catch(() => {})
    clearToken()
    setToken(null)
    setData(null)
  }, [token])

  const refresh = useCallback(async () => {
    if (token) setData(await api.me(token))
  }, [token])

  const setWishes = useCallback((wishes) => setData((current) => current && { ...current, wishes }), [])

  return {
    token,
    data,
    error,
    loading: Boolean(token) && !data && !error,
    signIn,
    signOut,
    refresh,
    setWishes,
  }
}
