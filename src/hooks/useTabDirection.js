import { useState } from 'react'

export function useTabDirection(active, tabs) {
  const [state, setState] = useState({ active, direction: 0 })
  if (state.active === active) return state.direction

  const from = tabs.findIndex((tab) => tab.id === state.active)
  const to = tabs.findIndex((tab) => tab.id === active)
  const next = { active, direction: to >= from ? 1 : -1 }
  setState(next)
  return next.direction
}
