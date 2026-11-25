import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import './Snowfall.css'

const INK = 'rgba(88, 120, 145, 0.55)'

function makeFlake(width, height, anywhere) {
  const r = 1.6 + Math.random() * 3.4
  return {
    x: Math.random() * width,
    y: anywhere ? Math.random() * height : -12 - Math.random() * 60,
    r,
    speed: 0.25 + r * 0.12 + Math.random() * 0.25,
    sway: 0.4 + Math.random() * 0.9,
    phase: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.02,
    angle: Math.random() * Math.PI,
    star: r > 3.3,
  }
}

function drawFlake(ctx, flake) {
  ctx.save()
  ctx.translate(flake.x, flake.y)
  ctx.rotate(flake.angle)
  ctx.strokeStyle = INK
  if (flake.star) {
    ctx.lineWidth = 1.4
    ctx.lineCap = 'round'
    ctx.beginPath()
    for (let i = 0; i < 3; i++) {
      const a = (i * Math.PI) / 3
      const dx = Math.cos(a) * flake.r * 1.6
      const dy = Math.sin(a) * flake.r * 1.6
      ctx.moveTo(-dx, -dy)
      ctx.lineTo(dx, dy)
    }
    ctx.stroke()
  } else {
    ctx.lineWidth = 1
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
    ctx.beginPath()
    ctx.arc(0, 0, flake.r, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
  }
  ctx.restore()
}

export default function Snowfall() {
  const canvasRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let width = 0
    let height = 0
    let flakes = []
    let raf = 0
    let last = performance.now()
    let time = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round(Math.min(120, (width * height) / 12000))
      flakes = Array.from({ length: count }, () => makeFlake(width, height, true))
      if (reduceMotion) flakes.forEach((flake) => drawFlake(ctx, flake))
    }

    const tick = (now) => {
      const dt = Math.min(3, (now - last) / 16.67)
      last = now
      time += dt
      ctx.clearRect(0, 0, width, height)
      for (const flake of flakes) {
        flake.y += flake.speed * dt
        flake.x += Math.sin(time * 0.01 * flake.sway + flake.phase) * 0.35 * dt
        flake.angle += flake.spin * dt
        if (flake.y > height + 12) Object.assign(flake, makeFlake(width, height, false))
        drawFlake(ctx, flake)
      }
      raf = requestAnimationFrame(tick)
    }

    resize()
    window.addEventListener('resize', resize)
    if (!reduceMotion) raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [reduceMotion])

  return <canvas ref={canvasRef} className="snowfall" aria-hidden="true" />
}
