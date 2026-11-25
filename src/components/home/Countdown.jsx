import RoughCircle from '../sketch/RoughCircle'
import { formatSwapDate, sleepsUntil } from '../../lib/dates'
import './Countdown.css'

export default function Countdown({ date }) {
  const sleeps = sleepsUntil(date)
  const big = sleeps === null ? '?' : sleeps > 0 ? sleeps : '🎁'
  const caption = sleeps === null
    ? 'swap date TBC'
    : sleeps > 1 ? 'sleeps to go' : sleeps === 1 ? 'sleep to go' : sleeps === 0 ? "it's today!" : 'swap done'

  return (
    <div className="countdown">
      <div className="countdown__badge">
        <RoughCircle size={74} seed={404} fill="var(--card)" strokeWidth={2.4} roughness={1.6} />
        <span className="countdown__number">{big}</span>
      </div>
      <div className="countdown__text">
        <strong>{caption}</strong>
        <span>{formatSwapDate(date)}</span>
      </div>
    </div>
  )
}
