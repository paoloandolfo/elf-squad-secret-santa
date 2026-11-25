import { useState } from 'react'
import HandField from '../common/HandField'
import SketchButton from '../sketch/SketchButton'
import Icon from '../icons/Icon'
import { adminApi } from '../../lib/api'
import { inviteLink } from '../../lib/accessCode'
import { clearAccessCode, saveAccessCode } from '../../lib/storage'
import { useToast } from '../../context/toast'
import './AccessCodeSettings.css'

export default function AccessCodeSettings({ token, code, onSaved }) {
  const toast = useToast()
  const [draft, setDraft] = useState(code ?? '')
  const [busy, setBusy] = useState(false)
  const dirty = draft.trim() !== (code ?? '')

  const save = async (event) => {
    event.preventDefault()
    setBusy(true)
    try {
      const { access_code: saved } = await adminApi.setAccessCode(token, draft)
      if (saved) saveAccessCode(saved)
      else clearAccessCode()
      await onSaved()
      toast(saved ? 'Group code saved ✓' : 'Code removed. Anyone with the link can come in now.')
    } catch (err) {
      toast(err.message, 'error')
    } finally {
      setBusy(false)
    }
  }

  const copy = async () => {
    const link = inviteLink(code)
    try {
      await navigator.clipboard.writeText(link)
      toast('Invite link copied. Paste it in Slack!')
    } catch {
      toast(link)
    }
  }

  return (
    <form className="admin-section access-code" onSubmit={save}>
      <h3>The group code</h3>
      <p className="admin-section__note">
        {code
          ? 'Everyone types this once to open the app. The invite link fills it in for them.'
          : 'No code yet, so anyone with the link can see the crew. Set one to lock the door.'}
      </p>

      <HandField
        label="Code"
        className="access-code__field"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="e.g. mistletoe26"
        autoComplete="off"
        autoCapitalize="none"
        spellCheck={false}
        maxLength={40}
      />

      <div className="admin-section__actions">
        <SketchButton type="submit" variant="pine" size="sm" disabled={busy || !dirty}>
          {busy ? 'Saving…' : 'Save code'}
        </SketchButton>
        <SketchButton variant="secondary" size="sm" onClick={copy} disabled={!code || dirty}>
          <Icon name="link" /> Copy invite link
        </SketchButton>
      </div>
    </form>
  )
}
