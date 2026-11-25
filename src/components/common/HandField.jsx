import './HandField.css'

export default function HandField({ label, className = '', ...inputProps }) {
  return (
    <label className={`hand-field ${className}`}>
      <span className="hand-field__label">{label}</span>
      <input className="hand-field__input" {...inputProps} />
    </label>
  )
}
