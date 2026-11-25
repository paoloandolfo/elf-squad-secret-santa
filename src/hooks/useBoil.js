import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'

// Cycles through 3 frames while active: the jittery "line boil" of hand-drawn animation.
export function useBoil(active, interval = 140) {
  const reduceMotion = useReducedMotion()
  const [frame, setFrame] = useState(0)
  const running = active && !reduceMotion

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setFrame((f) => (f + 1) % 3), interval)
    return () => clearInterval(id)
  }, [running, interval])

  return running ? frame : 0
}
