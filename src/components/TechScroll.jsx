const BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons'

const techs = [
  { name: 'Python',      icon: `${BASE}/python/python-original.svg`,         url: 'https://python.org' },
  { name: 'React',       icon: `${BASE}/react/react-original.svg`,            url: 'https://react.dev' },
  { name: 'Node.js',     icon: `${BASE}/nodejs/nodejs-original.svg`,          url: 'https://nodejs.org' },
  { name: 'PostgreSQL',  icon: `${BASE}/postgresql/postgresql-original.svg`,  url: 'https://postgresql.org' },
  { name: 'Docker',      icon: `${BASE}/docker/docker-original.svg`,          url: 'https://docker.com' },
  { name: 'Git',         icon: `${BASE}/git/git-original.svg`,                url: 'https://git-scm.com' },
  { name: 'JavaScript',  icon: `${BASE}/javascript/javascript-original.svg`,  url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript' },
  { name: 'TypeScript',  icon: `${BASE}/typescript/typescript-original.svg`,  url: 'https://typescriptlang.org' },
  { name: 'Tailwind',    icon: `${BASE}/tailwindcss/tailwindcss-original.svg`,url: 'https://tailwindcss.com' },
  { name: 'Vite',        icon: `${BASE}/vite/vite-original.svg`,              url: 'https://vitejs.dev' },
  { name: 'Prisma',      icon: `${BASE}/prisma/prisma-original.svg`,          url: 'https://prisma.io', invert: true },
]

function TechItem({ name, icon, url, invert, index }) {
  const delay = (index % techs.length) * 0.3

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      title={name}
      className="flex flex-col items-center gap-2 px-6 whitespace-nowrap group cursor-pointer"
      style={{ animation: `techFloat 3s ease-in-out ${delay}s infinite` }}
    >
      <img
        src={icon}
        alt={name}
        width={32}
        height={32}
        className={`w-8 h-8 object-contain drop-shadow-sm transition-all duration-200
          group-hover:scale-125 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]
          ${invert ? 'invert brightness-90' : ''}`}
        loading="lazy"
      />
      <span className="text-[11px] text-gray-500 font-medium transition-colors duration-200 group-hover:text-gray-300">
        {name}
      </span>
    </a>
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
            <TechItem key={i} index={i} name={t.name} icon={t.icon} url={t.url} invert={t.invert} />
          ))}
        </div>

        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0d0d0d] to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0d0d0d] to-transparent pointer-events-none z-10" />
      </div>
    </>
  )
}
