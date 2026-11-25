export default function RoughPaths({ paths }) {
  return paths.map((path, i) => (
    <path
      key={i}
      d={path.d}
      style={{ stroke: path.stroke, strokeWidth: path.strokeWidth, fill: path.fill ?? 'none' }}
    />
  ))
}
