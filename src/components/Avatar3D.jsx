import { useState } from 'react'

export default function Avatar3D() {
  const [hovered, setHovered] = useState(false)

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', padding: 0, margin: 0, background: 'none' }}>
      <a
        href="https://instagram.com/mikael_lds"
        target="_blank"
        rel="noreferrer"
        style={{ display: 'block', width: '100%', height: '100%', cursor: 'pointer' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src="/mikael.png"
          alt="Mikael Dias — Instagram"
          style={{
            width: '200%',
            height: '200%',
            objectFit: 'cover',
            objectPosition: 'top',
            borderRadius: '16px',
            display: 'block',
            transition: 'filter 0.3s ease, transform 0.3s ease',
            filter: hovered
              ? 'brightness(1.08) drop-shadow(0 0 18px rgba(59,130,246,0.55))'
              : 'brightness(1)',
            transform: hovered ? 'scale(1.02)' : 'scale(1)',
          }}
        />
      </a>

      <div style={{
        position: 'absolute',
        bottom: '12px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        background: 'rgba(15,23,42,0.85)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(59,130,246,0.3)',
        borderRadius: '999px',
        padding: '6px 14px',
        fontSize: '11px',
        color: '#60a5fa',
        fontFamily: 'monospace',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block', animation: 'pulse 2s infinite' }} />
        Disponível para projetos
      </div>
    </div>
  )
}
