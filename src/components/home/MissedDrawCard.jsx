import SnowflakeDoodle from '../doodles/SnowflakeDoodle'
import './MissedDrawCard.css'

export default function MissedDrawCard() {
  return (
    <div>
      <SnowflakeDoodle className="missed-draw__flake" />
      <h2 className="mission-card__title">You missed the draw!</h2>
      <p className="mission-card__text">
        Names were drawn before you joined. Give the head elf a nudge. They can undo the draw and
        shuffle again with you in it.
      </p>
    </div>
  )
}
