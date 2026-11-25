const STEPS = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }
const ACCIDENTALS = { '#': 1, b: -1, '': 0 }

export const pitchClass = (letter, accidental = '') => STEPS[letter] + ACCIDENTALS[accidental]

export function noteToMidi(note) {
  const match = /^([A-G])(#|b)?(\d)$/.exec(note)
  if (!match) throw new Error(`Unknown note "${note}"`)
  const [, letter, accidental = '', octave] = match
  return 12 * (Number(octave) + 1) + pitchClass(letter, accidental)
}

export const midiToFreq = (midi) => 440 * 2 ** ((midi - 69) / 12)
