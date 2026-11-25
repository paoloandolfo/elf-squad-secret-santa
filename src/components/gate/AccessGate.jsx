import { useState } from 'react'
import { motion, useAnimate } from 'motion/react'
import SketchBox from '../sketch/SketchBox'
import SketchButton from '../sketch/SketchButton'
import HandLettering from '../sketch/HandLettering'
import Padlock from '../doodles/Padlock'
import Icon from '../icons/Icon'
import { api } from '../../lib/api'
import { isCodeError } from '../../lib/accessCode'
import { loadAccessCode, saveAccessCode } from '../../lib/storage'
import { wait } from '../../lib/dates'
import { EVENT_SLUG } from '../../config'
import './AccessGate.css'

export default function AccessGate({ onUnlocked }) {
  const [code, setCode] = useState('')
  const [error, setError] = useState(() =>
    loadAccessCode() ? 'That code doesn’t work anymore. Ask your head elf for the new one.' : null)
  const [busy, setBusy] = useState(false)
  const [open, setOpen] = useState(false)
  const [cardRef, animate] = useAnimate()

  const submit = async (event) => {
    event.preventDefault()
    const candidate = code.trim()
    if (!candidate || busy) return
    setBusy(true)
    setError(null)
    try {
      await api.roster(EVENT_SLUG, candidate)
      saveAccessCode(candidate)
      setOpen(true)
      await wait(800)
      onUnlocked()
    } catch (err) {
      setBusy(false)
      setError(isCodeError(err) ? 'That’s not the magic word. Check the code with your head elf.' : err.message)
      animate(cardRef.current, { x: [0, -14, 12, -9, 7, -3, 0] }, { duration: 0.45 })
    }
  }

  return (
    <section className="gate">
      <h1 className="gate__brand">
        <HandLettering text="Secret Santa" delay={0.1} />
        <span className="gate__year">2026</span>
      </h1>

      <motion.div
        ref={cardRef}
        className="gate__card-wrap"
        initial={{ opacity: 0, y: 24, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: -0.5 }}
        transition={{ delay: 0.35, type: 'spring', stiffness: 220, damping: 20 }}
      >
        <SketchBox className="gate__card" seed={1031}>
          <Padlock open={open} className="gate__lock" />
          <h2 className="gate__title">What’s the magic word?</h2>
          <p className="gate__hint">This workshop is invite-only. Enter the group code your head elf shared.</p>

          <form className="gate__form" onSubmit={submit}>
            <label className="visually-hidden" htmlFor="gate-code">Group code</label>
            <input
              id="gate-code"
              className="gate__input"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="group code"
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              enterKeyHint="go"
              disabled={busy}
              autoFocus
            />
            <p className={`gate__status ${open ? 'gate__status--ok' : ''}`} role="alert">
              {error ?? (open ? 'You’re in! Ho ho ho…' : busy ? 'Checking the list…' : '\u00A0')}
            </p>
            <SketchButton type="submit" size="lg" disabled={busy || !code.trim()}>
              Let me in <Icon name="arrowRight" strokeWidth={2.4} />
            </SketchButton>
          </form>

          <p className="gate__remember">
            <Icon name="lock" size={15} strokeWidth={2.2} />
            You only need this once on this device.
          </p>
        </SketchBox>
      </motion.div>
    </section>
  )
}
