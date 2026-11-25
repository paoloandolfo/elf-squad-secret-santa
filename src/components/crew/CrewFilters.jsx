import Chip from '../common/Chip'
import { CREW_FILTERS } from './crewFilterRules'
import './CrewFilters.css'

export default function CrewFilters({ value, counts, onChange }) {
  return (
    <div className="crew-filters" role="group" aria-label="Filter the crew">
      {CREW_FILTERS.map((filter) => (
        <Chip key={filter.id} as="button" active={value === filter.id} onClick={() => onChange(filter.id)}>
          {filter.label}
          <span className="crew-filters__count">{counts[filter.id]}</span>
        </Chip>
      ))}
    </div>
  )
}
