export default function Avatar3D() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', padding: 0, margin: 0, background: 'none' }}>
      <img
        src="/mikael.png"
        alt="Mikael Dias"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'top',
          borderRadius: '16px',
          display: 'block',
        }}
      />

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
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block', animation: 'pulse 2s infinite' }} />
        Disponível para projetos
      </div>
    </div>
  )
}
