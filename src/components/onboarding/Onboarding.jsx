import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import SketchBox from '../sketch/SketchBox'
import SketchButton from '../sketch/SketchButton'
import Icon from '../icons/Icon'
import OnboardingDots from './OnboardingDots'
import { onboardingSlides } from './onboardingSlides'
import { firstName } from '../../lib/names'
import './Onboarding.css'

const slideVariants = {
  enter: (direction) => ({ opacity: 0, x: direction * 40 }),
  center: { opacity: 1, x: 0 },
  exit: (direction) => ({ opacity: 0, x: direction * -40, transition: { duration: 0.14 } }),
}

export default function Onboarding({ me, names, onDone }) {
  const [{ index, direction }, setStep] = useState({ index: 0, direction: 1 })
  const slides = onboardingSlides(firstName(me.name), names)
  const slide = slides[index]
  const last = index === slides.length - 1

  const go = (next) => {
    if (next < 0 || next >= slides.length) return
    setStep({ index: next, direction: next > index ? 1 : -1 })
  }

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onDone('mission')
      if (event.key === 'ArrowRight') setStep((s) => (s.index < slides.length - 1 ? { index: s.index + 1, direction: 1 } : s))
      if (event.key === 'ArrowLeft') setStep((s) => (s.index > 0 ? { index: s.index - 1, direction: -1 } : s))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onDone, slides.length])

  return (
    <motion.div
      className="onboarding"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="onboarding__wrap"
        initial={{ scale: 0.8, rotate: -5, y: 40 }}
        animate={{ scale: 1, rotate: -0.6, y: 0 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22, delay: 0.15 }}
      >
        <SketchBox className="onboarding__card" seed={2412}>
          <button type="button" className="link-button onboarding__skip" onClick={() => onDone('mission')}>
            skip
          </button>

          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={index}
              className="onboarding__slide"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 340, damping: 30 }}
            >
              <div className="onboarding__art">{slide.art}</div>
              <p className="onboarding__step">Step {index + 1} of {slides.length}</p>
              <h2 id="onboarding-title" className="onboarding__title">{slide.title}</h2>
              <p className="onboarding__body">{slide.body}</p>
            </motion.div>
          </AnimatePresence>

          <OnboardingDots count={slides.length} index={index} onSelect={go} />

          <div className="onboarding__actions">
            {index > 0 && (
              <SketchButton variant="secondary" size="sm" onClick={() => go(index - 1)}>Back</SketchButton>
            )}
            {last ? (
              <SketchButton variant="pine" onClick={() => onDone('wishlist')} autoFocus>
                Write my wishlist <Icon name="arrowRight" strokeWidth={2.4} />
              </SketchButton>
            ) : (
              <SketchButton onClick={() => go(index + 1)} autoFocus>
                Next <Icon name="arrowRight" strokeWidth={2.4} />
              </SketchButton>
            )}
          </div>
        </SketchBox>
      </motion.div>
    </motion.div>
  )
}
