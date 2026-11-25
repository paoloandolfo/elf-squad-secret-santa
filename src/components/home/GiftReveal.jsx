import { useState } from 'react'
import { useAnimate } from 'motion/react'
import GiftBox from '../doodles/GiftBox'
import Sparkle from '../doodles/Sparkle'
import './GiftReveal.css'

const SPARKLES = [
  { top: '8%', left: '10%', size: 26, color: 'var(--gold)', delay: '0s' },
  { top: '18%', right: '6%', size: 20, color: 'var(--berry)', delay: '0.8s' },
  { bottom: '22%', left: '2%', size: 18, color: 'var(--pine-soft)', delay: '1.4s' },
  { bottom: '30%', right: '0%', size: 24, color: 'var(--gold)', delay: '0.4s' },
]

export default function GiftReveal({ onOpened }) {
  const [scope, animate] = useAnimate()
  const [opening, setOpening] = useState(false)

  const open = async () => {
    if (opening) return
    setOpening(true)
    await animate(
      '.gift-reveal__stage',
      { rotate: [0, -7, 7, -10, 10, -6, 4, 0], scale: [1, 1.04, 1.04, 1.08, 1.08, 1.05, 1.02, 1] },
      { duration: 1, ease: 'easeInOut' },
    )
    await Promise.all([
      animate('.gift-lid', { y: -200, x: 90, rotate: 40, opacity: 0 }, { duration: 0.7, ease: [0.2, 0.9, 0.3, 1] }),
      animate('.gift-reveal__burst', { scale: [0.2, 2.4], opacity: [1, 0] }, { duration: 0.8, ease: 'easeOut' }),
      animate('.gift-body', { scaleY: [1, 0.9, 1.03, 1], y: [0, 8, -4, 0] }, { duration: 0.5 }),
    ])
    onOpened()
  }

  return (
    <div ref={scope} className="gift-reveal">
      <p className="mission-card__kicker">Names have been drawn!</p>
      <h2 className="mission-card__title">Your mission is inside</h2>

      <button
        type="button"
        className={`gift-reveal__button ${opening ? 'is-opening' : ''}`}
        onClick={open}
        aria-label="Unwrap your Secret Santa match"
      >
        <span className="gift-reveal__burst" />
        {SPARKLES.map(({ size, color, delay, ...position }, i) => (
          <Sparkle
            key={i}
            className="gift-reveal__sparkle"
            color={color}
            style={{ ...position, width: size, height: size, animationDelay: delay }}
          />
        ))}
        <span className="gift-reveal__idle">
          <span className="gift-reveal__stage">
            <GiftBox />
          </span>
        </span>
      </button>

      <p className="gift-reveal__cta">{opening ? 'Unwrapping…' : 'Tap the present to unwrap it'}</p>
    </div>
  )
}
