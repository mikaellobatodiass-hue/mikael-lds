const BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons'

const techs = [
  { name: 'Python',      icon: `${BASE}/python/python-original.svg` },
  { name: 'React',       icon: `${BASE}/react/react-original.svg` },
  { name: 'Node.js',     icon: `${BASE}/nodejs/nodejs-original.svg` },
  { name: 'PostgreSQL',  icon: `${BASE}/postgresql/postgresql-original.svg` },
  { name: 'Docker',      icon: `${BASE}/docker/docker-original.svg` },
  { name: 'Git',         icon: `${BASE}/git/git-original.svg` },
  { name: 'JavaScript',  icon: `${BASE}/javascript/javascript-original.svg` },
  { name: 'TypeScript',  icon: `${BASE}/typescript/typescript-original.svg` },
  { name: 'Tailwind',    icon: `${BASE}/tailwindcss/tailwindcss-original.svg` },
  { name: 'Vite',        icon: `${BASE}/vite/vite-original.svg` },
  { name: 'Prisma',      icon: `${BASE}/prisma/prisma-original.svg`, invert: true },
]

function TechPill({ name, icon, invert }) {
  return (
    <div className="flex flex-col items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/8 whitespace-nowrap min-w-[72px] hover:bg-white/10 transition-colors duration-200">
      <img
        src={icon}
        alt={name}
        width={28}
        height={28}
        className={`w-7 h-7 object-contain ${invert ? 'invert brightness-90' : ''}`}
        loading="lazy"
      />
      <span className="text-[11px] text-gray-400 font-medium">{name}</span>
    </div>
  )
}

export default function TechScroll() {
  const doubled = [...techs, ...techs]

  return (
    <div className="relative overflow-hidden py-1">
      <div
        className="flex gap-3"
        style={{ animation: 'scroll 35s linear infinite', width: 'max-content' }}
      >
        {doubled.map((t, i) => (
          <TechPill key={i} name={t.name} icon={t.icon} invert={t.invert} />
        ))}
      </div>

      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0d0d0d] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0d0d0d] to-transparent pointer-events-none z-10" />
    </div>
  )
}
