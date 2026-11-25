import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Chip from '../common/Chip'
import Icon from '../icons/Icon'
import { WISH_IDEAS } from './wishIdeas'
import './IdeaChips.css'

const PER_PAGE = 3

export default function IdeaChips({ onPick, taken = [] }) {
  const [page, setPage] = useState(0)
  const used = new Set(taken.map((body) => body.toLowerCase()))
  const pool = WISH_IDEAS.filter((idea) => !used.has(idea.toLowerCase()))
  const start = pool.length ? (page * PER_PAGE) % pool.length : 0
  const ideas = pool.slice(start, start + PER_PAGE)
  if (!ideas.length) return null

  return (
    <div className="idea-chips">
      <span className="idea-chips__label">Stuck? Steal one:</span>
      <AnimatePresence mode="popLayout" initial={false}>
        {ideas.map((idea, i) => (
          <motion.span
            key={idea}
            initial={{ opacity: 0, y: 8, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: 0, transition: { delay: i * 0.05 } }}
            exit={{ opacity: 0, y: -6 }}
          >
            <Chip as="button" tone="quiet" onClick={() => onPick(idea)}>{idea}</Chip>
          </motion.span>
        ))}
      </AnimatePresence>
      <button
        type="button"
        className="idea-chips__more"
        onClick={() => setPage((p) => p + 1)}
        aria-label="Show other ideas"
        title="Other ideas"
      >
        <Icon name="refresh" size={18} strokeWidth={2.2} />
      </button>
    </div>
  )
}
