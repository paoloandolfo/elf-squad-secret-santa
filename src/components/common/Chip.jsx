import Icon from '../icons/Icon'
import './Chip.css'

export default function Chip({ as: Tag = 'span', icon, active = false, tone, className = '', children, ...rest }) {
  return (
    <Tag
      className={`chip ${active ? 'chip--active' : ''} ${tone ? `chip--${tone}` : ''} ${className}`}
      {...(Tag === 'button' ? { type: 'button', 'aria-pressed': active } : {})}
      {...rest}
    >
      {icon && <Icon name={icon} size={16} strokeWidth={2.2} />}
      {children}
    </Tag>
  )
}
