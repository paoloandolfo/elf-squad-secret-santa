export default function Cottage({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle className="cottage__glow" cx="-14" cy="-20" r="16" filter="url(#soft-glow)" />
      <g className="cottage__smoke">
        <circle cx="22" cy="-72" r="5" />
        <circle cx="22" cy="-72" r="5" />
        <circle cx="22" cy="-72" r="5" />
      </g>

      <path className="wash" fill="var(--berry-deep)" d="M17 -48 L17 -66 L27 -66 L27 -40 Z" />
      <path className="wash" fill="var(--berry)" d="M-31 0 L-31 -34 L31 -34 L31 0 Z" transform="translate(2 2)" />
      <path className="wash" fill="var(--bark)" d="M-39 -32 L0 -62 L39 -32 Z" />

      <g className="ink-layer">
        <path className="ink" d="M17 -48 L17 -66 L27 -66 L27 -40" />
        <path className="ink" d="M-31 0 L-31 -33 M31 -33 L31 0" />
        <path className="ink" d="M-40 -32 L0 -63 L40 -32 Z" />
      </g>

      <path d="M-42 -32 C-28 -40 -14 -56 0 -64 C14 -56 28 -40 42 -32 C34 -28 26 -34 18 -30 C10 -34 4 -28 -4 -31 C-12 -27 -20 -33 -28 -29 C-34 -28 -38 -30 -42 -32 Z" fill="#fff" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
      <path d="M15 -66 C18 -70 26 -70 29 -66" fill="#fff" stroke="var(--ink)" strokeWidth="2" />

      <rect className="cottage__window" x="-21" y="-26" width="14" height="13" rx="1.5" />
      <path d="M-14 -26 L-14 -13 M-21 -19.5 L-7 -19.5" stroke="var(--ink)" strokeWidth="1.6" />
      <path d="M8 0 L8 -20 C8 -24 20 -24 20 -20 L20 0" fill="var(--bark)" stroke="var(--ink)" strokeWidth="2" />
      <circle cx="17" cy="-10" r="1.2" className="ink-dot" />
    </g>
  )
}
