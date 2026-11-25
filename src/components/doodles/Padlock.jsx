import { motion } from 'motion/react'
import DoodleSvg from './DoodleSvg'
import './Padlock.css'

const SHACKLE = 'M38 66 L38 42 C38 16 82 16 82 42 L82 66'
const BODY = 'M22 62 C48 60 72 60 98 62 C100 84 100 106 98 128 C72 130 48 130 22 128 C20 106 20 84 22 62 Z'
const SPARKLE = 'M0 -8 C1 -3 3 -1 8 0 C3 1 1 3 0 8 C-1 3 -3 1 -8 0 C-3 -1 -1 -3 0 -8 Z'

export default function Padlock({ open = false, className = '' }) {
  return (
    <DoodleSvg viewBox="0 0 120 140" className={`padlock ${className}`}>
      <ellipse cx="60" cy="134" rx="40" ry="4.5" className="padlock__shadow" />

      <motion.g
        className="padlock__shackle"
        animate={open ? { y: -16, rotate: -22 } : { y: 0, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 420, damping: 14 }}
      >
        <path className="padlock__metal-ink" d={SHACKLE} />
        <path className="padlock__metal" d={SHACKLE} />
        <path className="padlock__shine" d="M44 46 C44 32 52 26 58 25" />
      </motion.g>

      <path className="wash" fill="var(--gold)" d={BODY} transform="translate(4 3)" />
      <g className="ink-layer">
        <path className="ink" d={BODY} />
        <path className="ink-thin" d="M86 72 L94 64 M86 84 L96 74 M86 96 L96 86 M88 108 L96 100" />
        <circle className="ink-dot" cx="31" cy="71" r="2.2" />
        <circle className="ink-dot" cx="89" cy="120" r="2.2" />
      </g>
      <circle cx="60" cy="88" r="8" fill="var(--ink)" />
      <path d="M56.5 92 L54 110 C58 111.5 62 111.5 66 110 L63.5 92 Z" fill="var(--ink)" />

      <path className="twinkle" transform="translate(12 30)" d={SPARKLE} fill="var(--berry)" stroke="var(--ink)" strokeWidth="1.5" strokeLinejoin="round" />
      <path className="twinkle" style={{ animationDelay: '1.1s' }} transform="translate(108 40) scale(0.8)" d={SPARKLE} fill="var(--ice)" stroke="var(--ink)" strokeWidth="1.8" strokeLinejoin="round" />
    </DoodleSvg>
  )
}
