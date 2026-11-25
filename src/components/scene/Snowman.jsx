export default function Snowman({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`} className="snowman">
      <path d="M-14 -40 L-34 -54 M-28 -50 L-32 -60 M14 -40 L34 -52 M28 -48 L36 -42" className="ink" />
      <path d="M8 -12 C14 -18 14 -30 6 -34" className="wash" fill="var(--snow-shadow)" />

      <circle cx="0" cy="-18" r="18" fill="#fff" stroke="var(--ink)" strokeWidth="2.4" />
      <circle cx="0" cy="-46" r="13" fill="#fff" stroke="var(--ink)" strokeWidth="2.4" />
      <circle cx="0" cy="-67" r="10" fill="#fff" stroke="var(--ink)" strokeWidth="2.4" />

      <path d="M-11 -56 C-4 -52 4 -52 11 -56 L12 -51 C4 -48 -4 -48 -12 -51 Z" fill="var(--berry)" stroke="var(--ink)" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M6 -51 L9 -38 L14 -40 L10 -52" fill="var(--berry)" stroke="var(--ink)" strokeWidth="1.8" strokeLinejoin="round" />

      <path d="M-14 -75 L14 -75" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
      <path d="M-9 -75 L-8 -90 L8 -90 L9 -75 Z" fill="var(--ink)" />
      <path d="M-8.5 -80 L8.5 -80" stroke="var(--berry)" strokeWidth="2.5" />

      <circle cx="-4" cy="-69" r="1.6" className="ink-dot" />
      <circle cx="4" cy="-69" r="1.6" className="ink-dot" />
      <path d="M1 -65 L14 -62 L1 -61.5 Z" fill="#f28b30" stroke="var(--ink)" strokeWidth="1.2" strokeLinejoin="round" />
      <circle cx="0" cy="-42" r="1.6" className="ink-dot" />
      <circle cx="0" cy="-34" r="1.6" className="ink-dot" />
    </g>
  )
}
