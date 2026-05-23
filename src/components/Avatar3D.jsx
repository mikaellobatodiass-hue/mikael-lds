export default function Avatar3D() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <img
        src="/avatar.png"
        alt="Mikael Dias"
        className="w-full h-full rounded-full"
        style={{ objectFit: 'cover', objectPosition: 'top center' }}
      />

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-[#0f172a] border border-blue-500/30 rounded-full px-3 py-1.5 text-xs text-blue-400 font-mono whitespace-nowrap">
        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
        Disponível para projetos
      </div>
    </div>
  )
}
