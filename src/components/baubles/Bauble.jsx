import { motion } from 'motion/react'
import RoughCircle from '../sketch/RoughCircle'
import BaubleCap from './BaubleCap'
import SparkleBurst from './SparkleBurst'
import { stringFactor } from './baubleMetrics'
import { hashString, seededRange } from '../../lib/seeded'
import { assetUrl } from '../../lib/assets'
import './Bauble.css'

const TONES = ['var(--berry)', 'var(--pine)', 'var(--gold)', 'var(--ice)']

export default function Bauble({ member, sag = 0, delay = 0, state = 'idle', onPick }) {
  const seed = hashString(member.id)
  const style = {
    '--sag-f': sag.toFixed(3),
    '--string-f': stringFactor(seed).toFixed(3),
    '--tone': TONES[seed % TONES.length],
    '--sway-dur': `${seededRange(seed, 3.4, 5.4).toFixed(2)}s`,
    '--sway-delay': `${-seededRange(seed + 1, 0, 6).toFixed(2)}s`,
  }

  return (
    <motion.li
      className="bauble-slot"
      style={style}
      initial={{ opacity: 0, y: -42 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 230, damping: 10 }}
    >
      <button
        type="button"
        className={`bauble is-${state} ${member.joined ? 'is-lit' : ''}`}
        onClick={() => onPick(member)}
        aria-label={member.joined ? `I'm ${member.name}` : `I'm ${member.name}, new here`}
      >
        <span className="bauble__swing">
          <span className="bauble__jingle">
            <span className="bauble__string" />
            <BaubleCap className="bauble__cap" />
            <span className="bauble__ball">
              <span className="bauble__glow" />
              <span className="bauble__photo">
                {member.avatar_url
                  ? <img src={assetUrl(member.avatar_url)} alt="" loading="lazy" draggable="false" />
                  : <span className="bauble__initial">{member.name.charAt(0)}</span>}
              </span>
              <svg className="bauble__glass" viewBox="0 0 100 100" aria-hidden="true">
                <circle className="bauble__rim" cx="50" cy="50" r="45.5" />
                <path className="bauble__shine" d="M21 40 C23.5 28 32 20 43 17" />
                <circle className="bauble__shine-dot" cx="19.5" cy="49" r="2.8" />
              </svg>
              <RoughCircle className="bauble__ink" size={100} seed={(seed % 997) + 1} strokeWidth={2.4} roughness={1.3} />
              {state === 'picked' && <SparkleBurst />}
            </span>
          </span>
        </span>
        <span className="bauble__name">{member.name}</span>
      </button>
    </motion.li>
  )
}
