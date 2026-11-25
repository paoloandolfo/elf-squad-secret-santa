import { parseChords, parseMelody } from './score'
import { PATTERNS } from './patterns'

const BASS_FLOOR = 41
const EPSILON = 1e-6

const lift = (pitch, floor) => floor + ((((pitch - floor) % 12) + 12) % 12)

function chordAt(chords, beat) {
  let end = 0
  for (const chord of chords) {
    end += chord.beats
    if (beat < end - EPSILON) return chord
  }
  return null
}

function melodyNotes(song, meter) {
  const notes = []
  let beat = 0
  for (const { midi, beats } of parseMelody(song.melody)) {
    if (midi !== null) {
      const downbeat = Math.abs((beat - song.pickup) % meter) < EPSILON
      notes.push({ beat, midi: midi + song.transpose, voice: 'melody', velocity: downbeat ? 1 : 0.82 })
    }
    beat += beats
  }
  return { notes, beats: beat }
}

function accompanimentNotes(song, pattern, chords) {
  const notes = []
  const total = chords.reduce((sum, chord) => sum + chord.beats, 0)
  for (let bar = 0; bar < total; bar += pattern.beats) {
    for (const hit of pattern.hits) {
      const chord = chordAt(chords, bar + hit.at)
      if (!chord) continue
      const root = lift(chord.root + song.transpose, BASS_FLOOR)
      for (const [index, octave] of hit.tones) {
        const interval = chord.intervals[Math.min(index, chord.intervals.length - 1)]
        notes.push({
          beat: song.pickup + bar + hit.at,
          midi: root + interval + 12 * octave,
          voice: hit.voice,
          velocity: hit.velocity ?? 1,
        })
      }
    }
    if (song.bells) {
      for (let b = 0; b < pattern.beats; b++) {
        notes.push({ beat: song.pickup + bar + b, voice: 'bells', velocity: b % 2 ? 1 : 0.6 })
      }
    }
  }
  return notes
}

export function arrange(carol) {
  const song = { pickup: 0, transpose: 0, ...carol }
  const pattern = PATTERNS[song.style]
  const chords = parseChords(song.chords)
  const melody = melodyNotes(song, pattern.beats)
  const secondsPerBeat = 60 / song.bpm
  const events = [...melody.notes, ...accompanimentNotes(song, pattern, chords)]
    .map(({ beat, ...note }) => ({ ...note, time: beat * secondsPerBeat }))
    .sort((a, b) => a.time - b.time)

  return {
    title: song.title,
    tonic: lift(chords[0].root + song.transpose, 0),
    duration: melody.beats * secondsPerBeat,
    events,
  }
}
