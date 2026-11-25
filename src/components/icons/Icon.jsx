import { ICON_PATHS } from './iconPaths'
import './Icon.css'

export default function Icon({ name, size = 24, strokeWidth = 2, className = '', title, ...rest }) {
  const paths = ICON_PATHS[name] ?? []
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...rest}
    >
      {paths.map((d) => <path key={d} d={d} />)}
    </svg>
  )
}
