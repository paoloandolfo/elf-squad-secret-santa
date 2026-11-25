import { AnimatePresence, motion } from 'motion/react'
import Icon from '../icons/Icon'
import RoughCircle from '../sketch/RoughCircle'
import FloatingNotes from './FloatingNotes'
import { useMusic } from '../../context/music'
import './MusicToggle.css'

const STRIKE = 'M5 5.4 C9.6 9.6 14.4 14.2 19.4 19'

export default function MusicToggle({ className = '' }) {
  const { enabled, playing, supported, toggle } = useMusic()
  if (!supported) return null
  const waiting = enabled && !playing

  return (
    <button
      type="button"
      className={`music-toggle ${enabled ? 'is-on' : ''} ${playing ? 'is-playing' : ''} ${className}`}
      data-music-toggle
      aria-pressed={enabled}
      aria-label={playing ? 'Mute the Christmas music' : waiting ? 'Start the Christmas music' : 'Play Christmas music'}
      title={playing ? 'Mute music' : 'Play music'}
      onClick={toggle}
    >
      <RoughCircle className="music-toggle__ring" size={44} seed={27} fill="var(--card)" strokeWidth={2} roughness={1.2} />
      <span className="music-toggle__glow" />
      <span className="music-toggle__icon">
        <Icon name="music" size={22} strokeWidth={2.2} />
      </span>
      <svg className="music-toggle__strike" viewBox="0 0 24 24" aria-hidden="true">
        <AnimatePresence>
          {!enabled && (
            <motion.path
              d={STRIKE}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              exit={{ pathLength: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            />
          )}
        </AnimatePresence>
      </svg>
      <AnimatePresence>{playing && <FloatingNotes key="notes" />}</AnimatePresence>
    </button>
  )
}
