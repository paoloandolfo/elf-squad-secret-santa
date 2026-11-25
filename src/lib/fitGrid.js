// Largest cell width (between min and max) that lets `count` cells fit in the box,
// plus the column count that achieves it. If nothing fits, returns the densest
// layout that still respects `min`.
export function fitGrid({ count, width, height, min, max, gapX, gapY, cardHeight }) {
  const fits = (size, rows) => rows * cardHeight(size) + (rows - 1) * gapY <= height
  let best = null
  let densest = { size: min, cols: 1 }

  for (let cols = 1; cols <= count; cols++) {
    const widest = Math.min(max, Math.floor((width - (cols - 1) * gapX) / cols))
    if (widest < min) break
    densest = { size: widest, cols }
    const rows = Math.ceil(count / cols)
    let size = widest
    while (size >= min && !fits(size, rows)) size -= 1
    if (size >= min && (!best || size > best.size)) best = { size, cols }
  }
  return best ?? densest
}
