import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { LIKE_EVENT, runHexBurst } from '../lib/hexBurst'

const MAX_BURSTS = 3 // rajadas simultâneas (cliques seguidos) sem pesar

// Uma rajada de luzes; some sozinha quando todas as luzes saem da tela
function BurstCanvas({ onDone }) {
  const ref = useRef(null)
  useEffect(() => runHexBurst(ref.current, onDone), []) // roda uma vez, ao aparecer
  return <canvas ref={ref} className="absolute inset-0" />
}

export default function HexBackground({ className = '' }) {
  const { isDark } = useTheme()
  const ref = useRef(null)
  const [bursts, setBursts] = useState([])

  // O fundo fica atrás de todo o conteúdo da seção (-z-10 dentro de um contexto isolado)
  useLayoutEffect(() => {
    const parent = ref.current?.parentElement
    if (parent) parent.style.isolation = 'isolate'
  }, [])

  // Ao curtir o site, solta uma chuva de luzes pela grade — só nas seções visíveis
  useEffect(() => {
    const onLike = () => {
      const r = ref.current?.getBoundingClientRect()
      if (r && r.bottom > 0 && r.top < window.innerHeight) {
        setBursts(b => (b.length >= MAX_BURSTS ? b : [...b, `${Date.now()}-${Math.random()}`]))
      }
    }
    window.addEventListener(LIKE_EVENT, onLike)
    return () => window.removeEventListener(LIKE_EVENT, onLike)
  }, [])

  return (
    <div
      ref={ref}
      className={`absolute inset-0 -z-10 pointer-events-none ${isDark ? 'hex-pattern' : 'hex-pattern-light'} ${className}`}
      aria-hidden="true"
    >
      {bursts.map(id => (
        <BurstCanvas key={id} onDone={() => setBursts(b => b.filter(x => x !== id))} />
      ))}
    </div>
  )
}
