import { useState } from 'react'
import HandField from '../common/HandField'
import SketchButton from '../sketch/SketchButton'
import { adminApi } from '../../lib/api'
import { useAdminAction } from '../../hooks/useAdminAction'
import './EventSettings.css'

export default function EventSettings({ token, event, onRosterChange }) {
  const [form, setForm] = useState({
    title: event.title,
    budget: event.budget,
    exchangeDate: event.exchange_date ?? '',
  })
  const { busy, run } = useAdminAction(onRosterChange)

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))
  const save = (e) => {
    e.preventDefault()
    run('save', () => adminApi.saveEvent(token, form), 'Saved ✓')
  }

  return (
    <form className="admin-section event-settings" onSubmit={save}>
      <h3>The details</h3>
      <div className="event-settings__fields">
        <HandField label="Group name" value={form.title} onChange={update('title')} />
        <HandField label="Budget" value={form.budget} onChange={update('budget')} />
        <HandField label="Swap date" type="date" value={form.exchangeDate} onChange={update('exchangeDate')} />
      </div>
      <div className="admin-section__actions">
        <SketchButton type="submit" variant="pine" size="sm" disabled={busy === 'save'}>
          {busy === 'save' ? 'Saving…' : 'Save details'}
        </SketchButton>
      </div>
    </form>
  )
}
