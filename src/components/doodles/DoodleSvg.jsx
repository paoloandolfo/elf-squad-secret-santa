import './Doodle.css'

export default function DoodleSvg({ viewBox, className = '', boil = true, children, ...rest }) {
  return (
    <svg
      viewBox={viewBox}
      className={`doodle ${boil ? 'doodle--boil' : ''} ${className}`}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  )
}
