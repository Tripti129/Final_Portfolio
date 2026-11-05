import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useFinePointer } from './MouseEffects'

// Tilts its children in 3D towards the mouse
export function Tilt({ children, className = '', max = 8 }) {
  const fine = useFinePointer()
  const ref = useRef(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const sx = useSpring(px, { stiffness: 200, damping: 20 })
  const sy = useSpring(py, { stiffness: 200, damping: 20 })
  const rotateY = useTransform(sx, [0, 1], [-max, max])
  const rotateX = useTransform(sy, [0, 1], [max, -max])

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const reset = () => {
    px.set(0.5)
    py.set(0.5)
  }

  if (!fine) return <div className={className}>{children}</div>

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 900, transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Pulls its child slightly towards the cursor
export function Magnetic({ children, strength = 0.35 }) {
  const fine = useFinePointer()
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 250, damping: 15, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 250, damping: 15, mass: 0.4 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  if (!fine) return children

  return (
    <motion.span ref={ref} onPointerMove={onMove} onPointerLeave={reset} style={{ x: sx, y: sy }} className="inline-block">
      {children}
    </motion.span>
  )
}

// Moves its children a little with the mouse position across the whole window (parallax)
export function useMouseParallax(range = 30) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 40, damping: 20 })
  const sy = useSpring(y, { stiffness: 40, damping: 20 })
  const handler = (e) => {
    x.set((e.clientX / window.innerWidth - 0.5) * range)
    y.set((e.clientY / window.innerHeight - 0.5) * range)
  }
  return { x: sx, y: sy, handler }
}
