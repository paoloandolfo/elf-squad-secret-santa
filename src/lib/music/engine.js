import { MEDLEY } from './carols'
import { arrange } from './arrange'
import { flourish } from './flourish'
import { playEvent } from './instruments'
import { claimMediaChannel, releaseMediaChannel } from './mediaChannel'
import { createMixer } from './mixer'
import { createSequencer } from './sequencer'

const VOLUME = 0.5
const FADE_IN = 1.5
const FADE_OUT = 0.6
const FLOURISH_LEAD = 0.9

const AudioCtx = typeof window === 'undefined' ? null : (window.AudioContext ?? window.webkitAudioContext)

export const musicSupported = Boolean(AudioCtx)

export function createMusicEngine() {
  const tracks = MEDLEY.map(arrange)
  const listeners = new Set()
  let ctx = null
  let mixer = null
  let sequencer = null
  let wanted = false
  let parkTimer = null

  const isPlaying = () => wanted && ctx?.state === 'running'
  const emit = () => listeners.forEach((listener) => listener(isPlaying()))

  function setup() {
    if (ctx) return
    ctx = new AudioCtx({ latencyHint: 'playback' })
    mixer = createMixer(ctx)
    sequencer = createSequencer(ctx, tracks, (event, time) => playEvent(ctx, mixer, event, time))
    ctx.addEventListener('statechange', emit)
  }

  function fadeTo(value, seconds) {
    const { gain } = mixer.master
    const now = ctx.currentTime
    gain.cancelScheduledValues(now)
    gain.setValueAtTime(gain.value, now)
    gain.linearRampToValueAtTime(value, now + seconds)
  }

  // Browsers only let audio start inside a tap, click or key press; outside one it waits suspended.
  function start() {
    if (!AudioCtx) return
    claimMediaChannel()
    setup()
    wanted = true
    clearTimeout(parkTimer)
    ctx.resume().catch(() => {})
    if (!sequencer.running) {
      const at = ctx.currentTime + 0.08
      for (const note of flourish(sequencer.upcoming.tonic)) playEvent(ctx, mixer, note, at + note.time)
      sequencer.start(at + FLOURISH_LEAD)
    }
    fadeTo(VOLUME, FADE_IN)
    emit()
  }

  function stop() {
    wanted = false
    emit()
    if (!ctx) return
    fadeTo(0, FADE_OUT)
    clearTimeout(parkTimer)
    parkTimer = setTimeout(() => {
      sequencer.stop()
      ctx.suspend()
      releaseMediaChannel()
    }, FADE_OUT * 1000 + 150)
  }

  return {
    start,
    stop,
    pause() {
      if (!ctx || !wanted) return
      ctx.suspend()
      releaseMediaChannel()
    },
    resume() {
      if (!ctx || !wanted) return
      claimMediaChannel()
      ctx.resume().catch(() => {})
    },
    dispose() {
      clearTimeout(parkTimer)
      releaseMediaChannel()
      sequencer?.stop()
      ctx?.close()
      ctx = mixer = sequencer = null
      wanted = false
    },
    subscribe(listener) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
  }
}
