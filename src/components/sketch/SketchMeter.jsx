import { useMemo, useRef } from 'react'
import { motion } from 'motion/react'
import { useElementSize } from '../../hooks/useElementSize'
import { roughRect } from '../../lib/rough'
import RoughPaths from './RoughPaths'
import './SketchMeter.css'

export default function SketchMeter({ value, max, color = 'var(--pine)', label }) {
  const ref = useRef(null)
  const { width, height } = useElementSize(ref)
  const ratio = max ? Math.min(1, value / max) : 0

  const art = useMemo(() => {
    if (!width || !height) return null
    const fillWidth = (width - 10) * ratio
    return {
      outline: roughRect(width, height, { seed: 21, roughness: 1.2, stroke: 'var(--ink)', strokeWidth: 2 }),
      fill: fillWidth > 4
        ? roughRect(fillWidth + 10, height, {
          seed: 34,
          roughness: 1.6,
          stroke: 'none',
          fill: color,
          fillStyle: 'zigzag',
          hachureGap: 4,
          fillWeight: 2.2,
        }, 5)
        : [],
    }
  }, [width, height, ratio, color])

  return (
    <div
      ref={ref}
      className="sketch-meter"
      role="meter"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label}
    >
      {art && (
        <>
          <motion.div
            className="sketch-meter__fill"
            initial={{ clipPath: 'inset(-30% 100% -30% -2%)' }}
            animate={{ clipPath: 'inset(-30% -2% -30% -2%)' }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          >
            <svg width={width} height={height} aria-hidden="true"><RoughPaths paths={art.fill} /></svg>
          </motion.div>
          <svg width={width} height={height} aria-hidden="true"><RoughPaths paths={art.outline} /></svg>
        </>
      )}
    </div>
  )
}
