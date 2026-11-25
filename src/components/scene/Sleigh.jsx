import DoodleSvg from '../doodles/DoodleSvg'
import './Sleigh.css'

function Reindeer({ x, y, rudolph = false }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse className="wash" cx="0" cy="0" rx="17" ry="8" fill="var(--bark)" />
      <ellipse className="ink" cx="0" cy="0" rx="17" ry="8" />
      <path className="ink" d="M12 -4 L20 -14" />
      <circle cx="23" cy="-16" r="5.5" fill="var(--bark)" stroke="var(--ink)" strokeWidth="2.2" />
      <path className="ink-thin" d="M20 -21 L16 -30 M18 -26 L13 -27 M24 -21 L27 -30 M26 -26 L31 -27" />
      <path className="ink" d="M-10 6 L-20 14 M-5 7 L-12 18 M8 6 L18 13 M12 5 L22 8" />
      <path className="ink-thin" d="M-17 -2 L-23 -6" />
      {rudolph && (
        <>
          <circle className="sleigh__nose-glow" cx="29" cy="-15" r="6" filter="url(#soft-glow)" />
          <circle cx="29" cy="-15" r="2.8" fill="var(--berry)" stroke="var(--ink)" strokeWidth="1.2" />
        </>
      )}
    </g>
  )
}

export default function Sleigh() {
  return (
    <div className="sleigh" aria-hidden="true">
      <div className="sleigh__bob">
        <DoodleSvg viewBox="0 -10 270 90" className="sleigh__svg" boil={false}>
          <circle cx="32" cy="24" r="11" fill="var(--bark)" stroke="var(--ink)" strokeWidth="2" />
          <path className="ink-thin" d="M27 14 L37 14" />
          <circle cx="54" cy="24" r="10" fill="var(--berry)" stroke="var(--ink)" strokeWidth="2" />
          <circle cx="56" cy="11" r="6" fill="var(--skin)" stroke="var(--ink)" strokeWidth="1.8" />
          <path d="M50 13 C51 21 60 21 62 13" fill="#fff" stroke="var(--ink)" strokeWidth="1.6" />
          <path d="M50 8 C53 0 61 -2 67 4 L62 8 Z" fill="var(--berry)" stroke="var(--ink)" strokeWidth="1.6" strokeLinejoin="round" />
          <circle cx="68" cy="4" r="2.6" fill="#fff" stroke="var(--ink)" strokeWidth="1.2" />

          <path className="wash" fill="var(--berry)" d="M18 40 C18 30 28 26 40 28 L80 30 C90 30 94 38 92 50 L36 54 C24 54 18 50 18 40 Z" />
          <path className="ink" d="M18 40 C18 30 28 26 40 28 L80 30 C90 30 94 38 92 50 L36 54 C24 54 18 50 18 40 Z" />
          <path className="ink" d="M92 50 C100 46 102 36 96 32" />
          <path className="ink" d="M12 66 C30 68 70 68 98 62 C106 60 108 52 102 50 M40 54 L38 66 M76 52 L78 64" />
          <path d="M30 40 L82 41" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 5" />

          <path className="ink-thin" d="M92 40 C130 44 150 40 168 36 M188 26 C200 26 210 24 218 22" />
          <Reindeer x={170} y={38} />
          <Reindeer x={226} y={26} rudolph />
        </DoodleSvg>
      </div>
    </div>
  )
}
