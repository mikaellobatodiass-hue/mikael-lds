import { useMemo } from 'react'

function getColor(level) {
  const colors = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
  return colors[Math.min(level, 4)]
}

export default function ContribGraph({ totalCommits = 312 }) {
  const weeks = 26
  const days = 7

  const grid = useMemo(() => {
    const g = []
    for (let w = 0; w < weeks; w++) {
      const week = []
      for (let d = 0; d < days; d++) {
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
  }, [])

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-500 uppercase tracking-widest">GitHub</span>
        <span className="text-xs text-gray-500">{totalCommits} commits</span>
      </div>
      <div className="flex gap-[3px]">
        {grid.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((level, di) => (
              <div
                key={di}
                className="w-[10px] h-[10px] rounded-sm"
                style={{ backgroundColor: getColor(level) }}
                title={`Level ${level}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
