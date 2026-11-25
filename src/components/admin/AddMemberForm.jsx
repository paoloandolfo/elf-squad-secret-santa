import { useState } from 'react'
import HandField from '../common/HandField'
import SketchButton from '../sketch/SketchButton'
import './AddMemberForm.css'

export default function AddMemberForm({ onAdd, busy }) {
  const [name, setName] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    if (!name.trim()) return
    if (await onAdd(name, avatarUrl)) {
      setName('')
      setAvatarUrl('')
    }
  }

  return (
    <form className="add-member" onSubmit={submit}>
      <HandField label="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
      <HandField
        label="Photo URL (optional)"
        value={avatarUrl}
        onChange={(e) => setAvatarUrl(e.target.value)}
        placeholder="/avatars/name.svg or https://…"
      />
      <SketchButton type="submit" variant="gold" size="sm" disabled={busy || !name.trim()}>+ add elf</SketchButton>
    </form>
  )
}
