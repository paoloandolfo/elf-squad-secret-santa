import { useState } from 'react'

export function useSeed() {
  const [seed] = useState(() => Math.floor(Math.random() * 100000) + 1)
  return seed
}
