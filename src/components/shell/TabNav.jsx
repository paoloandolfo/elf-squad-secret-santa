import Icon from '../icons/Icon'
import MarkerCircle from '../sketch/MarkerCircle'
import NavBadge from './NavBadge'
import './TabNav.css'

export default function TabNav({ tabs, active, badges }) {
  return (
    <nav className="tab-nav" aria-label="Main">
      {tabs.map((tab) => {
        const current = tab.id === active
        return (
          <a
            key={tab.id}
            href={`#/${tab.id}`}
            className={`tab-nav__item ${current ? 'is-active' : ''}`}
            aria-current={current ? 'page' : undefined}
          >
            {current && <MarkerCircle layoutId="tab-nav-marker" />}
            <span className="tab-nav__icon">
              <Icon name={tab.icon} size={21} />
              <NavBadge badge={badges[tab.id]} />
            </span>
            {tab.label}
          </a>
        )
      })}
    </nav>
  )
}
