export function missionView(event, target, revealed) {
  if (!event.drawn_at) return 'waiting'
  if (!target) return 'missed'
  return revealed ? 'target' : 'gift'
}
