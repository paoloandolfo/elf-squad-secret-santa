import SketchButton from '../sketch/SketchButton'
import './Keypad.css'

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'back', '0', 'clear']
const LABELS = { back: '⌫', clear: 'clear' }

export default function Keypad({ onKey, disabled }) {
  return (
    <div className="keypad">
      {KEYS.map((key) => (
        <SketchButton
          key={key}
          variant="secondary"
          size="sm"
          className={`keypad__key keypad__key--${key.length > 1 ? 'action' : 'digit'}`}
          onClick={() => onKey(key)}
          disabled={disabled}
          aria-label={key === 'back' ? 'Delete last digit' : key === 'clear' ? 'Clear PIN' : key}
        >
          {LABELS[key] ?? key}
        </SketchButton>
      ))}
    </div>
  )
}
