import { useMemo } from 'react'
import { useWindowWidth } from '../../hooks/useWindowWidth'
import { seededRange } from '../../lib/seeded'
import './Garland.css'

const COLORS = ['var(--berry)', 'var(--gold)', 'var(--pine-soft)', 'var(--ice)']
const TOP = 4
const SAG = 30
const BULBS_PER_SPAN = 4

function buildGarland(width) {
  const spans = Math.max(2, Math.round(width / 300))
  const span = width / spans
  const controlY = TOP + SAG * 2
  let wire = ''
  const bulbs = []

  for (let s = 0; s < spans; s++) {
    const x0 = s * span
    const cx = x0 + span / 2
    const x1 = x0 + span
    wire += `M${x0.toFixed(1)} ${TOP} Q${cx.toFixed(1)} ${controlY} ${x1.toFixed(1)} ${TOP} `

    for (let k = 1; k <= BULBS_PER_SPAN; k++) {
      const t = k / (BULBS_PER_SPAN + 1)
      const n = bulbs.length
      const x = (1 - t) ** 2 * x0 + 2 * (1 - t) * t * cx + t ** 2 * x1
      const y = (1 - t) ** 2 * TOP + 2 * (1 - t) * t * controlY + t ** 2 * TOP
      const slope = Math.atan2(2 * (controlY - TOP) * (1 - 2 * t), span)
      bulbs.push({
        x,
        y,
        rotate: (slope * 180) / Math.PI * 0.6 + seededRange(n + 1, -10, 10),
        color: COLORS[n % COLORS.length],
        delay: ((n * 0.37) % 2.4).toFixed(2),
      })
    }
  }
  return { wire, bulbs }
}

export default function Garland() {
  const width = useWindowWidth()
  const { wire, bulbs } = useMemo(() => buildGarland(width), [width])

  return (
    <svg className="garland" width={width} height="100" viewBox={`0 0 ${width} 100`} aria-hidden="true">
      <path className="garland__wire" d={wire} />
      <path className="garland__wire garland__wire--echo" d={wire} />
      {bulbs.map((bulb, i) => (
        <g key={i} transform={`translate(${bulb.x.toFixed(1)} ${bulb.y.toFixed(1)}) rotate(${bulb.rotate.toFixed(1)})`}>
          <g className="garland__bulb" style={{ '--bulb': bulb.color, '--delay': `${bulb.delay}s` }}>
            <circle className="garland__glow" cx="0" cy="16" r="13" filter="url(#soft-glow)" />
            <path className="garland__glass" d="M0 5 C-7.5 8 -8 20 0 25 C8 20 7.5 8 0 5 Z" />
            <rect className="garland__socket" x="-3.5" y="-1" width="7" height="7" rx="1.5" />
            <path className="garland__shine" d="M-2.5 11 C-3.5 14 -3.5 16 -2.5 18" />
          </g>
        </g>
      ))}
    </svg>
  )
}
