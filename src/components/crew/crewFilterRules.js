export const CREW_FILTERS = [
  { id: 'all', label: 'Everyone', test: () => true },
  { id: 'joined', label: 'Signed up', test: (member) => member.joined },
  { id: 'pending', label: 'Not yet', test: (member) => !member.joined },
]

export const filterCrew = (members, filterId) =>
  members.filter(CREW_FILTERS.find((filter) => filter.id === filterId).test)

export const crewCounts = (members) =>
  Object.fromEntries(CREW_FILTERS.map((filter) => [filter.id, members.filter(filter.test).length]))
