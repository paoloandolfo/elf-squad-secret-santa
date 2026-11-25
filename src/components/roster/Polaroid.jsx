import { motion } from 'motion/react'
import SketchBox from '../sketch/SketchBox'
import JoinedStamp from './JoinedStamp'
import { hashString, seededRange } from '../../lib/seeded'
import { assetUrl } from '../../lib/assets'
import './Polaroid.css'

const TAPES = [
  'rgba(233, 179, 71, 0.6)',
  'rgba(207, 75, 63, 0.45)',
  'rgba(127, 176, 143, 0.6)',
  'rgba(127, 179, 213, 0.55)',
]

export default function Polaroid({ member, onClick, size = 'md', showStamp = false, className = '', ...motionProps }) {
  const seed = hashString(member.id)
  const tilt = seededRange(seed, -5, 5)
  const tapeTilt = seededRange(seed + 1, -9, 9)
  const interactive = Boolean(onClick)

  return (
    <SketchBox
      as={interactive ? motion.button : motion.div}
      type={interactive ? 'button' : undefined}
      className={`polaroid polaroid--${size} ${interactive ? 'polaroid--interactive' : ''} ${className}`}
      fill="#fff"
      roughness={0.9}
      seed={(seed % 9000) + 1}
      onClick={onClick}
      aria-label={interactive ? `I'm ${member.name}` : undefined}
      variants={{
        hidden: { opacity: 0, y: 40, rotate: tilt * 3, scale: 0.85 },
        show: { opacity: 1, y: 0, rotate: tilt, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 18 } },
      }}
      whileHover={interactive ? { rotate: 0, y: -10, scale: 1.05, transition: { type: 'spring', stiffness: 400, damping: 14 } } : undefined}
      whileTap={interactive ? { scale: 0.96 } : undefined}
      {...motionProps}
    >
      <span
        className="polaroid__tape"
        style={{ '--tape-tilt': `${tapeTilt}deg`, '--tape-color': TAPES[seed % TAPES.length] }}
      />
      <span className="polaroid__photo">
        {member.avatar_url
          ? <img src={assetUrl(member.avatar_url)} alt="" loading="lazy" draggable="false" />
          : <span className="polaroid__initial">{member.name.charAt(0)}</span>}
      </span>
      <span className="polaroid__name">{member.name}</span>
      {showStamp && member.joined && <JoinedStamp seed={seed} />}
    </SketchBox>
  )
}
