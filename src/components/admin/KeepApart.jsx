import { useState } from 'react'
import SketchButton from '../sketch/SketchButton'
import { adminApi } from '../../lib/api'
import { firstName } from '../../lib/names'
import { useAdminAction } from '../../hooks/useAdminAction'
import './KeepApart.css'

export default function KeepApart({ token, roster, onRosterChange }) {
  const { members, exclusions = [], event } = roster
  const { busy, run } = useAdminAction(onRosterChange)
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const nameOf = (id) => firstName(members.find((m) => m.id === id)?.name ?? '?')
  const locked = Boolean(event.drawn_at)

  const add = async (e) => {
    e.preventDefault()
    if (!a || !b || a === b) return
    if (await run('add', () => adminApi.addExclusion(token, a, b), `${nameOf(a)} & ${nameOf(b)} kept apart`)) {
      setA('')
      setB('')
    }
  }

  const select = (value, onChange, other, label) => (
    <label className="keep-apart__pick">
      <span className="visually-hidden">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} disabled={locked}>
        <option value="">pick…</option>
        {members.filter((m) => m.id !== other).map((m) => (
          <option key={m.id} value={m.id}>{firstName(m.name)}</option>
        ))}
      </select>
    </label>
  )

  return (
    <div className="admin-section">
      <h3>Keep apart</h3>
      <p className="admin-section__note">
        Couples, housemates, siblings… pairs here will never draw each other (in either direction).
        {locked && ' Undo the draw to change these.'}
      </p>

      {exclusions.length > 0 && (
        <ul className="keep-apart__list">
          {exclusions.map((x) => (
            <li key={`${x.a}-${x.b}`} className="keep-apart__pair">
              <span>{nameOf(x.a)} <span aria-hidden="true">✕</span><span className="visually-hidden">and</span> {nameOf(x.b)}</span>
              {!locked && (
                <button
                  className="link-button"
                  disabled={Boolean(busy)}
                  onClick={() => run(`rm-${x.a}`, () => adminApi.removeExclusion(token, x.a, x.b), 'Pair removed')}
                >
                  remove
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {!locked && (
        <form className="keep-apart__form" onSubmit={add}>
          {select(a, setA, b, 'First person')}
          <span className="keep-apart__and">&amp;</span>
          {select(b, setB, a, 'Second person')}
          <SketchButton type="submit" variant="gold" size="sm" disabled={Boolean(busy) || !a || !b}>
            + keep apart
          </SketchButton>
        </form>
      )}
    </div>
  )
}
