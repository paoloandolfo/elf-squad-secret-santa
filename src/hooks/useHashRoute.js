import { useCallback, useEffect, useState } from 'react'

const readHash = () => window.location.hash.replace(/^#\/?/, '').split(/[/?]/)[0]

export function useHashRoute() {
  const [route, setRoute] = useState(readHash)

  useEffect(() => {
    const onChange = () => setRoute(readHash())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  const navigate = useCallback((next) => {
    if (readHash() !== next) window.location.hash = `/${next}`
  }, [])

  return [route, navigate]
}
