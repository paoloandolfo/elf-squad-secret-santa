import Chip from '../common/Chip'
import { formatSwapDate, sleepsShort, sleepsUntil } from '../../lib/dates'
import './SleepsChip.css'

export default function SleepsChip({ date }) {
  const [count, unit] = sleepsShort(sleepsUntil(date)).split(' ')
  return (
    <Chip icon="moon" className="sleeps-chip" title={`Gift swap on ${formatSwapDate(date)}`}>
      {count}
      {unit && <span className="sleeps-chip__unit"> {unit}</span>}
    </Chip>
  )
}
