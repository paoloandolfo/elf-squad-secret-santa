import HatOfNames from '../doodles/HatOfNames'
import SketchMeter from '../sketch/SketchMeter'
import { firstName } from '../../lib/names'
import './WaitingCard.css'

export default function WaitingCard({ roster }) {
  const members = roster?.members ?? []
  const joined = members.filter((m) => m.joined)
  const names = joined.map((m) => firstName(m.name))

  return (
    <div className="waiting-card">
      <p className="mission-card__kicker">Your secret mission</p>
      <h2 className="mission-card__title">Names go in the hat soon</h2>
      <HatOfNames names={names.length ? names : ['You?']} className="waiting-card__hat" />
      {members.length > 0 && (
        <div className="waiting-card__meter">
          <p><strong>{joined.length}</strong> of {members.length} elves are in so far</p>
          <SketchMeter value={joined.length} max={members.length} color="var(--berry)" label="People signed up" />
        </div>
      )}
      <p className="mission-card__text">
        The head elf draws names once everyone’s in. Meanwhile, write your wishlist so your Santa
        doesn’t panic-buy socks.
      </p>
    </div>
  )
}
