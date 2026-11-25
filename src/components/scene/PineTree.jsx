const TREE = 'M0 -62 L-14 -38 L-8 -38 L-20 -18 L-12 -18 L-24 0 L24 0 L12 -18 L20 -18 L8 -38 L14 -38 Z'

export default function PineTree({ x, y, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path className="wash" fill="var(--pine)" d={TREE} transform="translate(2.5 2)" />
      <path d="M-3 0 L-3 7 L3 7 L3 0" fill="var(--bark)" stroke="var(--ink)" strokeWidth="2" />
      <path className="ink" d={TREE} />
      <path d="M-12 -18 C-8 -21 -4 -21 0 -19 M6 -38 C9 -40 12 -40 14 -38 M-22 -1 C-16 -4 -10 -4 -6 -2" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" />
    </g>
  )
}
