import { useState } from 'react'
import { AnimatePresence } from 'motion/react'
import SketchButton from '../sketch/SketchButton'
import DrawOverlay from './DrawOverlay'
import { adminApi } from '../../lib/api'
import { wait } from '../../lib/dates'
import { firstName, joinNames } from '../../lib/names'
import { useAdminAction } from '../../hooks/useAdminAction'
import { useConfirm } from '../../context/confirm'

export default function DrawControls({ token, roster, onRosterChange, onDrawChanged }) {
  const { event, members } = roster
  const joined = members.filter((m) => m.joined)
  const missing = members.filter((m) => !m.joined)
  const inDraw = members.filter((m) => m.in_draw).length
  const { busy, run } = useAdminAction(onRosterChange)
  const confirm = useConfirm()
  const [shuffling, setShuffling] = useState(false)

  const draw = async () => {
    const ok = await confirm({
      title: `Draw names for ${joined.length} people?`,
      body: missing.length
        ? `Still without a PIN: ${joinNames(missing.map((m) => firstName(m.name)))}. They’ll be left out.`
        : 'Everyone has signed up. Perfect!',
      confirmLabel: 'Draw names!',
    })
    if (!ok) return
    setShuffling(true)
    const done = await run(
      'draw',
      async () => (await Promise.all([adminApi.draw(token), wait(2800)]))[0],
      'Names drawn! Everyone can unwrap their match now 🎁',
    )
    setShuffling(false)
    if (done) onDrawChanged()
  }

  const undo = async () => {
    const ok = await confirm({
      title: 'Undo the draw?',
      body: 'Everyone loses their match. Draw again afterwards to hand out new ones.',
      confirmLabel: 'Undo draw',
      tone: 'danger',
    })
    if (!ok) return
    if (await run('undo', () => adminApi.undoDraw(token), 'Draw undone')) onDrawChanged()
  }

  return (
    <div className="admin-section">
      <h3>The draw</h3>
      {event.drawn_at ? (
        <p className="admin-section__note">
          Drawn on {new Date(event.drawn_at).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })} with {inDraw} people.
          Nobody (not even you) can see who has whom.
        </p>
      ) : (
        <p className="admin-section__note">
          {joined.length} of {members.length} have set a PIN.
          {missing.length > 0 && ` Waiting on ${joinNames(missing.map((m) => firstName(m.name)))}.`}
        </p>
      )}

      <div className="admin-section__actions">
        {event.drawn_at ? (
          <SketchButton variant="secondary" onClick={undo} disabled={Boolean(busy)}>Undo draw</SketchButton>
        ) : (
          <SketchButton variant="primary" size="lg" onClick={draw} disabled={Boolean(busy) || joined.length < 3}>
            🎩 Draw names
          </SketchButton>
        )}
      </div>

      <AnimatePresence>
        {shuffling && <DrawOverlay names={joined.map((m) => firstName(m.name))} />}
      </AnimatePresence>
    </div>
  )
}
