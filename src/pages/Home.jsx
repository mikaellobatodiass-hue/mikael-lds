import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { EASE } from '../lib/motion'
import HexBackground from '../components/HexBackground'
import Avatar3D from '../components/Avatar3D'
import HexLightning from '../components/HexLightning'
import FloatingDock from '../components/FloatingDock'
import ContribGraph from '../components/ContribGraph'
import TechScroll from '../components/TechScroll'

const BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons'

const stack = [
  { name: 'Python',     icon: `${BASE}/python/python-original.svg` },
  { name: 'React',      icon: `${BASE}/react/react-original.svg` },
  { name: 'Node.js',    icon: `${BASE}/nodejs/nodejs-original.svg` },
  { name: 'PostgreSQL', icon: `${BASE}/postgresql/postgresql-original.svg` },
]

// Cards da direita com borda verde brilhante (tema escuro)
const cardDark = 'bg-[#0b0f0c]/90 backdrop-blur border-green-500/50 shadow-[0_0_18px_rgba(34,197,94,0.25),inset_0_0_12px_rgba(34,197,94,0.06)]'

// Ícones de contorno para o dock de redes sociais
const DockSvg = ({ children }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    {children}
  </svg>
)

const socials = [
  {
    title: 'GitHub',
    href: 'https://github.com/mikaellobatodiass-hue',
    icon: <DockSvg><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" /></DockSvg>,
  },
  {
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mikael-dias',
    icon: <DockSvg><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 11v5M8 8v.01M12 16v-5M16 16v-3a2 2 0 0 0-4 0" /></DockSvg>,
  },
  {
    title: 'Instagram',
    href: 'https://instagram.com/mikael_lds',
    icon: <DockSvg><rect x="4" y="4" width="16" height="16" rx="4" /><circle cx="12" cy="12" r="3" /><path d="M16.5 7.5v.01" /></DockSvg>,
  },
  {
    title: 'WhatsApp',
    href: 'https://wa.me/5589981089633',
    icon: <DockSvg><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" /><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" /></DockSvg>,
  },
]

export default function Home() {
  const { isDark } = useTheme()

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0a0a0a]' : 'bg-gray-50'}`}>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <HexBackground />
        <HexLightning />

        {/* Subtle radial glow */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-green-600/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />

        {/* ── 3-column grid: text | avatar card | sidebar cards ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px_160px] gap-6 items-center">

            {/* Col 1 — text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="flex flex-col justify-center min-h-[420px]"
            >
              {/* Available badges */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                  </span>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    disponível para oportunidades
                  </span>
                </div>

                <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/30 rounded-full px-3 py-1 text-xs text-green-400 font-mono whitespace-nowrap">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  Disponível para projetos
                </div>
              </div>

              <h1 className={`text-5xl xl:text-6xl font-black leading-[1.05] mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Soluções em
                <br />
                <span className="gradient-text">Python & React,</span>
                <br />
                <span className={`font-light ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  Dados ao Deploy.
                </span>
              </h1>

              <p className={`text-base leading-relaxed max-w-sm mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Transformo requisitos em software de alto desempenho. Desenvolvedor especializado em
                automação, análise de dados e aplicações web modernas.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com/mikaellobatodiass-hue"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  Ver Projetos no GitHub
                </a>
                <Link to="/contato" className="btn-secondary text-sm">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                  Entre em Contato
                </Link>
              </div>

              {/* Redes sociais (dock que cresce com o mouse) */}
              <div className="mt-16">
                <FloatingDock items={socials} />
              </div>
            </motion.div>

            {/* Col 2 — Avatar card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              className="relative"
              style={{ padding: 0, margin: 0, background: 'none', border: 'none' }}
            >
              <Avatar3D />
            </motion.div>

            {/* Col 3 — Sidebar: Stack + GitHub + Background */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
              className="flex flex-col gap-3"
            >
              {/* Stack card */}
              <div className={`rounded-xl p-3 border ${isDark ? cardDark : 'bg-white border-gray-200 shadow-sm'}`}>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-2.5">Stack</div>
                <div className="grid grid-cols-2 gap-2">
                  {stack.map(tech => (
                    <div
                      key={tech.name}
                      className={`rounded-lg p-2 flex flex-col items-center gap-1.5 ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}
                      title={tech.name}
                    >
                      <img
                        src={tech.icon}
                        alt={tech.name}
                        className="w-6 h-6 object-contain"
                        loading="lazy"
                      />
                      <span className="text-[9px] text-gray-500 text-center leading-tight">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* GitHub contrib */}
              <div className={`rounded-xl p-3 border ${isDark ? cardDark : 'bg-white border-gray-200 shadow-sm'}`}>
                <ContribGraph totalCommits={312} weekCount={13} cellSize={7} gap={2} />
              </div>

              {/* Background card */}
              <div className={`rounded-xl p-3 border ${isDark ? cardDark : 'bg-white border-gray-200 shadow-sm'}`}>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-2.5">Background</div>
                <div className="flex flex-col gap-2.5">
                  {[
                    { label: 'Análise de Sistemas', time: 'ADS' },
                    { label: 'Automação & Dados', time: 'NOW' },
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between gap-2">
                      <span className={`text-[10px] leading-tight ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {item.label}
                      </span>
                      <span className={`text-[10px] font-mono flex-shrink-0 ${item.time === 'NOW' ? 'text-green-500' : 'text-gray-500'}`}>
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Tech scroll ── */}
      <div className={`border-y ${isDark ? 'border-white/5 bg-[#0d0d0d]' : 'border-gray-200 bg-gray-100'} py-4`}>
        <TechScroll />
      </div>

      {/* ── CTA Section ── */}
      <section className={`relative py-24 overflow-hidden ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
        <HexBackground />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text side */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <h2 className={`text-4xl sm:text-5xl font-black mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Vamos Construir
                <br />
                algo Incrível?
              </h2>
              <p className={`text-lg font-light mb-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                Performance, automação
              </p>
              <p className={`text-lg font-light mb-8 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                e dados de alto nível.
              </p>
              <p className={`text-base mb-8 max-w-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Desenvolvimento focado em{' '}
                <span className="text-green-500 font-medium">produto</span>,
                performance e experiência do{' '}
                <span className="text-emerald-400 font-medium">usuário</span>.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/sobre" className="btn-primary">
                  Saiba mais →
                </Link>
                <Link to="/contato" className="btn-secondary">
                  Fale comigo
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M8 12h8M12 8l4 4-4 4" />
                  </svg>
                </Link>
              </div>
            </motion.div>

            {/* Right card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
              className={`rounded-2xl overflow-hidden border relative ${isDark ? 'border-white/10 bg-[#111]' : 'border-gray-200 bg-gray-50 shadow-sm'}`}
            >
              {/* Mock screen */}
              <div className={`aspect-video relative overflow-hidden ${isDark ? 'bg-[#0d1117]' : 'bg-gray-900'}`}>
                {/* Fake IDE */}
                <div className="p-4">
                  <div className="flex gap-1.5 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="font-mono text-xs space-y-1">
                    <div><span className="text-purple-400">const</span> <span className="text-blue-400">mikael</span> <span className="text-white">= {'{'}</span></div>
                    <div className="pl-4"><span className="text-green-400">role</span><span className="text-white">:</span> <span className="text-orange-300">'Desenvolvedor'</span><span className="text-white">,</span></div>
                    <div className="pl-4"><span className="text-green-400">focus</span><span className="text-white">:</span> <span className="text-orange-300">'Automação & Dados'</span><span className="text-white">,</span></div>
                    <div className="pl-4"><span className="text-green-400">stack</span><span className="text-white">: [</span><span className="text-orange-300">'Python'</span><span className="text-white">, </span><span className="text-orange-300">'React'</span><span className="text-white">, </span><span className="text-orange-300">'Node'</span><span className="text-white">],</span></div>
                    <div className="pl-4"><span className="text-green-400">available</span><span className="text-white">:</span> <span className="text-blue-400">true</span></div>
                    <div><span className="text-white">{'}'}</span></div>
                  </div>
                </div>
              </div>

              {/* Card footer */}
              <div className="p-4">
                <div className={`text-sm font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Portfólio Minimalista Web
                </div>
                <div className={`text-xs mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Portfólio desenvolvido em React e Tailwind CSS, focado em alta performance e design responsivo.
                </div>
                <div className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                  {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
