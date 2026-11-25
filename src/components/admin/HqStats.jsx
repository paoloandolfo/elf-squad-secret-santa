import FactStrip from '../common/FactStrip'

export default function HqStats({ event, members }) {
  const joined = members.filter((m) => m.joined).length
  const lists = members.filter((m) => m.wish_count > 0).length

  return (
    <FactStrip
      seed={919}
      className="hq-stats"
      facts={[
        { icon: 'crew', label: 'Signed up', value: `${joined} / ${members.length}`, tone: 'pine' },
        { icon: 'list', label: 'Wishlists', value: `${lists} started`, tone: 'gold' },
        { icon: 'hat', label: 'The draw', value: event.drawn_at ? 'Done!' : 'Not yet', tone: 'berry' },
      ]}
    />
  )
}
