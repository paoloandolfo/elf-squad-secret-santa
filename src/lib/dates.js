const DAY_MS = 86_400_000

const parseLocalDate = (isoDate) => {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function sleepsUntil(isoDate) {
  if (!isoDate) return null
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Math.round((parseLocalDate(isoDate) - today) / DAY_MS)
}

export function sleepsLabel(sleeps) {
  if (sleeps === null) return 'date TBC'
  if (sleeps > 1) return `${sleeps} sleeps to go`
  if (sleeps === 1) return 'one more sleep!'
  if (sleeps === 0) return "it's swap day!"
  return 'hope you loved your gift'
}

export function sleepsShort(sleeps) {
  if (sleeps === null) return 'TBC'
  if (sleeps > 1) return `${sleeps} sleeps`
  if (sleeps === 1) return '1 sleep'
  if (sleeps === 0) return 'Today!'
  return 'Done'
}

export function formatSwapDate(isoDate) {
  if (!isoDate) return 'date TBC'
  return new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
    .format(parseLocalDate(isoDate))
}

export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
