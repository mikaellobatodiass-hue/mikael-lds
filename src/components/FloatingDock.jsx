import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useSpring, useTransform } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

// Dock estilo macOS: os ícones crescem conforme o mouse se aproxima
// (mesmo comportamento do "Floating Dock" da Aceternity UI).
const BASE = 40      // tamanho do ícone em repouso, px
const MAX = 76       // tamanho máximo, com o mouse em cima
const RANGE = 140    // distância (px) em que o mouse ainda influencia
const SPRING = { mass: 0.1, stiffness: 150, damping: 12 }

export default function FloatingDock({ items }) {
  const { isDark } = useTheme()
  const mouseX = useMotionValue(Infinity)

  return (
    <div
      onMouseMove={e => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={`inline-flex h-16 items-end gap-4 rounded-2xl border px-4 pb-3 ${
        isDark ? 'bg-[#141414]/90 border-white/10' : 'bg-white border-gray-200 shadow-sm'
      }`}
    >
      {items.map(item => (
        <DockIcon key={item.title} mouseX={mouseX} isDark={isDark} {...item} />
      ))}
    </div>
  )
}

function DockIcon({ mouseX, isDark, title, icon, href }) {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)

  const distance = useTransform(mouseX, x => {
    const box = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return x - box.x - box.width / 2
  })
  const size = useSpring(useTransform(distance, [-RANGE, 0, RANGE], [BASE, MAX, BASE]), SPRING)
  const iconSize = useSpring(useTransform(distance, [-RANGE, 0, RANGE], [BASE / 2, MAX / 2, BASE / 2]), SPRING)

  // o nome aparece pela distância do mouse (não por mouseenter), porque os ícones
  // se deslocam ao crescer e o navegador não avisa quando o ícone passa sob o cursor
  useMotionValueEvent(distance, 'change', d => setHovered(Math.abs(d) < size.get() / 2))

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={title}>
      <motion.div
        ref={ref}
        style={{ width: size, height: size }}
        className={`relative flex aspect-square items-center justify-center rounded-full ${
          isDark ? 'bg-neutral-100 text-neutral-900' : 'bg-gray-100 text-gray-900'
        }`}
      >
        <AnimatePresence>
          {hovered && (
            <motion.span
              initial={{ opacity: 0, y: 10, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 2, x: '-50%' }}
              className={`absolute -top-8 left-1/2 whitespace-pre rounded-md border px-2 py-0.5 text-xs ${
                isDark ? 'bg-[#141414] border-white/10 text-white' : 'bg-white border-gray-200 text-gray-800'
              }`}
            >
              {title}
            </motion.span>
          )}
        </AnimatePresence>
        <motion.div style={{ width: iconSize, height: iconSize }} className="flex items-center justify-center">
          {icon}
        </motion.div>
      </motion.div>
    </a>
  )
}
