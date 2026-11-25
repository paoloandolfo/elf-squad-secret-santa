import { motion } from 'motion/react'
import Polaroid from '../roster/Polaroid'
import WriteOn from '../sketch/WriteOn'
import WishList from '../wishes/WishList'
import ConfettiBurst from './ConfettiBurst'
import { firstName } from '../../lib/names'
import './TargetCard.css'

export default function TargetCard({ target, celebrate, onReplay }) {
  const first = firstName(target.name)

  return (
    <div className="target-card">
      {celebrate && <ConfettiBurst />}

      <p className="mission-card__kicker">You’re the Secret Santa for…</p>

      <motion.div
        className="target-card__photo"
        initial={celebrate ? { y: 140, scale: 0.3, rotate: -25, opacity: 0 } : false}
        animate={{ y: 0, scale: 1, rotate: -3, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 150, damping: 12, delay: celebrate ? 0.1 : 0 }}
      >
        <Polaroid member={target} size="lg" initial={false} animate="show" />
      </motion.div>

      <h2 className="target-card__name">
        <WriteOn text={`${first}!`} delay={celebrate ? 0.7 : 0.1} duration={celebrate ? 1 : 0.6} />
      </h2>
      <p className="target-card__shh">Shhh… it’s a secret 🤫</p>

      <WishList
        title={`${first}’s wishlist`}
        wishes={target.wishes}
        emptyText={`${first} hasn’t written any wishes yet. Check back later!`}
      />

      <button className="link-button target-card__replay" onClick={onReplay}>↺ unwrap it again</button>
    </div>
  )
}
