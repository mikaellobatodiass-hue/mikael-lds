import { useEffect, useRef, useState } from 'react'

function getColor(level) {
  const colors = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
  return colors[Math.min(level, 4)]
}

function randomGrid(weekCount) {
  return Array.from({ length: weekCount }, () =>
    Array.from({ length: 7 }, () => {
      const rand = Math.random()
      if (rand > 0.96) return 4
      if (rand > 0.88) return 3
      if (rand > 0.75) return 2
      if (rand > 0.6) return 1
      return 0
    })
  )
}

// Gráfico de contribuições "vivo": de tempos em tempos um quadradinho recebe um
// commit (acende, dá um pulinho e fica um tom mais forte), quase sempre nas
// colunas mais recentes; às vezes um quadradinho antigo apaga um tom.
export default function ContribGraph({ totalCommits = 312, weekCount = 26, cellSize = 10, gap = 3 }) {
  const [grid, setGrid] = useState(() => randomGrid(weekCount))
  const [flash, setFlash] = useState(null) // { w, d, tick } do último commit
  const ref = useRef(null)

  useEffect(() => {
    let timer = 0
    let tick = 0
    let visible = true
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
    if (ref.current) io.observe(ref.current)

    const commit = () => {
      if (visible && !document.hidden) {
        const recent = Math.random() < 0.7
        const w = recent ? weekCount - 1 - Math.floor(Math.random() * 3) : Math.floor(Math.random() * weekCount)
        const d = Math.floor(Math.random() * 7)
        tick += 1
        setGrid(g => {
          const next = g.map(week => [...week])
          next[w][d] = Math.min(next[w][d] + 1, 4)
          // de vez em quando um dia antigo esfria, para o gráfico não saturar
          if (Math.random() < 0.45) {
            const ow = Math.floor(Math.random() * (weekCount - 3))
            const od = Math.floor(Math.random() * 7)
            next[ow][od] = Math.max(next[ow][od] - 1, 0)
          }
          return next
        })
        setFlash({ w, d, tick })
      }
      timer = setTimeout(commit, 500 + Math.random() * 900)
    }
    timer = setTimeout(commit, 1200)
    return () => { clearTimeout(timer); io.disconnect() }
  }, [weekCount])

  return (
    <div ref={ref} className="w-full overflow-visible">
      <div className="flex items-center justify-between mb-2">
        <span className="flex items-center gap-1.5 text-[10px] text-gray-500 uppercase tracking-widest">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
          </span>
          GitHub
        </span>
        <span className="text-[10px] text-gray-500">{totalCommits} commits</span>
      </div>
      <div className="flex" style={{ gap: `${gap}px` }}>
        {grid.map((week, wi) => (
          <div key={wi} className="flex flex-col flex-shrink-0" style={{ gap: `${gap}px` }}>
            {week.map((level, di) => {
              const flashing = flash && flash.w === wi && flash.d === di
              return (
                <div
                  // a chave muda a cada commit no mesmo quadradinho para a animação recomeçar
                  key={flashing ? `${di}-${flash.tick}` : di}
                  className={`rounded-sm flex-shrink-0 ${flashing ? 'commit-pop' : ''}`}
                  style={{
                    width: `${cellSize}px`,
                    height: `${cellSize}px`,
                    backgroundColor: getColor(level),
                    transition: 'background-color 0.8s ease',
                  }}
                />
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
