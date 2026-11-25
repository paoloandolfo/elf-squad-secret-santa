import { useRef } from 'react'
import Strand from './Strand'
import Bauble from './Bauble'
import { BAUBLE_MAX, BAUBLE_MIN, baubleStyle, strandHeight } from './baubleMetrics'
import { sagAt, toStrands } from './strandLayout'
import { useFitGrid } from '../../hooks/useFitGrid'
import './BaubleWall.css'

export default function BaubleWall({ members, stateOf, onPick }) {
  const ref = useRef(null)
  const { size, cols } = useFitGrid(ref, {
    count: members.length,
    min: BAUBLE_MIN,
    max: BAUBLE_MAX,
    cardHeight: strandHeight,
  })

  return (
    <div ref={ref} className="bauble-wall" style={baubleStyle(size)}>
      {toStrands(members, cols).map((strand, s) => (
        <Strand key={`${cols}-${s}`} index={s}>
          {strand.map((member, i) => (
            <Bauble
              key={member.id}
              member={member}
              sag={sagAt(i, strand.length)}
              delay={0.7 + s * 0.18 + i * 0.06}
              state={stateOf(member)}
              onPick={onPick}
            />
          ))}
        </Strand>
      ))}
    </div>
  )
}
