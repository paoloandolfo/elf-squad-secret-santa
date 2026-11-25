import Icon from '../icons/Icon'
import MarkerCircle from '../sketch/MarkerCircle'
import NavBadge from './NavBadge'
import './BottomNav.css'

export default function BottomNav({ tabs, active, badges }) {
  return (
    <nav className="bottom-nav" aria-label="Main">
      {tabs.map((tab) => {
        const current = tab.id === active
        return (
          <a
            key={tab.id}
            href={`#/${tab.id}`}
            className={`bottom-nav__item ${current ? 'is-active' : ''}`}
            aria-current={current ? 'page' : undefined}
          >
            <span className="bottom-nav__icon">
              {current && <MarkerCircle layoutId="bottom-nav-marker" />}
              <Icon name={tab.icon} size={24} />
              <NavBadge badge={badges[tab.id]} />
            </span>
            {tab.label}
          </a>
        )
      })}
    </nav>
  )
}
