import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STORAGE_KEY = 'portfolio_likes'
const LIKED_KEY = 'portfolio_liked'

function Particle({ x, y, onDone }) {
  const angle = Math.random() * Math.PI * 2
  const distance = 40 + Math.random() * 40
  const tx = Math.cos(angle) * distance
  const ty = Math.sin(angle) * distance
  const size = 4 + Math.random() * 6
  const colors = ['#f43f5e', '#fb923c', '#facc15', '#f472b6', '#c084fc']
  const color = colors[Math.floor(Math.random() * colors.length)]

  return (
    <motion.div
      className="pointer-events-none fixed rounded-full z-[999]"
      style={{ left: x, top: y, width: size, height: size, backgroundColor: color }}
      initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      animate={{ opacity: 0, scale: 0, x: tx, y: ty }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      onAnimationComplete={onDone}
    />
  )
}

export default function LikeButton() {
  const [count, setCount] = useState(0)
  const [liked, setLiked] = useState(false)
  const [burst, setBurst] = useState(false)
  const [particles, setParticles] = useState([])
  const btnRef = useRef(null)

  useEffect(() => {
    const saved = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10)
    const hasLiked = localStorage.getItem(LIKED_KEY) === 'true'
    setCount(saved)
    setLiked(hasLiked)
  }, [])

  const handleClick = useCallback(() => {
    if (liked) return

    const newCount = count + 1
    setCount(newCount)
    setLiked(true)
    setBurst(true)
    localStorage.setItem(STORAGE_KEY, String(newCount))
    localStorage.setItem(LIKED_KEY, 'true')

    // Spawn particles from button center
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const newParticles = Array.from({ length: 12 }, (_, i) => ({ id: Date.now() + i, x: cx, y: cy }))
      setParticles(prev => [...prev, ...newParticles])
    }

    setTimeout(() => setBurst(false), 300)
  }, [liked, count])

  const removeParticle = useCallback((id) => {
    setParticles(prev => prev.filter(p => p.id !== id))
  }, [])

  return (
    <>
      {/* Particles */}
      {particles.map(p => (
        <Particle key={p.id} x={p.x} y={p.y} onDone={() => removeParticle(p.id)} />
      ))}

      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-1.5">
        {/* Counter pill */}
        <AnimatePresence>
          {count > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-[#1a1a1a] border border-white/10 rounded-full px-2.5 py-0.5 text-xs font-semibold text-gray-300"
            >
              {count}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Heart button */}
        <motion.button
          ref={btnRef}
          onClick={handleClick}
          disabled={liked}
          whileTap={!liked ? { scale: 0.85 } : undefined}
          animate={burst ? { scale: [1, 1.4, 1] } : { scale: 1 }}
          transition={{ duration: 0.3 }}
          title={liked ? 'Você já curtiu!' : 'Curtir este portfólio'}
          className={`
            w-13 h-13 rounded-full flex items-center justify-center
            shadow-lg border transition-all duration-300 select-none
            ${liked
              ? 'bg-rose-600 border-rose-500/50 cursor-default shadow-rose-500/20'
              : 'bg-[#1a1a1a] border-white/10 hover:border-white/25 hover:bg-[#222] cursor-pointer shadow-black/40'
            }
          `}
          style={{ width: 52, height: 52 }}
        >
          <motion.span
            animate={burst ? { scale: [1, 1.5, 1] } : { scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-2xl leading-none"
            style={{ filter: liked ? 'drop-shadow(0 0 6px #f43f5e)' : 'none' }}
          >
            {liked ? '❤️' : '🤍'}
          </motion.span>
        </motion.button>

        {/* Tooltip */}
        {!liked && (
          <span className="text-[10px] text-gray-600 whitespace-nowrap">
            Curtir
          </span>
        )}
      </div>
    </>
  )
}
