import { useCallback, useState } from 'react'
import { forgetRevealed, hasRevealed, markRevealed } from '../lib/storage'

const initial = (memberId, drawnAt) => ({
  drawnAt,
  revealed: drawnAt ? hasRevealed(memberId, drawnAt) : false,
  celebrate: false,
})

export function useReveal(memberId, drawnAt) {
  const [state, setState] = useState(() => initial(memberId, drawnAt))
  const current = state.drawnAt === drawnAt ? state : initial(memberId, drawnAt)

  const reveal = useCallback(() => {
    markRevealed(memberId, drawnAt)
    setState({ drawnAt, revealed: true, celebrate: true })
  }, [memberId, drawnAt])

  const replay = useCallback(() => {
    forgetRevealed(memberId, drawnAt)
    setState({ drawnAt, revealed: false, celebrate: false })
  }, [memberId, drawnAt])

  return { revealed: current.revealed, celebrate: current.celebrate, reveal, replay }
}
