import { useMemo, useRef } from 'react'
import { useElementSize } from '../../hooks/useElementSize'
import { useBoil } from '../../hooks/useBoil'
import { roughRect } from '../../lib/rough'
import RoughPaths from './RoughPaths'
import './SketchBox.css'

export default function SketchBox({
  as: Tag = 'div',
  className = '',
  children,
  fill = 'var(--card)',
  stroke = 'var(--ink)',
  strokeWidth = 2,
  roughness = 1.4,
  shadow = true,
  seed = 1,
  boil = false,
  ...rest
}) {
  const ref = useRef(null)
  const { width, height } = useElementSize(ref)
  const frame = useBoil(boil)

  const art = useMemo(() => {
    if (!width || !height) return null
    const frameSeed = seed + frame * 97
    return {
      shadow: shadow
        ? roughRect(width, height, {
          seed: frameSeed + 7,
          roughness,
          stroke: 'none',
          fill: 'var(--ink)',
          fillStyle: 'hachure',
          hachureGap: 5,
          hachureAngle: -41,
          fillWeight: 1,
        })
        : [],
      body: roughRect(width, height, { seed: frameSeed, roughness, stroke, strokeWidth, fill, fillStyle: 'solid' }),
    }
  }, [width, height, seed, frame, roughness, stroke, strokeWidth, fill, shadow])

  return (
    <Tag ref={ref} className={`sketch-box ${className}`} {...rest}>
      {art && (
        <svg className="sketch-box__art" width={width} height={height} aria-hidden="true">
          <g className="sketch-box__shadow"><RoughPaths paths={art.shadow} /></g>
          <RoughPaths paths={art.body} />
        </svg>
      )}
      <span className="sketch-box__content">{children}</span>
    </Tag>
  )
}
