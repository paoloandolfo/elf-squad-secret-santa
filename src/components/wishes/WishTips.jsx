import { motion } from 'motion/react'
import Icon from '../icons/Icon'
import SketchBox from '../sketch/SketchBox'
import LetterDoodle from '../doodles/LetterDoodle'
import { writingTips } from './writingTips'
import './WishTips.css'

export default function WishTips({ budget }) {
  return (
    <SketchBox className="wish-tips" seed={1407}>
      <LetterDoodle className="wish-tips__doodle" />
      <h2 className="wish-tips__title">How to write a great list</h2>
      <ul className="wish-tips__list">
        {writingTips(budget).map((tip, i) => (
          <motion.li
            key={tip.icon}
            className="wish-tips__item"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.07 }}
          >
            <Icon name={tip.icon} size={20} />
            {tip.text}
          </motion.li>
        ))}
      </ul>
      <p className="wish-tips__privacy">
        <Icon name="shield" size={20} />
        <span>
          Your list stays hidden until names are drawn. After that, only your Secret Santa can read it.
        </span>
      </p>
    </SketchBox>
  )
}
