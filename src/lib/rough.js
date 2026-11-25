import rough from 'roughjs'

const generator = rough.generator()

export function roughRect(width, height, options, inset = 3) {
  const drawable = generator.rectangle(inset, inset, width - inset * 2, height - inset * 2, options)
  return generator.toPaths(drawable)
}

export function roughCircle(size, options, inset = 3) {
  const drawable = generator.circle(size / 2, size / 2, size - inset * 2, options)
  return generator.toPaths(drawable)
}
