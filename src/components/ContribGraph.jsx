import { useMemo } from 'react'

function getColor(level) {
  const colors = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
  return colors[Math.min(level, 4)]
}

export default function ContribGraph({ totalCommits = 312, weekCount = 26, cellSize = 10, gap = 3 }) {
  const grid = useMemo(() => {
    const g = []
    for (let w = 0; w < weekCount; w++) {
      const week = []
      for (let d = 0; d < 7; d++) {
        const rand = Math.random()
        let level = 0
        if (rand > 0.6) level = 1
        if (rand > 0.75) level = 2
        if (rand > 0.88) level = 3
        if (rand > 0.96) level = 4
        week.push(level)
      }
      g.push(week)
    }
    return g
  }, [weekCount])

  return (
    <div className="w-full overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] text-gray-500 uppercase tracking-widest">GitHub</span>
        <span className="text-[10px] text-gray-500">{totalCommits} commits</span>
      </div>
      <div className="flex" style={{ gap: `${gap}px` }}>
        {grid.map((week, wi) => (
          <div key={wi} className="flex flex-col flex-shrink-0" style={{ gap: `${gap}px` }}>
            {week.map((level, di) => (
              <div
                key={di}
                className="rounded-sm flex-shrink-0"
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  backgroundColor: getColor(level),
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
