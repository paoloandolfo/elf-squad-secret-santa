import { createReverb } from './reverb'

const REVERB_SEND = 0.35
const REVERB_TONE_HZ = 5200

function createNoise(ctx) {
  const buffer = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
  return buffer
}

export function createMixer(ctx) {
  const input = ctx.createGain()
  const send = ctx.createGain()
  const tone = ctx.createBiquadFilter()
  const compressor = ctx.createDynamicsCompressor()
  const master = ctx.createGain()

  send.gain.value = REVERB_SEND
  tone.type = 'lowpass'
  tone.frequency.value = REVERB_TONE_HZ
  compressor.threshold.value = -14
  compressor.knee.value = 10
  compressor.ratio.value = 3
  compressor.attack.value = 0.005
  compressor.release.value = 0.25
  master.gain.value = 0

  input.connect(compressor)
  input.connect(send).connect(createReverb(ctx)).connect(tone).connect(compressor)
  compressor.connect(master).connect(ctx.destination)

  return { input, master, noise: createNoise(ctx) }
}
