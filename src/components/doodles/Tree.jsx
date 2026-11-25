import DoodleSvg from './DoodleSvg'

const TREE = 'M80 34 L58 70 L68 69 L44 104 L58 103 L30 144 L46 143 L22 172 L138 172 L114 143 L130 144 L102 103 L116 104 L92 69 L102 70 Z'
const STAR = 'M80 6 L85 18 L98 19 L88 27 L91 40 L80 33 L69 40 L72 27 L62 19 L75 18 Z'

const BAUBLES = [
  { cx: 68, cy: 84, r: 5, fill: 'var(--berry)', delay: '0s' },
  { cx: 96, cy: 110, r: 5.5, fill: 'var(--gold)', delay: '0.6s' },
  { cx: 58, cy: 138, r: 6, fill: 'var(--ice)', delay: '1.2s' },
  { cx: 106, cy: 152, r: 6, fill: 'var(--berry)', delay: '0.3s' },
  { cx: 80, cy: 126, r: 4.5, fill: 'var(--gold)', delay: '0.9s' },
  { cx: 84, cy: 60, r: 4, fill: 'var(--ice)', delay: '1.5s' },
]

export default function Tree({ className = '' }) {
  return (
    <DoodleSvg viewBox="0 0 160 205" className={className}>
      <g transform="translate(4 3)">
        <path className="wash" fill="var(--pine)" d={TREE} />
        <path className="wash" fill="var(--bark)" d="M70 172 L70 196 L90 196 L90 172 Z" />
      </g>
      <path d="M58 92 Q80 104 104 88 M44 130 Q82 146 120 126" stroke="var(--gold)" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeDasharray="1 6" />
      <g className="ink-layer">
        <path className="ink" d={TREE} />
        <path className="ink" d="M70 172 L70 196 L90 196 L90 172" />
      </g>
      {BAUBLES.map((b) => (
        <circle key={`${b.cx}-${b.cy}`} className="twinkle" style={{ animationDelay: b.delay }} cx={b.cx} cy={b.cy} r={b.r} fill={b.fill} stroke="var(--ink)" strokeWidth="1.8" />
      ))}
      <path className="twinkle" d={STAR} fill="var(--gold)" stroke="var(--ink)" strokeWidth="2.2" strokeLinejoin="round" />
    </DoodleSvg>
  )
}
