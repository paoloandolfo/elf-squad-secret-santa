import FactStrip from '../common/FactStrip'
import { formatSwapDate, sleepsShort, sleepsUntil } from '../../lib/dates'

export default function MissionFacts({ details }) {
  return (
    <FactStrip
      seed={311}
      facts={[
        { icon: 'tag', label: 'Budget', value: details.budget, tone: 'gold' },
        { icon: 'calendar', label: 'Gift swap', value: formatSwapDate(details.exchange_date), tone: 'berry' },
        { icon: 'moon', label: 'Countdown', value: sleepsShort(sleepsUntil(details.exchange_date)), tone: 'pine' },
      ]}
    />
  )
}
