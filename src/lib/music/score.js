import { noteToMidi, pitchClass } from './pitch'

const QUALITIES = {
  '': [0, 4, 7],
  m: [0, 3, 7],
  7: [0, 4, 7, 10],
  m7: [0, 3, 7, 10],
}

// Scores are written as "NOTE:BEATS" tokens; bar lines are only there for reading.
const tokens = (text) => text.split(/[\s|]+/).filter(Boolean).map((token) => token.split(':'))

export function parseMelody(text) {
  return tokens(text).map(([note, beats]) => ({
    midi: note === 'r' ? null : noteToMidi(note),
    beats: Number(beats),
  }))
}

export function parseChords(text) {
  return tokens(text).map(([symbol, beats]) => {
    const [, letter, accidental = '', quality] = /^([A-G])(#|b)?(.*)$/.exec(symbol)
    if (!QUALITIES[quality]) throw new Error(`Unknown chord "${symbol}"`)
    return { root: pitchClass(letter, accidental), intervals: QUALITIES[quality], beats: Number(beats) }
  })
}
