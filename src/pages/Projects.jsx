import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import HexBackground from '../components/HexBackground'

const projects = [
  {
    id: 1,
    name: 'ClinicHub',
    description: 'Sistema completo de gestão de clínica médica com autenticação, agendamentos, prontuários e relatórios. Deploy em produção com Vercel.',
    longDesc: 'Aplicação full stack com React no frontend e Node.js + Prisma + PostgreSQL no backend. Conta com autenticação JWT, painel administrativo, CRUD de pacientes e relatórios.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Prisma', 'Tailwind'],
    url: 'https://clinichub-rouge.vercel.app',
    stars: 2,
    forks: 0,
    lang: 'TypeScript',
    langColor: '#3178C6',
    date: '20 de mai. de 2026',
    featured: true,
  },
  {
    id: 2,
    name: 'iGreen Performance',
    description: 'Sistema de gestão e monitoramento de performance com dashboards interativos e análise de indicadores em tempo real.',
    longDesc: 'Aplicação JavaScript focada em visualização de métricas e indicadores de performance. Interface limpa com foco em usabilidade.',
    tech: ['JavaScript', 'HTML', 'CSS', 'Chart.js'],
    url: 'https://github.com/mikaellobatodiass-hue',
    stars: 1,
    forks: 0,
    lang: 'JavaScript',
    langColor: '#F7DF1E',
    date: '20 de mai. de 2026',
    featured: false,
  },
  {
    id: 3,
    name: 'FinFlow Dashboard',
    description: 'Dashboard financeiro com acompanhamento de despesas, receitas, gráficos e exportação de relatórios em PDF.',
    longDesc: 'Painel financeiro desenvolvido em TypeScript com visualizações dinâmicas e persistência de dados localmente.',
    tech: ['TypeScript', 'React', 'Recharts', 'Tailwind'],
    url: 'https://github.com/mikaellobatodiass-hue',
    stars: 1,
    forks: 0,
    lang: 'TypeScript',
    langColor: '#3178C6',
    date: '18 de mai. de 2026',
    featured: false,
  },
]

function TechBadge({ name, isDark }) {
  return (
    <span className={`text-xs px-2 py-1 rounded-md font-mono ${isDark ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
      {name}
    </span>
  )
}

export default function Projects() {
  const { isDark } = useTheme()

  return (
    <div className={`min-h-screen pt-16 ${isDark ? 'bg-[#0a0a0a]' : 'bg-gray-50'}`}>
      {/* ── Header ── */}
      <section className={`py-16 border-b ${isDark ? 'border-white/5' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className={`text-4xl font-black mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Projetos Open Source
            </h1>
            <p className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Uma seleção dos meus repositórios — experimentos, ferramentas e aplicações prontas para produção.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Project cards ── */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Featured project */}
          {projects.filter(p => p.featured).map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`rounded-2xl border mb-8 overflow-hidden ${isDark ? 'bg-[#111] border-white/8' : 'bg-white border-gray-200 shadow-sm'}`}
            >
              <div className="grid lg:grid-cols-2">
                {/* Project info */}
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${isDark ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-blue-50 text-blue-600 border border-blue-200'}`}>
                      Em produção
                    </span>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`ml-auto p-1 rounded transition-colors ${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-900'}`}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                      </svg>
                    </a>
                  </div>

                  <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {project.name}
                  </h2>
                  <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {project.longDesc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map(t => (
                      <TechBadge key={t} name={t} isDark={isDark} />
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: project.langColor }} />
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{project.lang}</span>
                    </div>
                    <div className={`flex items-center gap-1 text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      {project.stars}
                    </div>
                    <span className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>{project.date}</span>
                  </div>
                </div>

                {/* Right: mock preview */}
                <div className={`flex items-center justify-center p-8 ${isDark ? 'bg-[#0d1117]' : 'bg-gray-50'}`}>
                  <div className={`w-full max-w-xs rounded-xl border p-4 ${isDark ? 'bg-[#111] border-white/10' : 'bg-white border-gray-200 shadow'}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className={`text-xs font-mono ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        clinichub.vercel.app
                      </span>
                    </div>
                    <div className={`h-2 rounded mb-2 ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} style={{ width: '70%' }} />
                    <div className={`h-2 rounded mb-2 ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} style={{ width: '90%' }} />
                    <div className={`h-2 rounded mb-4 ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} style={{ width: '55%' }} />
                    <div className="grid grid-cols-3 gap-2">
                      {['Pacientes', 'Agenda', 'Relatórios'].map(label => (
                        <div key={label} className={`rounded-lg p-2 text-center ${isDark ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'}`}>
                          <div className={`text-[9px] ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{label}</div>
                        </div>
                      ))}
                    </div>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 w-full block text-center text-xs py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    >
                      Acessar projeto →
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Other projects */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.filter(p => !p.featured).map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-xl border p-6 flex flex-col ${isDark ? 'bg-[#111] border-white/8 hover:border-white/15' : 'bg-white border-gray-200 shadow-sm hover:shadow-md'} transition-all duration-200`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <path d="M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                      <path d="M8 10h8M8 14h5" />
                    </svg>
                  </div>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-1 rounded transition-colors ${isDark ? 'text-gray-600 hover:text-white' : 'text-gray-400 hover:text-gray-900'}`}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                  </a>
                </div>

                <h3 className={`font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {project.name}
                </h3>
                <p className={`text-sm leading-relaxed flex-1 mb-4 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.slice(0, 3).map(t => (
                    <TechBadge key={t} name={t} isDark={isDark} />
                  ))}
                </div>

                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: project.langColor }} />
                    <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{project.lang}</span>
                  </div>
                  <div className={`flex items-center gap-1 text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    {project.stars}
                  </div>
                  <span className={`text-xs ml-auto ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>{project.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GitHub CTA ── */}
      <section className={`relative py-20 overflow-hidden ${isDark ? 'bg-[#0d0d0d]' : 'bg-gray-100'}`}>
        <HexBackground />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className={`text-4xl font-black mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Quer ver mais do
                <br />
                meu trabalho?
                <br />
                <span className={isDark ? 'text-gray-600' : 'text-gray-400'}>
                  Confira meu
                </span>
                <br />
                <span className="gradient-text">GitHub.</span>
              </h2>
              <p className={`text-sm mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Repositórios públicos com{' '}
                <span className="text-blue-500">projetos pessoais</span>,{' '}
                <span className="text-cyan-400">contribuições open source</span>{' '}
                e experimentos técnicos.
              </p>
              <a
                href="https://github.com/mikaellobatodiass-hue"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                Explore meu GitHub
              </a>
            </motion.div>

            {/* GitHub avatar illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex justify-center"
            >
              <div className={`rounded-2xl border p-8 w-full max-w-sm ${isDark ? 'bg-[#111] border-white/8' : 'bg-white border-gray-200 shadow-sm'}`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg">
                    M
                  </div>
                  <div>
                    <div className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>mikaellobatodiass-hue</div>
                    <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>github.com</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: 'Repos', value: '12+' },
                    { label: 'Stars', value: '4+' },
                    { label: 'Commits', value: '300+' },
                  ].map(stat => (
                    <div key={stat.label} className={`rounded-lg p-3 text-center ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                      <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.value}</div>
                      <div className={`text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className={`text-xs text-center ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                  Uberlândia, MG · Brasil
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
