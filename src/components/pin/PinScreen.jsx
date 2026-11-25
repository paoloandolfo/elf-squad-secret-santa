import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useAnimate } from 'motion/react'
import SketchBox from '../sketch/SketchBox'
import Polaroid from '../roster/Polaroid'
import PinSlots from './PinSlots'
import Keypad from './Keypad'
import { pinCopy, pinErrorMessage } from './pinMessages'
import { api } from '../../lib/api'
import { PIN_LENGTH } from '../../config'
import './PinScreen.css'

export default function PinScreen({ member, onBack, onSignedIn }) {
  const creating = !member.joined
  const [step, setStep] = useState('enter')
  const [digits, setDigits] = useState('')
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(false)
  const firstPin = useRef(null)
  const [cardRef, animate] = useAnimate()

  const fail = useCallback((message) => {
    setError(message)
    setDigits('')
    animate(cardRef.current, { x: [0, -14, 12, -9, 7, -3, 0] }, { duration: 0.45 })
  }, [animate, cardRef])

  const submit = useCallback(async (pin) => {
    if (creating && step === 'enter') {
      firstPin.current = pin
      setStep('confirm')
      setDigits('')
      return
    }
    if (creating && pin !== firstPin.current) {
      firstPin.current = null
      setStep('enter')
      fail("Those didn't match. Let's start over.")
      return
    }
    setBusy(true)
    try {
      const { token, created } = await api.login(member.id, pin)
      onSignedIn(token, created)
    } catch (err) {
      fail(pinErrorMessage(err))
      setBusy(false)
    }
  }, [creating, step, member.id, onSignedIn, fail])

  useEffect(() => {
    if (digits.length !== PIN_LENGTH) return
    const id = setTimeout(() => submit(digits), 220)
    return () => clearTimeout(id)
  }, [digits, submit])

  const press = useCallback((key) => {
    if (busy) return
    setError(null)
    if (key === 'back') setDigits((d) => d.slice(0, -1))
    else if (key === 'clear') setDigits('')
    else setDigits((d) => (d.length < PIN_LENGTH ? d + key : d))
  }, [busy])

  useEffect(() => {
    const onKey = (event) => {
      if (/^\d$/.test(event.key)) press(event.key)
      else if (event.key === 'Backspace') press('back')
      else if (event.key === 'Escape') onBack()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [press, onBack])

  const copy = pinCopy(member, creating, step)

  return (
    <section className="pin-screen">
      <div ref={cardRef} className="pin-screen__card-wrap">
        <button className="link-button pin-screen__back" onClick={onBack}>← not me</button>
        <div className="pin-screen__photo">
          <Polaroid member={member} size="sm" initial="hidden" animate="show" />
        </div>

        <SketchBox className="pin-screen__card" seed={2026}>
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="pin-screen__title">{copy.title}</h1>
            <p className="pin-screen__hint">{copy.hint}</p>
          </motion.div>

          <PinSlots count={digits.length} error={Boolean(error)} />

          <p className="pin-screen__status" role="alert">
            {error ?? (busy ? 'Checking the list twice…' : '\u00A0')}
          </p>

          <Keypad onKey={press} disabled={busy} />
        </SketchBox>
      </div>
    </section>
  )
}
