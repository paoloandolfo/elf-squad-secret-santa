// A tiny all-zero 16-bit mono WAV, built in memory so no asset has to ship.
export function silentWavUrl(seconds = 1, rate = 8000) {
  const bytes = seconds * rate * 2
  const view = new DataView(new ArrayBuffer(44 + bytes))
  const text = (offset, value) => [...value].forEach((char, i) => view.setUint8(offset + i, char.charCodeAt(0)))

  text(0, 'RIFF')
  view.setUint32(4, 36 + bytes, true)
  text(8, 'WAVE')
  text(12, 'fmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, 1, true)
  view.setUint32(24, rate, true)
  view.setUint32(28, rate * 2, true)
  view.setUint16(32, 2, true)
  view.setUint16(34, 16, true)
  text(36, 'data')
  view.setUint32(40, bytes, true)

  return URL.createObjectURL(new Blob([view.buffer], { type: 'audio/wav' }))
}
