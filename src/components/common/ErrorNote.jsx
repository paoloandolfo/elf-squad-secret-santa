import SketchBox from '../sketch/SketchBox'
import SketchButton from '../sketch/SketchButton'
import './ErrorNote.css'

export default function ErrorNote({ error, onRetry }) {
  return (
    <SketchBox className="error-note" fill="var(--gold-soft)" seed={77}>
      <h2>Uh oh, the sleigh hit a snag</h2>
      <p>{error?.message ?? 'Something went wrong.'}</p>
      {onRetry && <SketchButton variant="secondary" size="sm" onClick={onRetry}>Try again</SketchButton>}
    </SketchBox>
  )
}
