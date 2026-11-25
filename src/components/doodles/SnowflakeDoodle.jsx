import DoodleSvg from './DoodleSvg'

const spokes = Array.from({ length: 6 }, (_, i) => {
  const angle = (i * Math.PI) / 3
  const point = (r, offset = 0) => [
    50 + Math.cos(angle + offset) * r,
    50 + Math.sin(angle + offset) * r,
  ].map((n) => n.toFixed(1)).join(' ')
  return `M50 50 L${point(40)} M${point(26)} L${point(36, 0.32)} M${point(26)} L${point(36, -0.32)}`
}).join(' ')

export default function SnowflakeDoodle({ className = '', boil = true }) {
  return (
    <DoodleSvg viewBox="0 0 100 100" className={className} boil={boil}>
      <g className="ink-layer">
        <path className="ink" d={spokes} />
        <circle className="ink" cx="50" cy="50" r="5" />
      </g>
    </DoodleSvg>
  )
}
