import DoodleSvg from './DoodleSvg'

const STAR = 'M50 9 L60.5 36 L88 37.5 L66.5 55.5 L74 83 L50 67.5 L26.5 82 L33.5 55 L12 38.5 L40 36.5 Z'

export default function Star({ className = '', color = 'var(--gold)' }) {
  return (
    <DoodleSvg viewBox="0 0 100 100" className={className}>
      <path className="wash" fill={color} d={STAR} transform="translate(3 3)" />
      <g className="ink-layer">
        <path className="ink" d={STAR} />
        <path className="ink-thin" d="M50 2 L50 -6 M93 32 L100 29 M7 32 L0 29" />
      </g>
    </DoodleSvg>
  )
}
