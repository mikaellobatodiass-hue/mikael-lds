import { useState } from 'react'

export default function Avatar3D() {
  const [hovered, setHovered] = useState(false)

  return (
    <div style={{ position: 'relative', width: '100%', padding: 0, margin: 0, background: 'none' }}>
      <a
        href="https://instagram.com/mikael_lds"
        target="_blank"
        rel="noreferrer"
        style={{ display: 'block', width: '100%', cursor: 'pointer' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src="/mikael.png"
          alt="Mikael Dias — Instagram"
          style={{
            width: '100%',
            height: '900px',
            maxHeight: 'none',
            objectFit: 'cover',
            objectPosition: 'top center',
            borderRadius: '16px',
            display: 'block',
            marginTop: '-50px',
            transition: 'filter 0.3s ease, transform 0.3s ease',
            filter: hovered
              ? 'brightness(1.08) drop-shadow(0 0 18px rgba(59,130,246,0.55))'
              : 'brightness(1)',
            transform: hovered ? 'scale(1.02)' : 'scale(1)',
          }}
        />
      </a>
    </div>
  )
}
