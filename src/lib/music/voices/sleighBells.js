// A shake is a quick cluster of tiny bells: bright band-passed noise bursts a few milliseconds apart.
const BURSTS = 3

export function playSleighBells(ctx, out, { time, velocity, noise }) {
  for (let i = 0; i < BURSTS; i++) {
    const at = time + i * 0.014 + Math.random() * 0.006
    const source = ctx.createBufferSource()
    const band = ctx.createBiquadFilter()
    const amp = ctx.createGain()
    source.buffer = noise
    band.type = 'bandpass'
    band.frequency.value = 6500 + Math.random() * 3000
    band.Q.value = 3
    amp.gain.setValueAtTime(0, at)
    amp.gain.linearRampToValueAtTime(velocity * (1 - i * 0.22), at + 0.002)
    amp.gain.setTargetAtTime(0, at + 0.002, 0.035)
    source.connect(band).connect(amp).connect(out)
    source.start(at, Math.random() * (noise.duration - 0.3), 0.25)
  }
}
