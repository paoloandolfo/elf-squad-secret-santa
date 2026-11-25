import { firstName, plural } from '../../lib/names'
import { formatSwapDate } from '../../lib/dates'

export function missionSteps({ event, details, wishes, roster, target, revealed }) {
  const members = roster?.members ?? []
  const joined = members.filter((m) => m.joined).length
  const drawn = Boolean(event.drawn_at)

  let unwrapDetail = 'Unlocks after the draw'
  if (drawn && revealed) unwrapDetail = `It’s ${firstName(target.name)}!`
  else if (drawn && target) unwrapDetail = 'Tap the present to open it'
  else if (drawn) unwrapDetail = 'You missed this draw'

  return [
    { id: 'pin', label: 'Pick your secret PIN', detail: 'You’re on the list', done: true },
    {
      id: 'wishlist',
      label: 'Write your wishlist',
      detail: wishes.length ? `${plural(wishes.length, 'wish', 'wishes')} so far` : 'Give your Santa a few hints',
      done: wishes.length > 0,
      action: { tab: 'wishlist', label: wishes.length ? 'Edit' : 'Start' },
    },
    {
      id: 'draw',
      label: 'Wait for the draw',
      detail: drawn ? 'Names are in!' : `${joined} of ${members.length} elves signed up`,
      done: drawn,
      action: drawn ? null : { tab: 'crew', label: 'Crew' },
    },
    { id: 'unwrap', label: 'Unwrap your match', detail: unwrapDetail, done: revealed, locked: !drawn },
    {
      id: 'gift',
      label: `Find a gift around ${details.budget}`,
      detail: `Bring it wrapped on ${formatSwapDate(details.exchange_date)}`,
      done: false,
      locked: !revealed,
    },
  ]
}
