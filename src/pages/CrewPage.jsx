import { useState } from 'react'
import { motion } from 'motion/react'
import PageHeader from '../components/shell/PageHeader'
import Highlight from '../components/sketch/Highlight'
import Icon from '../components/icons/Icon'
import Loader from '../components/common/Loader'
import CrewMeter from '../components/crew/CrewMeter'
import CrewFilters from '../components/crew/CrewFilters'
import CrewCard from '../components/crew/CrewCard'
import { crewCounts, filterCrew } from '../components/crew/crewFilterRules'
import './CrewPage.css'

export default function CrewPage({ session, roster, details }) {
  const [filter, setFilter] = useState('all')
  if (!roster) return <Loader />

  const { me, wishes } = session.data
  const { members } = roster
  const counts = crewCounts(members)
  const drawn = Boolean(details.drawn_at)
  const shown = filterCrew(members, filter)

  return (
    <section className="crew-page">
      <PageHeader
        kicker={details.title}
        title={<>Meet the <Highlight>crew</Highlight></>}
        subtitle={drawn
          ? 'Names are drawn! Nobody knows who has whom, not even the head elf.'
          : counts.pending
            ? `${counts.pending} still to sign up. Give them a friendly nudge!`
            : 'Everyone’s in. Now we wait for the head elf to draw names.'}
        aside={<CrewMeter joined={counts.joined} total={counts.all} />}
      />

      <CrewFilters value={filter} counts={counts} onChange={setFilter} />

      <motion.ul
        key={filter}
        className="crew-page__grid"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.035 } } }}
      >
        {shown.map((member) => (
          <li key={member.id}>
            <CrewCard
              member={member}
              isMe={member.id === me.id}
              wishCount={member.id === me.id ? wishes.length : member.wish_count}
            />
          </li>
        ))}
      </motion.ul>

      {shown.length === 0 && <p className="crew-page__empty">Nobody here. Everyone’s signed up!</p>}

      <p className="crew-page__footnote">
        <Icon name="shield" size={18} />
        The crew only sees who’s signed up. Matches and wishlists stay secret.
      </p>
    </section>
  )
}
