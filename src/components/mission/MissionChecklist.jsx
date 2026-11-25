import SketchBox from '../sketch/SketchBox'
import ChecklistItem from './ChecklistItem'
import './MissionChecklist.css'

export default function MissionChecklist({ steps, onNavigate }) {
  const done = steps.filter((step) => step.done).length

  return (
    <SketchBox className="mission-checklist" seed={812}>
      <div className="mission-checklist__head">
        <h2 className="mission-checklist__title">Elf to-do list</h2>
        <span className="mission-checklist__count">{done} of {steps.length} done</span>
      </div>
      <ol className="mission-checklist__list">
        {steps.map((step, i) => (
          <ChecklistItem key={step.id} step={step} index={i} onNavigate={onNavigate} />
        ))}
      </ol>
    </SketchBox>
  )
}
