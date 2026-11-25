import { useCallback, useEffect, useMemo, useState } from 'react'
import { MusicContext } from '../../context/music'
import { createMusicEngine, musicSupported } from '../../lib/music/engine'
import { loadMusicOn, saveMusicOn } from '../../lib/storage'

// Touch only counts as a user gesture on release, mouse on press.
const UNLOCK_EVENTS = ['mousedown', 'pointerup', 'touchend', 'keydown']

export default function MusicProvider({ children }) {
  const [engine] = useState(createMusicEngine)
  const [wanted, setWanted] = useState(loadMusicOn)
  const [playing, setPlaying] = useState(false)

  useEffect(() => engine.subscribe(setPlaying), [engine])
  useEffect(() => () => engine.dispose(), [engine])

  useEffect(() => {
    if (musicSupported && loadMusicOn()) engine.start()
  }, [engine])

  useEffect(() => {
    if (!musicSupported || !wanted || playing) return undefined
    const unlock = (event) => {
      if (event.target instanceof Element && event.target.closest('[data-music-toggle]')) return
      engine.start()
    }
    UNLOCK_EVENTS.forEach((type) => window.addEventListener(type, unlock, true))
    return () => UNLOCK_EVENTS.forEach((type) => window.removeEventListener(type, unlock, true))
  }, [engine, wanted, playing])

  useEffect(() => {
    const onVisibility = () => (document.hidden ? engine.pause() : engine.resume())
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [engine])

  const toggle = useCallback(() => {
    if (wanted && !playing) {
      engine.start()
      return
    }
    const next = !wanted
    setWanted(next)
    saveMusicOn(next)
    if (next) engine.start()
    else engine.stop()
  }, [engine, wanted, playing])

  const value = useMemo(
    () => ({ enabled: wanted, playing, supported: musicSupported, toggle }),
    [wanted, playing, toggle],
  )

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
}
