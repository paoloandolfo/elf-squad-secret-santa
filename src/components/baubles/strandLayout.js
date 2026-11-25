// Splits items into the fewest strands of at most `perStrand`, keeping lengths balanced (7, 6, 6 rather than 7, 7, 5).
export function toStrands(items, perStrand) {
  const count = Math.max(1, Math.ceil(items.length / perStrand))
  const base = Math.floor(items.length / count)
  const extra = items.length % count
  const strands = []
  let start = 0
  for (let i = 0; i < count; i++) {
    const length = base + (i < extra ? 1 : 0)
    strands.push(items.slice(start, start + length))
    start += length
  }
  return strands
}

// How far down the wire's sag a bauble hangs (0 at the ends, 1 in the middle).
// Matches the quadratic curve in Strand, given each strand row is padded by half a gap.
export function sagAt(index, count) {
  const t = (index + 0.5) / count
  return 4 * t * (1 - t)
}
