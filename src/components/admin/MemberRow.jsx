import { motion } from 'motion/react'
import { assetUrl } from '../../lib/assets'
import './MemberRow.css'

export default function MemberRow({ member, busy, onReset, onRemove }) {
  return (
    <motion.li layout className="member-row" exit={{ opacity: 0, x: 30 }}>
      <span className="member-row__avatar">
        {member.avatar_url ? <img src={assetUrl(member.avatar_url)} alt="" loading="lazy" /> : member.name.charAt(0)}
      </span>
      <span className="member-row__name">{member.name}</span>
      <span className="member-row__chips">
        <span className={`member-row__chip ${member.joined ? 'is-yes' : ''}`}>{member.joined ? 'PIN ✓' : 'no PIN'}</span>
        {member.in_draw && <span className="member-row__chip is-draw">in draw</span>}
        <span className="member-row__chip">{member.wish_count} {member.wish_count === 1 ? 'wish' : 'wishes'}</span>
      </span>
      <span className="member-row__actions">
        {member.joined && (
          <button className="link-button" onClick={onReset} disabled={busy}>reset PIN</button>
        )}
        <button className="link-button member-row__remove" onClick={onRemove} disabled={busy}>remove</button>
      </span>
    </motion.li>
  )
}
