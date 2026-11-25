// All bauble proportions are fractions of the cell width; Bauble.css reads them from these variables.
const SAG = 0.3
const STRING_MIN = 0.1
const STRING_MAX = 0.2
const CAP = 0.22
const CAP_OVERLAP = 0.05
const BALL = 0.84
const NAME_GAP = 6

export const BAUBLE_MIN = 72
export const BAUBLE_MAX = 150

const nameSize = (cell) => Math.min(21, Math.max(15, cell * 0.14))

export const stringFactor = (seed) => STRING_MIN + ((seed % 1000) / 1000) * (STRING_MAX - STRING_MIN)

export const strandHeight = (cell) =>
  cell * (SAG + STRING_MAX + CAP - CAP_OVERLAP + BALL) + NAME_GAP + nameSize(cell) * 2.1

export const baubleStyle = (cell) => ({
  '--cell': `${cell}px`,
  '--sag': `${cell * SAG}px`,
  '--cap': `${cell * CAP}px`,
  '--cap-overlap': `${cell * CAP_OVERLAP}px`,
  '--ball': `${cell * BALL}px`,
  '--name-gap': `${NAME_GAP}px`,
  '--bauble-name': `${nameSize(cell)}px`,
})
