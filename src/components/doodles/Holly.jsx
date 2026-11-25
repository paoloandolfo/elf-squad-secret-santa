import DoodleSvg from './DoodleSvg'

const LEAF_LEFT = 'M50 52 L41 43 L37 48 L29 38 L25 44 L14 38 L16 48 L6 52 L17 57 L14 66 L26 62 L29 69 L38 60 Z'
const LEAF_RIGHT = 'M50 52 L59 43 L63 48 L71 38 L75 44 L86 38 L84 48 L94 52 L83 57 L86 66 L74 62 L71 69 L62 60 Z'

export default function Holly({ className = '' }) {
  return (
    <DoodleSvg viewBox="0 0 100 80" className={className}>
      <g transform="translate(3 3)">
        <path className="wash" fill="var(--pine)" d={LEAF_LEFT} />
        <path className="wash" fill="var(--pine)" d={LEAF_RIGHT} />
      </g>
      <g className="ink-layer">
        <path className="ink" d={LEAF_LEFT} />
        <path className="ink" d={LEAF_RIGHT} />
        <path className="ink-thin" d="M48 52 L20 52 M52 52 L80 52" />
      </g>
      <circle cx="44" cy="46" r="7" fill="var(--berry)" stroke="var(--ink)" strokeWidth="2.2" />
      <circle cx="56" cy="47" r="7" fill="var(--berry)" stroke="var(--ink)" strokeWidth="2.2" />
      <circle cx="50" cy="37" r="7" fill="var(--berry)" stroke="var(--ink)" strokeWidth="2.2" />
      <path d="M47 34 C48 33 49 33 50 33.5 M41 43 C42 42 43 42 44 42.5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </DoodleSvg>
  )
}
