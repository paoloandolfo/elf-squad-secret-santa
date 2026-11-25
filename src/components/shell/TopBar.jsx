import { motion } from 'motion/react'
import Brand from './Brand'
import TabNav from './TabNav'
import SleepsChip from './SleepsChip'
import UserMenu from './UserMenu'
import MusicToggle from '../music/MusicToggle'
import './TopBar.css'

export default function TopBar({ tabs, active, badges, me, event, onSignOut }) {
  return (
    <motion.header
      className="topbar"
      initial={{ y: -90 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 240, damping: 26 }}
    >
      <div className="topbar__inner">
        <Brand />
        <TabNav tabs={tabs} active={active} badges={badges} />
        <div className="topbar__end">
          <MusicToggle />
          <SleepsChip date={event.exchange_date} />
          <UserMenu me={me} onSignOut={onSignOut} />
        </div>
      </div>
    </motion.header>
  )
}
