import { useEffect, useRef, useState } from 'react'
import SketchButton from '../sketch/SketchButton'
import IdeaChips from './IdeaChips'
import { WISH_IDEAS as IDEAS } from './wishIdeas'
import './WishForm.css'

export default function WishForm({ onAdd, busy, taken = [] }) {
  const inputRef = useRef(null)
  const [body, setBody] = useState('')
  const [link, setLink] = useState('')
  const [showLink, setShowLink] = useState(false)
  const [idea, setIdea] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIdea((i) => (i + 1) % IDEAS.length), 3200)
    return () => clearInterval(id)
  }, [])

  const submit = async (event) => {
    event.preventDefault()
    if (!body.trim()) return
    const added = await onAdd(body, link)
    if (added) {
      setBody('')
      setLink('')
      setShowLink(false)
    }
  }

  return (
    <form className="wish-form" onSubmit={submit}>
      <label className="visually-hidden" htmlFor="wish-body">New wish</label>
      <input
        ref={inputRef}
        id="wish-body"
        className="wish-form__input"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder={`e.g. ${IDEAS[idea]}`}
        maxLength={200}
        disabled={busy}
        autoComplete="off"
      />

      {showLink ? (
        <>
          <label className="visually-hidden" htmlFor="wish-link">Link (optional)</label>
          <input
            id="wish-link"
            className="wish-form__input wish-form__input--link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="paste a link (optional)"
            disabled={busy}
            autoComplete="off"
            inputMode="url"
          />
        </>
      ) : (
        <button type="button" className="link-button wish-form__link-toggle" onClick={() => setShowLink(true)}>
          + add a link
        </button>
      )}

      <SketchButton type="submit" variant="pine" size="sm" disabled={busy || !body.trim()} className="wish-form__submit">
        {busy ? 'Writing…' : '+ add wish'}
      </SketchButton>

      {!body && (
        <IdeaChips
          taken={taken}
          onPick={(picked) => {
            setBody(picked)
            inputRef.current?.focus()
          }}
        />
      )}
    </form>
  )
}
