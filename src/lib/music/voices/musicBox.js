import { midiToFreq } from '../pitch'

// Comb tines ring almost as a pure tone; the 6.27× partial is the short metallic "ting" of a clamped bar.
const PARTIALS = [
  { ratio: 1, gain: 1, length: 1 },
  { ratio: 2, gain: 0.12, length: 0.45 },
  { ratio: 3, gain: 0.04, length: 0.25 },
  { ratio: 6.27, gain: 0.16, length: 0.06 },
]
const MAX_PARTIAL_HZ = 12000

export function playMusicBox(ctx, out, { time, midi, velocity }) {
  const freq = midiToFreq(midi)
  const ring = Math.min(3.2, Math.max(1, 2.8 - (midi - 60) * 0.06))

  for (const { ratio, gain, length } of PARTIALS) {
    if (freq * ratio > MAX_PARTIAL_HZ) continue
    const seconds = ring * length
    const osc = ctx.createOscillator()
    const amp = ctx.createGain()
    osc.frequency.value = freq * ratio
    amp.gain.setValueAtTime(0, time)
    amp.gain.linearRampToValueAtTime(velocity * gain, time + 0.002)
    amp.gain.setTargetAtTime(0, time + 0.002, seconds / 4.6)
    osc.connect(amp).connect(out)
    osc.start(time)
    osc.stop(time + seconds + 0.05)
  }
}
