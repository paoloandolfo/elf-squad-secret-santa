const STEPS = [0, 4, 7, 12]

// A quick music-box sparkle in the key of the carol that follows.
export function flourish(tonic) {
  const base = 77 + ((tonic + 7) % 12)
  return STEPS.map((step, i) => ({
    time: i * 0.08,
    midi: base + step,
    voice: 'melody',
    velocity: 0.4 + i * 0.1,
  }))
}
