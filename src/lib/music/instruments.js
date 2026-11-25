import { playMusicBox } from './voices/musicBox'
import { playBass } from './voices/bass'
import { playSleighBells } from './voices/sleighBells'

const LEVELS = { melody: 0.3, chord: 0.09, bass: 0.22, bells: 0.7 }
const JITTER = 0.008

export function playEvent(ctx, mixer, event, time) {
  const note = {
    time: Math.max(ctx.currentTime, time + (Math.random() - 0.5) * JITTER),
    midi: event.midi,
    velocity: event.velocity * LEVELS[event.voice] * (0.92 + Math.random() * 0.16),
  }
  if (event.voice === 'bass') playBass(ctx, mixer.input, note)
  else if (event.voice === 'bells') playSleighBells(ctx, mixer.input, { ...note, noise: mixer.noise })
  else playMusicBox(ctx, mixer.input, note)
}
