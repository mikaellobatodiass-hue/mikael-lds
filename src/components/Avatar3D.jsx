import { useState } from 'react'

export default function Avatar3D() {
  const [hovered, setHovered] = useState(false)

  return (
    <div className="relative w-full h-[600px] flex justify-center">
      {/* Brilho verde atrás da foto */}
      <div
        className="absolute left-1/2 top-[18%] -translate-x-1/2 w-[380px] h-[480px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(closest-side, rgba(34,197,94,0.28), rgba(34,197,94,0) 100%)' }}
      />

      <a
        href="https://instagram.com/mikael_lds"
        target="_blank"
        rel="noreferrer"
        className="relative h-full block overflow-hidden cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src="/mikael-recorte.png"
          alt="Mikael Dias — Instagram"
          style={{
            height: '140%',
            width: 'auto',
            maxWidth: 'none',
            display: 'block',
            // some suavemente na parte de baixo, como se entrasse no fundo
            maskImage: 'linear-gradient(to bottom, #000 55%, transparent 72%)',
            WebkitMaskImage: 'linear-gradient(to bottom, #000 55%, transparent 72%)',
            transition: 'filter 0.3s ease, transform 0.3s ease',
            filter: hovered
              ? 'brightness(1.15)'
              : 'brightness(1.05)',
            transform: hovered ? 'scale(1.02)' : 'scale(1)',
            transformOrigin: 'top center',
          }}
        />
      </a>
    </div>
  )
}
