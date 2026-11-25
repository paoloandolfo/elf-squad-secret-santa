import DoodleSvg from '../doodles/DoodleSvg'
import './BudgetTag.css'

const TAG = 'M22 40 L42 18 L114 17 L113 63 L42 62 Z'

export default function BudgetTag({ budget }) {
  return (
    <div className="budget-tag" role="img" aria-label={`Budget ${budget}`}>
      <DoodleSvg viewBox="0 0 120 70" className="budget-tag__svg">
        <g className="budget-tag__swing">
          <path className="ink-thin" d="M36 40 C30 26 22 12 24 0" />
          <path className="wash" fill="var(--gold-soft)" d={TAG} transform="translate(3 3)" />
          <g className="ink-layer">
            <path className="ink" d={TAG} />
            <circle className="ink" cx="36" cy="40" r="4" />
          </g>
          <text x="78" y="49" textAnchor="middle" className="budget-tag__price">{budget}</text>
        </g>
      </DoodleSvg>
      <span className="budget-tag__caption">budget</span>
    </div>
  )
}
