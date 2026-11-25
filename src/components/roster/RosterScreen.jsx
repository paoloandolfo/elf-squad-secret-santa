import { useState } from 'react'
import RosterIntro from './RosterIntro'
import BaubleWall from '../baubles/BaubleWall'
import './RosterScreen.css'

const PICK_DELAY = 560

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function RosterScreen({ roster, onPick }) {
  const { event, members } = roster
  const [pickedId, setPickedId] = useState(null)

  const pick = (member) => {
    if (pickedId) return
    setPickedId(member.id)
    setTimeout(() => onPick(member), prefersReducedMotion() ? 0 : PICK_DELAY)
  }

  const stateOf = (member) => {
    if (!pickedId) return 'idle'
    return member.id === pickedId ? 'picked' : 'dimmed'
  }

  return (
    <section className="roster">
      <RosterIntro
        event={event}
        lit={members.filter((m) => m.joined).length}
        total={members.length}
      />
      <BaubleWall members={members} stateOf={stateOf} onPick={pick} />
    </section>
  )
}
