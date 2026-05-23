const techs = [
  { name: 'Python', color: '#3776AB' },
  { name: 'React', color: '#61DAFB' },
  { name: 'Node.js', color: '#339933' },
  { name: 'PostgreSQL', color: '#4169E1' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'Git', color: '#F05032' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'JavaScript', color: '#F7DF1E' },
  { name: 'Tailwind', color: '#06B6D4' },
  { name: 'Vite', color: '#646CFF' },
  { name: 'Prisma', color: '#2D3748' },
  { name: 'REST API', color: '#6B7280' },
]

function TechPill({ name, color }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 whitespace-nowrap">
      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
      <span className="text-sm text-gray-300 font-medium">{name}</span>
    </div>
  )
}

export default function TechScroll() {
  const doubled = [...techs, ...techs]

  return (
    <div className="relative overflow-hidden py-2">
      <div
        className="flex gap-3"
        style={{
          animation: 'scroll 30s linear infinite',
          width: 'max-content',
        }}
      >
        {doubled.map((t, i) => (
          <TechPill key={i} name={t.name} color={t.color} />
        ))}
      </div>

      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none z-10" />
    </div>
  )
}
