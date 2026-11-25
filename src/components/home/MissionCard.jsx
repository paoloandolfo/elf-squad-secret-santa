import { AnimatePresence, motion } from 'motion/react'
import SketchBox from '../sketch/SketchBox'
import WaitingCard from './WaitingCard'
import MissedDrawCard from './MissedDrawCard'
import GiftReveal from './GiftReveal'
import TargetCard from './TargetCard'
import { missionView } from '../mission/missionView'
import './MissionCard.css'

export default function MissionCard({ event, target, roster, reveal }) {
  const view = missionView(event, target, reveal.revealed)

  return (
    <SketchBox className="mission-card" seed={1225}>
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.18 } }}
        >
          {view === 'waiting' && <WaitingCard roster={roster} />}
          {view === 'missed' && <MissedDrawCard />}
          {view === 'gift' && <GiftReveal onOpened={reveal.reveal} />}
          {view === 'target' && <TargetCard target={target} celebrate={reveal.celebrate} onReplay={reveal.replay} />}
        </motion.div>
      </AnimatePresence>
    </SketchBox>
  )
}
