import { motion } from 'motion/react'
import HandLettering from '../sketch/HandLettering'
import Scribble from '../doodles/Scribble'
import Sparkle from '../doodles/Sparkle'
import MiniBauble from '../doodles/MiniBauble'
import RosterStatus from './RosterStatus'
import { formatSwapDate, sleepsLabel, sleepsUntil } from '../../lib/dates'
import './RosterIntro.css'

const rise = (delay) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, type: 'spring', stiffness: 260, damping: 22 },
})

export default function RosterIntro({ event, lit, total }) {
  const facts = [
    `${event.budget} budget`,
    formatSwapDate(event.exchange_date),
    sleepsLabel(sleepsUntil(event.exchange_date)),
  ]

  return (
    <header className="roster-intro">
      <motion.p className="roster-intro__kicker" {...rise(0.05)}>{event.title} presents</motion.p>

      <h1 className="roster-intro__title">
        <HandLettering text="Secret Santa" delay={0.15} />
        <motion.span
          className="roster-intro__year"
          initial={{ scale: 0, rotate: 30 }}
          animate={{ scale: 1, rotate: 8 }}
          transition={{ delay: 0.95, type: 'spring', stiffness: 300, damping: 12 }}
        >
          2026
        </motion.span>
      </h1>
      <Scribble className="roster-intro__scribble" delay={0.8} />

      <motion.ul className="roster-intro__facts" {...rise(1.05)}>
        {facts.map((fact, i) => (
          <li key={fact}>
            {i > 0 && <Sparkle className="roster-intro__dot" color={i === 1 ? 'var(--berry)' : 'var(--pine-soft)'} />}
            {fact}
          </li>
        ))}
      </motion.ul>

      <motion.div className="roster-intro__ask" {...rise(1.2)}>
        <h2 className="roster-intro__question">Who are you?</h2>
        <p className="roster-intro__help">Tap your bauble to sign in. New here? Pick a 4-digit PIN to light it up.</p>
      </motion.div>

      <motion.p className="roster-intro__status" {...rise(1.35)}>
        <MiniBauble className="roster-intro__bauble" />
        <span><RosterStatus event={event} lit={lit} total={total} /></span>
      </motion.p>
    </header>
  )
}
