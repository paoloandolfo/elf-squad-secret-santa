import { useMemo } from 'react'
import { roughCircle } from '../../lib/rough'
import RoughPaths from './RoughPaths'

export default function RoughCircle({
  size,
  seed = 1,
  stroke = 'var(--ink)',
  strokeWidth = 2,
  fill,
  fillStyle = 'solid',
  roughness = 1.3,
  className = '',
}) {
  const paths = useMemo(
    () => roughCircle(size, { seed, stroke, strokeWidth, fill, fillStyle, roughness }),
    [size, seed, stroke, strokeWidth, fill, fillStyle, roughness],
  )

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ overflow: 'visible', strokeLinecap: 'round' }}
      aria-hidden="true"
    >
      <RoughPaths paths={paths} />
    </svg>
  )
}
