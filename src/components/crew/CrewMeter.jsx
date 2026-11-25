import SketchMeter from '../sketch/SketchMeter'
import './CrewMeter.css'

export default function CrewMeter({ joined, total }) {
  return (
    <div className="crew-meter">
      <p className="crew-meter__label">
        <strong>{joined}</strong> of {total} signed up
      </p>
      <SketchMeter value={joined} max={total} color="var(--pine)" label="People signed up" />
    </div>
  )
}
