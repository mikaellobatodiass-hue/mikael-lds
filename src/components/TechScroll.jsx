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

function TechItem({ name, icon, invert, index }) {
  const delay = (index % techs.length) * 0.3

  return (
    <div
      className="flex flex-col items-center gap-2 px-6 whitespace-nowrap"
      style={{
        animation: `techFloat 3s ease-in-out ${delay}s infinite`,
      }}
    >
      <img
        src={icon}
        alt={name}
        width={32}
        height={32}
        className={`w-8 h-8 object-contain drop-shadow-sm ${invert ? 'invert brightness-90' : ''}`}
        loading="lazy"
      />
      <span className="text-[11px] text-gray-500 font-medium">{name}</span>
    </div>
  )
}

export default function TechScroll() {
  const doubled = [...techs, ...techs]

  return (
    <>
      <style>{`
        @keyframes techFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
      `}</style>

      <div className="relative overflow-hidden py-3">
        <div
          className="flex items-end"
          style={{ animation: 'scroll 35s linear infinite', width: 'max-content' }}
        >
          {doubled.map((t, i) => (
            <TechItem key={i} index={i} name={t.name} icon={t.icon} invert={t.invert} />
          ))}
        </div>

        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0d0d0d] to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0d0d0d] to-transparent pointer-events-none z-10" />
      </div>
    </>
  )
}
