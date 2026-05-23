export default function Avatar3D() {
  return (
    <div className="relative w-full h-full flex items-center justify-center py-4">
      {/* Photo — circular, sem borda, sem glow */}
      <img
        src="/avatar.jpg"
        alt="Mikael Dias"
        className="w-44 h-44 rounded-full object-cover object-top"
      />

      {/* Badge disponível */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-[#0f172a] border border-blue-500/30 rounded-full px-3 py-1.5 text-xs text-blue-400 font-mono whitespace-nowrap">
        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
        Disponível para projetos
      </div>
    </div>
  )
}
