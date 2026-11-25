// One bar of accompaniment. Tones are [chord index, octaves above the bass root];
// index 3 (the seventh) falls back to the fifth on plain triads.
const STAB = [[1, 1], [3, 1]]

export const PATTERNS = {
  march: {
    beats: 4,
    hits: [
      { at: 0, voice: 'bass', tones: [[0, 0]] },
      { at: 1, voice: 'chord', tones: STAB },
      { at: 2, voice: 'bass', tones: [[2, 0]], velocity: 0.85 },
      { at: 3, voice: 'chord', tones: STAB, velocity: 0.9 },
    ],
  },
  waltz: {
    beats: 3,
    hits: [
      { at: 0, voice: 'bass', tones: [[0, 0]] },
      { at: 1, voice: 'chord', tones: STAB },
      { at: 2, voice: 'chord', tones: STAB, velocity: 0.8 },
    ],
  },
  lullaby: {
    beats: 3,
    hits: [
      { at: 0, voice: 'bass', tones: [[0, 0]] },
      { at: 0.5, voice: 'chord', tones: [[2, 0]], velocity: 0.8 },
      { at: 1, voice: 'chord', tones: [[0, 1]], velocity: 0.9 },
      { at: 1.5, voice: 'chord', tones: [[1, 1]] },
      { at: 2, voice: 'chord', tones: [[0, 1]], velocity: 0.85 },
      { at: 2.5, voice: 'chord', tones: [[2, 0]], velocity: 0.75 },
    ],
  },
}
