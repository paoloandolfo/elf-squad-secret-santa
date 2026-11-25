import { useLayoutEffect, useState } from 'react'
import { fitGrid } from '../lib/fitGrid'

const px = (value) => parseFloat(value) || 0

// offsetTop ignores transforms, so entrance animations don't skew the measurement.
function pageTop(element) {
  let top = 0
  for (let node = element; node; node = node.offsetParent) top += node.offsetTop
  return top
}

export function useFitGrid(ref, { count, min, max, cardHeight }) {
  const [layout, setLayout] = useState({ size: max, cols: count })

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return
    const measure = () => {
      const style = getComputedStyle(element)
      const stage = element.closest('main')
      const reserve = stage ? px(getComputedStyle(stage).paddingBottom) : 0
      const next = fitGrid({
        count,
        min,
        max,
        cardHeight,
        width: px(style.width) - px(style.paddingLeft) - px(style.paddingRight),
        height: window.innerHeight - pageTop(element) - px(style.paddingTop) - reserve,
        gapX: px(style.columnGap),
        gapY: px(style.rowGap),
      })
      setLayout((prev) => (prev.size === next.size && prev.cols === next.cols ? prev : next))
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    window.addEventListener('resize', measure)
    document.fonts?.ready.then(measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [ref, count, min, max, cardHeight])

  return layout
}
