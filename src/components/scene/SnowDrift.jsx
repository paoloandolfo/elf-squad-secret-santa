import './SnowDrift.css'

const RIDGE = 'M0 30 C140 12 300 6 470 16 C640 26 800 4 980 8 C1160 12 1300 28 1440 20'
const HATCH = 'M330 34 l12 -9 M344 36 l12 -9 M358 37 l12 -9 M1080 30 l12 -9 M1094 32 l12 -9 M1108 33 l12 -9'

export default function SnowDrift() {
  return (
    <div className="snow-drift" aria-hidden="true">
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path d={`${RIDGE} L1440 80 L0 80 Z`} fill="#fff" />
        <path className="snow-drift__ink" d={RIDGE} />
        <path className="snow-drift__ink snow-drift__ink--echo" d={RIDGE} />
        <path className="snow-drift__hatch" d={HATCH} />
      </svg>
    </div>
  )
}
