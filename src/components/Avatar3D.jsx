export default function Avatar3D() {
  return (
    <div className="relative w-full h-full flex items-center justify-center py-4">
      {/* Outer glow */}
      <div className="absolute w-52 h-52 rounded-full bg-blue-500/15 blur-2xl" />

      {/* Gradient ring */}
      <div className="relative w-44 h-44">
        {/* Spinning gradient border */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'linear-gradient(135deg, #3b82f6, #06b6d4, #3b82f6)',
            padding: '3px',
          }}
        >
          <div className="w-full h-full rounded-full bg-[#111]" />
        </div>

        {/* Photo */}
        <img
          src="/avatar.jpg"
          alt="Mikael Dias"
          className="absolute inset-[3px] w-[calc(100%-6px)] h-[calc(100%-6px)] rounded-full object-cover object-top"
          onError={e => {
            e.currentTarget.style.display = 'none'
            e.currentTarget.nextElementSibling.style.display = 'flex'
          }}
        />

        {/* Fallback initials */}
        <div
          className="absolute inset-[3px] w-[calc(100%-6px)] h-[calc(100%-6px)] rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 items-center justify-center text-white text-4xl font-black"
          style={{ display: 'none' }}
        >
          M
        </div>

        {/* Subtle inner glow overlay */}
        <div className="absolute inset-[3px] rounded-full ring-1 ring-white/10 pointer-events-none" />
      </div>

      {/* Available badge */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-[#0f172a] border border-blue-500/30 rounded-full px-3 py-1.5 text-xs text-blue-400 font-mono whitespace-nowrap">
        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
        Disponível para projetos
      </div>
    </div>
  )
}
