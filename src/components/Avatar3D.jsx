export default function Avatar3D() {
  return (
    <>
      <img
        src="/download.png"
        alt="Mikael Dias"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />

      {/* Handle overlay */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[11px] text-white/70 uppercase tracking-wider">
        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
        @mikaelfiles
      </div>

      {/* Badge disponível */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm border border-blue-500/30 rounded-full px-3 py-1.5 text-xs text-blue-400 font-mono whitespace-nowrap">
        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
        Disponível para projetos
      </div>
    </>
  )
}
