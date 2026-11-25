import DoodleSvg from './DoodleSvg'
import './HatOfNames.css'

const SLIP_SPOTS = [
  { x: 70, y: 62, rotate: -16 },
  { x: 98, y: 52, rotate: 6 },
  { x: 126, y: 60, rotate: 18 },
  { x: 84, y: 70, rotate: -4 },
  { x: 114, y: 72, rotate: 10 },
]

const RIM = 'M36 80 C80 71 128 71 156 78 C160 88 159 98 154 106 C122 99 80 99 38 108 C33 98 33 88 36 80 Z'
const BODY = 'M48 100 C44 136 66 172 118 180 C150 184 172 174 178 158 C160 158 142 150 136 98 Z'

export default function HatOfNames({ names = [], className = '' }) {
  const slips = SLIP_SPOTS.map((spot, i) => ({ ...spot, name: names[i % Math.max(names.length, 1)] ?? '?' }))

  return (
    <DoodleSvg viewBox="0 0 200 200" className={`hat-of-names ${className}`}>
      <g className="hat-of-names__slips">
        {slips.map((slip, i) => (
          <g key={i} transform={`translate(${slip.x} ${slip.y}) rotate(${slip.rotate})`}>
            <g className="hat-of-names__slip" style={{ animationDelay: `${i * 0.35}s` }}>
              <path d="M-20 -34 L20 -35 L21 18 L-21 19 Z" fill="var(--card)" stroke="var(--ink)" strokeWidth="1.8" strokeLinejoin="round" />
              <text x="0" y="-14" textAnchor="middle" className="hat-of-names__name">{slip.name}</text>
            </g>
          </g>
        ))}
      </g>

      <g transform="translate(4 3)">
        <path className="wash" fill="var(--berry)" d={BODY} />
      </g>
      <circle cx="180" cy="156" r="13" fill="#fff" stroke="var(--ink)" strokeWidth="2.4" />
      <path className="wash" fill="#fff" d={RIM} />

      <g className="ink-layer">
        <path className="ink" d={BODY} />
        <path className="ink" d={RIM} />
        <path className="ink-thin" d="M56 92 c3 -3 6 -3 8 0 M88 88 c3 -3 6 -3 8 0 M120 88 c3 -3 6 -3 8 0 M142 92 c3 -3 6 -3 8 0" />
        <path className="ink-thin" d="M150 150 C140 140 136 124 136 110" />
      </g>
    </DoodleSvg>
  )
}
