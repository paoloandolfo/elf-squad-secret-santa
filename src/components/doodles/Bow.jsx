import DoodleSvg from './DoodleSvg'

const LOOP_LEFT = 'M24 14 C15 3 3 4 4.5 14 C6 22 16 22.5 24 16.5 Z'
const LOOP_RIGHT = 'M24 14 C33 3 45 4 43.5 14 C42 22 32 22.5 24 16.5 Z'
const TAIL_LEFT = 'M22 17 C19 24 15 29 10 34 L16 33 L18.5 36.5 C21 30 23 24 24.5 18 Z'
const TAIL_RIGHT = 'M26 17 C29 24 33 29 38 34 L32 33 L29.5 36.5 C27 30 25 24 23.5 18 Z'

export default function Bow({ className = '', color = 'var(--berry)' }) {
  return (
    <DoodleSvg viewBox="0 0 48 38" className={className} boil={false}>
      <g transform="translate(2 2)">
        {[LOOP_LEFT, LOOP_RIGHT, TAIL_LEFT, TAIL_RIGHT].map((d) => <path key={d} className="wash" fill={color} d={d} />)}
      </g>
      <g className="ink-layer">
        {[TAIL_LEFT, TAIL_RIGHT, LOOP_LEFT, LOOP_RIGHT].map((d) => <path key={d} className="ink-thin" d={d} />)}
        <path className="ink-thin" d="M10 11 C13 9 16 10 18 13 M38 11 C35 9 32 10 30 13" />
        <circle cx="24" cy="15.5" r="3.6" fill={color} stroke="var(--ink)" strokeWidth="1.6" />
      </g>
    </DoodleSvg>
  )
}
