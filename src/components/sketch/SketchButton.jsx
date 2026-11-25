import { useState } from 'react'
import { useSeed } from '../../hooks/useSeed'
import SketchBox from './SketchBox'
import './SketchButton.css'

const FILLS = {
  primary: 'var(--berry)',
  pine: 'var(--pine)',
  gold: 'var(--gold)',
  secondary: 'var(--card)',
}

export default function SketchButton({
  variant = 'primary',
  size = 'md',
  className = '',
  disabled,
  children,
  ...rest
}) {
  const seed = useSeed()
  const [hovered, setHovered] = useState(false)

  return (
    <SketchBox
      as="button"
      type="button"
      className={`sketch-button sketch-button--${variant} sketch-button--${size} ${className}`}
      fill={FILLS[variant]}
      seed={seed}
      roughness={1.7}
      boil={hovered && !disabled}
      disabled={disabled}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      {...rest}
    >
      {children}
    </SketchBox>
  )
}
