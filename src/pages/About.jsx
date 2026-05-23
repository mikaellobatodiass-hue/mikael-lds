import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import HexBackground from '../components/HexBackground'
import { Link } from 'react-router-dom'

const timeline = [
  {
    id: 1,
    era: 'Início da Minha Jornada',
    title: 'Fundamentos Técnicos — Análise e Desenvolvimento de Sistemas',
    body: 'Iniciei minha formação em ADS com foco em programação orientada a objetos, banco de dados relacional e desenvolvimento web. Desde o início, a automação e a análise de dados chamaram minha atenção como ferramentas poderosas para resolver problemas reais.',
    detail: 'Essa base acadêmica moldou meu pensamento sistêmico. Percebi que tecnologia e dados compartilham o mesmo DNA: transformar informação em decisões melhores.',
    period: '2023 – presente',
    highlight: false,
  },
  {
    id: 2,
    era: 'Primeiro Projeto Real',
    title: 'ClinicHub — Sistema de Gestão de Clínica Médica',
    body: 'Desenvolvi um sistema completo de gestão de clínica com autenticação, CRUD de pacientes, agendamentos e relatórios. Utilizei React no frontend, Node.js + Prisma no backend e PostgreSQL como banco de dados.',
    detail: 'O projeto está em produção no Vercel e foi o primeiro desafio real de deploy, segurança e performance end-to-end.',
    period: '2024',
    highlight: true,
  },
  {
    id: 3,
    era: 'Expansão em Automação',
    title: 'Python para Automação e Análise de Dados',
    body: 'Aprofundei meus estudos em Python com foco em automação de tarefas, web scraping, análise de dados com Pandas e criação de dashboards. Desenvolvi scripts que reduziram tarefas manuais em projetos pessoais.',
    detail: 'A combinação Python + dados abriu portas para pensar em soluções que vão além do front-end — impactando processos inteiros.',
    period: '2024 – presente',
    highlight: false,
  },
  {
    id: 4,
    era: 'Engenharia de Software',
    title: 'Full Stack com TypeScript e Infraestrutura',
    body: 'Evoluí para TypeScript para maior robustez e comecei a trabalhar com Docker, variáveis de ambiente e boas práticas de DevOps. Criei o FinFlow Dashboard, um painel financeiro com dados em tempo real.',
    detail: 'Aqui entendi que escrever código é só uma parte — manter, monitorar e evoluir software são igualmente essenciais.',
    period: '2025',
    highlight: false,
  },
]

const skills = [
  { name: 'Python', level: 80, color: '#3776AB' },
  { name: 'React', level: 85, color: '#61DAFB' },
  { name: 'Node.js', level: 75, color: '#339933' },
  { name: 'PostgreSQL', level: 70, color: '#4169E1' },
  { name: 'TypeScript', level: 70, color: '#3178C6' },
  { name: 'Docker', level: 60, color: '#2496ED' },
  { name: 'Git', level: 85, color: '#F05032' },
  { name: 'Tailwind CSS', level: 90, color: '#06B6D4' },
]

export default function About() {
  const { isDark } = useTheme()

  return (
    <div className={`min-h-screen pt-16 ${isDark ? 'bg-[#0a0a0a]' : 'bg-gray-50'}`}>
      {/* ── Header ── */}
      <section className={`relative py-20 border-b ${isDark ? 'border-white/5' : 'border-gray-200'}`}>
        <HexBackground />
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className={`text-5xl font-black mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Quer ver o que eu
              <br />
              posso fazer por
              <br />
              <span className={isDark ? 'text-gray-600' : 'text-gray-400'}>você?</span>
              {' '}
              <span className="gradient-text">Confira
              <br />
              meu portfólio.</span>
            </h1>
            <p className={`text-base mb-8 max-w-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Desenvolvimento focado em{' '}
              <span className="text-blue-500 font-medium">SEO</span>,
              performance e <span className="text-cyan-400 font-medium">UX</span>,
              Core Web Vitals.
            </p>
            <div className="flex gap-3">
              <Link to="/projetos" className="btn-primary">
                Veja os meus projetos →
              </Link>
              <Link to="/contato" className="btn-secondary">
                Fale comigo
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* Right image card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`rounded-2xl overflow-hidden border relative ${isDark ? 'border-white/8 bg-[#111]' : 'border-gray-200 bg-white shadow-sm'}`}
          >
            <div className={`h-48 flex items-center justify-center ${isDark ? 'bg-gradient-to-br from-blue-950 to-[#111]' : 'bg-gradient-to-br from-blue-50 to-gray-100'}`}>
              <svg viewBox="0 0 200 120" className="w-full h-full opacity-80">
                {/* Simplified logistics/tech illustration */}
                <rect x="10" y="20" width="80" height="80" rx="8" fill="#1e3a5f" opacity="0.8"/>
                <text x="30" y="55" fontSize="22" fill="#60a5fa">📦</text>
                <text x="25" y="85" fontSize="10" fill="#93c5fd" fontFamily="monospace">LOGISTICS</text>
                <path d="M95 60 L115 60" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)"/>
                <rect x="118" y="20" width="72" height="80" rx="8" fill="#1e3a5f" opacity="0.8"/>
                <text x="132" y="55" fontSize="16" fill="#60a5fa">💻</text>
                <text x="122" y="75" fontSize="8" fill="#93c5fd" fontFamily="monospace">SOFTWARE</text>
                <text x="122" y="87" fontSize="8" fill="#93c5fd" fontFamily="monospace">ENGINEERING</text>
              </svg>
            </div>
            <div className="p-4">
              <div className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Entregas de alta qualidade
              </div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Focado em performance, SEO e experiência do usuário.
              </div>
              <div className={`text-xs mt-2 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Career Timeline ── */}
      <section className={`py-20 ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 max-w-2xl"
          >
            <h2 className={`text-4xl font-black mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              De Estudante de ADS
              <br />
              a <span className="gradient-text">Engenheiro de Software</span>
            </h2>
            <p className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Uma jornada detalhada através das minhas principais experiências e projetos, destacando marcos
              significativos, habilidades adquiridas e contribuições valiosas que moldaram minha carreira.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-[280px_1fr] gap-16">
            {/* Timeline list */}
            <div className="flex flex-col gap-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex flex-col items-center">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${item.highlight ? 'bg-blue-500' : isDark ? 'bg-gray-600' : 'bg-gray-300'}`} />
                    {i < timeline.length - 1 && (
                      <div className={`w-px flex-1 mt-2 ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />
                    )}
                  </div>
                  <div>
                    <div className={`font-bold text-sm mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {item.era}
                    </div>
                    <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      {item.period}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Timeline details */}
            <div className="flex flex-col gap-12">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {item.title}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {item.body}
                  </p>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    {item.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section className={`py-20 relative ${isDark ? 'bg-[#0d0d0d]' : 'bg-gray-50'}`}>
        <HexBackground />
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className={`text-3xl font-black mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Habilidades Técnicas
            </h2>
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              Tecnologias que uso no dia a dia
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="flex justify-between mb-2">
                  <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {skill.name}
                  </span>
                  <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    {skill.level}%
                  </span>
                </div>
                <div className={`h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-white/5' : 'bg-gray-200'}`}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: skill.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.05, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
