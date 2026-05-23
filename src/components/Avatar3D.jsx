export default function Avatar3D() {
  return (
    <div className="flex flex-col items-center gap-4 p-5 w-full">
      {/* Wrapper relativo para o overlay do handle */}
      <div className="relative w-full">
        <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5 text-[11px] text-white/70 uppercase tracking-wider">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          @mikaelfiles
        </div>

        <img
          src="/download.png"
          alt="Mikael Dias"
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            objectPosition: 'center',
            display: 'block',
          }}
        />
      </div>

      {/* Badge abaixo da foto */}
      <div className="flex items-center gap-1.5 bg-[#0f172a] border border-blue-500/30 rounded-full px-3 py-1.5 text-xs text-blue-400 font-mono whitespace-nowrap">
        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
        Disponível para projetos
      </div>
    </div>
  )
}
