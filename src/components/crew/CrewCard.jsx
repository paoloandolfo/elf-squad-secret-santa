import Icon from '../icons/Icon'
import Polaroid from '../roster/Polaroid'
import { plural } from '../../lib/names'
import './CrewCard.css'

export default function CrewCard({ member, isMe, wishCount }) {
  return (
    <div className={`crew-card ${member.joined ? '' : 'crew-card--pending'}`}>
      <Polaroid member={member} showStamp />
      {isMe && <span className="crew-card__you">that’s you!</span>}
      <p className="crew-card__meta">
        {member.joined ? (
          <>
            <Icon name="list" size={15} strokeWidth={2.2} />
            {wishCount ? plural(wishCount, 'wish', 'wishes') : 'no wishes yet'}
          </>
        ) : (
          <>
            <Icon name="bell" size={15} strokeWidth={2.2} />
            not signed up yet
          </>
        )}
      </p>
    </div>
  )
}
