const LOOKAHEAD = 0.4
const TICK_MS = 100
const STALE = 0.05
const GAP = 1.8

// Schedules the medley a little ahead of the audio clock, looping through the tracks forever.
export function createSequencer(ctx, tracks, play) {
  let timer = null
  let track = 0
  let index = 0
  let origin = 0

  function tick() {
    const now = ctx.currentTime
    for (;;) {
      const { events, duration } = tracks[track]
      if (index === events.length) {
        origin += duration + GAP
        track = (track + 1) % tracks.length
        index = 0
        continue
      }
      const at = origin + events[index].time
      if (at > now + LOOKAHEAD) return
      if (at > now - STALE) play(events[index], at)
      index += 1
    }
  }

  return {
    start(at) {
      if (timer) return
      index = 0
      origin = at
      tick()
      timer = setInterval(tick, TICK_MS)
    },
    stop() {
      clearInterval(timer)
      timer = null
    },
    get running() {
      return timer !== null
    },
    get upcoming() {
      return tracks[track]
    },
  }
}
