import { midiToFreq } from '../pitch'

// The octave layer keeps the bass audible on phone and laptop speakers.
const LAYERS = [
  { type: 'triangle', ratio: 1, gain: 1 },
  { type: 'sine', ratio: 2, gain: 0.3 },
]
const RING = 1.6

export function playBass(ctx, out, { time, midi, velocity }) {
  const freq = midiToFreq(midi)
  const amp = ctx.createGain()
  amp.gain.setValueAtTime(0, time)
  amp.gain.linearRampToValueAtTime(velocity, time + 0.012)
  amp.gain.setTargetAtTime(0, time + 0.012, RING / 4.6)

  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.setValueAtTime(freq * 8, time)
  filter.frequency.setTargetAtTime(freq * 2.5, time, 0.15)
  filter.connect(amp).connect(out)

  for (const layer of LAYERS) {
    const osc = ctx.createOscillator()
    const level = ctx.createGain()
    osc.type = layer.type
    osc.frequency.value = freq * layer.ratio
    level.gain.value = layer.gain
    osc.connect(level).connect(filter)
    osc.start(time)
    osc.stop(time + RING + 0.05)
  }
}
