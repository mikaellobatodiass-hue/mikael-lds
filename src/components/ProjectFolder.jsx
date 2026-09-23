import { useState } from 'react'
import { motion } from 'framer-motion'

// Pasta de projetos: ao passar o mouse a frente da pasta abre e os projetos
// saem em leque por cima; cada projeto dá zoom no hover e abre o repositório no clique.
// curva suave: sai rápido e chega devagar, sem quicar
const EASE = { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
const MAX_CARDS = 5

const initials = title =>
  title
    .split(/[\s:—-]+/)
    .filter(w => w.length > 2)
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase()

// Capinha gerada para cada projeto (os repositórios não têm imagem própria)
function Cover({ project, colors, langColor }) {
  return (
    <div
      className="relative w-[78px] h-[106px] rounded-xl overflow-hidden border border-white/20 shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
      style={{
        background: `radial-gradient(circle at 30% 18%, ${langColor(project.lang)}, transparent 62%), linear-gradient(160deg, ${colors.to}, #0b0b0b 95%)`,
      }}
    >
      <div className="absolute inset-0 hex-pattern opacity-80" />
      <div className="absolute top-1.5 left-2 text-[7px] font-mono uppercase tracking-wider text-white/70">{project.lang}</div>
      <div className="absolute inset-0 flex items-center justify-center text-2xl font-black text-white/90 drop-shadow">
        {initials(project.title)}
      </div>
      <div className="absolute inset-x-0 bottom-0 px-1.5 pb-1.5 pt-4 bg-gradient-to-t from-black/80 to-transparent">
        <div className="text-[8px] font-extrabold uppercase leading-tight text-white line-clamp-2">{project.title}</div>
      </div>
    </div>
  )
}

export default function ProjectFolder({ name, colors, projects, isDark, langColor, onSelect }) {
  const [open, setOpen] = useState(false)
  const shown = projects.slice(0, MAX_CARDS)
  const mid = (shown.length - 1) / 2

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={`Ver projetos de ${name}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onClick={onSelect}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onSelect()}
      animate={{ y: open ? -4 : 0, rotate: open ? -0.8 : 0 }}
      transition={EASE}
      className={`relative h-[330px] rounded-2xl border cursor-pointer select-none outline-none ${
        isDark ? 'bg-[#141414] border-white/10' : 'bg-white border-gray-200 shadow-sm'
      }`}
    >
      {/* brilho da cor da pasta subindo pelo card */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ background: `linear-gradient(to top, ${colors.glow}, transparent 75%)` }}
        initial={false}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />

      {/* pasta */}
      <div className="absolute left-1/2 top-[74px] -translate-x-1/2 w-[168px] h-[124px]" style={{ perspective: 700 }}>
        {/* aba e fundo */}
        <div className="absolute left-4 top-0 w-16 h-7 rounded-t-lg" style={{ background: colors.tab }} />
        <div className="absolute inset-x-0 top-4 bottom-0 rounded-xl" style={{ background: colors.tab }} />

        {/* projetos em leque */}
        {shown.map((project, i) => {
          const off = i - mid
          return (
            <motion.a
              key={project.id}
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              title={project.title}
              onClick={e => e.stopPropagation()}
              className="absolute left-1/2 top-5 -ml-[39px] origin-bottom"
              style={{ zIndex: 10 + i, pointerEvents: open ? 'auto' : 'none' }}
              initial={false}
              animate={
                open
                  ? { x: off * 48, y: -90 + Math.abs(off) * 11, rotate: off * 9, scale: 1, opacity: 1 }
                  : { x: 0, y: 14, rotate: 0, scale: 0.7, opacity: 0 }
              }
              whileHover={{ scale: 1.16, rotate: 0, y: -106, zIndex: 50, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
              transition={{ ...EASE, delay: open ? i * 0.06 : (shown.length - 1 - i) * 0.03 }}
            >
              <Cover project={project} colors={colors} langColor={langColor} />
            </motion.a>
          )
        })}

        {/* frente da pasta: abre para baixo no hover */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-[104px] rounded-xl border border-white/25 origin-bottom"
          style={{
            zIndex: 30,
            background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35)',
          }}
          initial={false}
          animate={{ rotateX: open ? -34 : 0, y: open ? 6 : 0 }}
          transition={EASE}
        />
      </div>

      {/* texto */}
      <div className="absolute inset-x-0 bottom-7 text-center">
        <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{name}</div>
        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {projects.length} {projects.length === 1 ? 'projeto' : 'projetos'}
        </div>
        <motion.div
          className={`mt-2 text-[11px] font-semibold tracking-[0.2em] uppercase ${isDark ? 'text-gray-600' : 'text-gray-400'}`}
          initial={false}
          animate={{ opacity: open ? 0 : 1 }}
          transition={{ duration: 0.4 }}
        >
          Passe o mouse
        </motion.div>
      </div>
    </motion.div>
  )
}
