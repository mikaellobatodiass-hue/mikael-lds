import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { EASE } from '../lib/motion'
import { LIKE_EVENT } from '../lib/hexBurst'

const STORAGE_KEY = 'portfolio_likes'
const LIKED_KEY = 'portfolio_liked'

const HEART = 'M12 20.5s-7.6-4.6-9.6-9.3C1 7.9 3 4.5 6.5 4.5c2.1 0 3.6 1.2 5.5 3.3 1.9-2.1 3.4-3.3 5.5-3.3 3.5 0 5.5 3.4 4.1 6.7-2 4.7-9.6 9.3-9.6 9.3z'

function Particle({ x, y, onDone }) {
  const angle = Math.random() * Math.PI * 2
  const distance = 40 + Math.random() * 50
  const size = 4 + Math.random() * 5
  const colors = ['#22c55e', '#4ade80', '#86efac', '#16a34a', '#10b981']
  const color = colors[Math.floor(Math.random() * colors.length)]

  return (
    <motion.div
      className="pointer-events-none fixed rounded-full z-[999]"
      style={{ left: x, top: y, width: size, height: size, backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
      initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      animate={{ opacity: 0, scale: 0, x: Math.cos(angle) * distance, y: Math.sin(angle) * distance }}
      transition={{ duration: 0.8, ease: EASE }}
      onAnimationComplete={onDone}
    />
  )
}

export default function LikeButton() {
  const { isDark } = useTheme()
  const [count, setCount] = useState(0)
  const [liked, setLiked] = useState(false)
  const [particles, setParticles] = useState([])
  const [thanks, setThanks] = useState(false)
  const [pops, setPops] = useState(0) // repete a animação do coração a cada clique
  const [hidden, setHidden] = useState(false)
  const btnRef = useRef(null)
  const thanksTimer = useRef(0)

  useEffect(() => {
    try {
      setCount(parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10))
      setLiked(localStorage.getItem(LIKED_KEY) === 'true')
    } catch { /* navegador sem localStorage: começa do zero */ }
  }, [])

  // sai da frente quando o rodapé aparece
  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return
    const io = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), { threshold: 0.15 })
    io.observe(footer)
    return () => io.disconnect()
  }, [])

  useEffect(() => () => clearTimeout(thanksTimer.current), [])

  // pode curtir quantas vezes quiser: cada clique soma +1 e solta as luzes de novo
  const handleClick = useCallback(() => {
    const newCount = count + 1
    setLiked(true)
    setCount(newCount)
    setPops(n => n + 1)
    try {
      localStorage.setItem(STORAGE_KEY, String(newCount))
      localStorage.setItem(LIKED_KEY, 'true')
    } catch { /* ignora */ }

    // chuva de luzes no fundo hexagonal
    window.dispatchEvent(new Event(LIKE_EVENT))

    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      setParticles(prev => [...prev, ...Array.from({ length: 16 }, (_, i) => ({ id: `${Date.now()}-${i}`, x: cx, y: cy }))])
    }

    setThanks(true)
    clearTimeout(thanksTimer.current)
    thanksTimer.current = setTimeout(() => setThanks(false), 2600)
  }, [count])

  const removeParticle = useCallback(id => {
    setParticles(prev => prev.filter(p => p.id !== id))
  }, [])

  return (
    <>
      {particles.map(p => (
        <Particle key={p.id} x={p.x} y={p.y} onDone={() => removeParticle(p.id)} />
      ))}

      <motion.div
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
        initial={false}
        animate={{ opacity: hidden ? 0 : 1, y: hidden ? 20 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{ pointerEvents: hidden ? 'none' : 'auto' }}
      >
        {/* agradecimento */}
        <AnimatePresence>
          {thanks && (
            <motion.div
              initial={{ opacity: 0, x: 12, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.45, ease: EASE }}
              className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-medium backdrop-blur ${
                isDark ? 'bg-[#0f140f]/90 border-green-500/30 text-green-300' : 'bg-white/90 border-green-200 text-green-700 shadow-sm'
              }`}
            >
              Valeu pela curtida! 💚
            </motion.div>
          )}
        </AnimatePresence>

        {/* botão */}
        <motion.button
          ref={btnRef}
          onClick={handleClick}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.3, ease: EASE }}
          aria-label="Curtir o portfólio"
          title={liked ? 'Curtir de novo 💚' : 'Curtir este portfólio'}
          className={`group relative flex items-center gap-2 h-12 pl-3.5 pr-4 rounded-full border backdrop-blur transition-colors duration-500 ${
            liked
              ? 'bg-green-500/15 border-green-500/40 shadow-[0_8px_30px_rgba(34,197,94,0.25)]'
              : isDark
              ? 'bg-[#141414]/90 border-white/10 hover:border-green-500/40 shadow-lg shadow-black/40'
              : 'bg-white/90 border-gray-200 hover:border-green-400 shadow-md'
          }`}
        >
          {/* onda de luz a cada curtida (não toca ao abrir a página) */}
          {pops > 0 && (
            <motion.span
              key={`ring-${pops}`}
              className="absolute inset-0 rounded-full border-2 border-green-400 pointer-events-none"
              initial={{ opacity: 0.7, scale: 1 }}
              animate={{ opacity: 0, scale: 1.6 }}
              transition={{ duration: 0.9, ease: EASE }}
            />
          )}

          <motion.svg
            key={`heart-${pops}`}
            viewBox="0 0 24 24"
            className="w-6 h-6"
            initial={false}
            animate={pops > 0 ? { scale: [1, 1.35, 0.95, 1] } : { scale: 1 }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{ filter: liked ? 'drop-shadow(0 0 6px rgba(34,197,94,0.8))' : 'none' }}
          >
            <motion.path
              d={HEART}
              strokeWidth="1.8"
              strokeLinejoin="round"
              initial={false}
              animate={{
                fill: liked ? '#22c55e' : 'rgba(34,197,94,0)',
                stroke: liked ? '#4ade80' : isDark ? '#9ca3af' : '#6b7280',
              }}
              transition={{ duration: 0.4, ease: EASE }}
            />
          </motion.svg>

          <span className={`text-sm font-semibold tabular-nums ${liked ? 'text-green-400' : isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {count > 0 ? count : 'Curtir'}
          </span>
        </motion.button>
      </motion.div>
    </>
  )
}
