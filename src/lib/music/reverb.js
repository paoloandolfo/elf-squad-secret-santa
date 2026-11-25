// A synthetic hall: decaying stereo noise as the impulse response, so no audio files are needed.
export function createReverb(ctx, { seconds = 2.4, decay = 3.5 } = {}) {
  const length = Math.round(ctx.sampleRate * seconds)
  const impulse = ctx.createBuffer(2, length, ctx.sampleRate)
  for (let channel = 0; channel < 2; channel++) {
    const data = impulse.getChannelData(channel)
    for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** decay
  }
  const convolver = ctx.createConvolver()
  convolver.buffer = impulse
  return convolver
}
