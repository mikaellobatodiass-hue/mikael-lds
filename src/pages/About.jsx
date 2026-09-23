import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { EASE } from '../lib/motion'
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
            transition={{ duration: 0.8, ease: EASE }}
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
              <span className="text-green-500 font-medium">SEO</span>,
              performance e <span className="text-emerald-400 font-medium">UX</span>,
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

          {/* Card com foto e dados do perfil */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className={`rounded-2xl overflow-hidden border relative ${isDark ? 'border-white/10 bg-[#0f0f0f]' : 'border-gray-200 bg-white shadow-sm'}`}
          >
            <div className={`relative h-72 overflow-hidden ${isDark ? 'bg-gradient-to-b from-green-950/40 to-transparent' : 'bg-gradient-to-b from-green-50 to-white'}`}>
              <div className={`absolute inset-0 ${isDark ? 'hex-pattern' : 'hex-pattern-light'}`} />
              <div
                className="absolute left-1/2 top-8 -translate-x-1/2 w-80 h-80 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(closest-side, rgba(34,197,94,0.35), transparent)' }}
              />
              <motion.img
                src="/mikael-recorte.png"
                alt="Mikael Dias"
                className="absolute left-1/2 top-6 h-[520px] w-auto max-w-none -translate-x-1/2"
                style={{
                  maskImage: 'linear-gradient(to bottom, #000 42%, transparent 56%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, #000 42%, transparent 56%)',
                }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE, delay: 0.35 }}
              />
              <span className={`absolute top-4 left-4 inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full border backdrop-blur ${isDark ? 'bg-black/40 border-green-500/30 text-green-400' : 'bg-white/80 border-green-200 text-green-700'}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Disponível para oportunidades
              </span>
              <span className={`absolute bottom-5 right-4 text-xs font-mono px-2.5 py-1 rounded-lg border backdrop-blur ${isDark ? 'bg-black/50 border-white/10 text-gray-300' : 'bg-white/80 border-gray-200 text-gray-700'}`}>
                <span className="text-green-400">{'<'}</span>Back-end & Front-end<span className="text-green-400">{' />'}</span>
              </span>
            </div>
            <div className={`p-5 border-t ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
              <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Mikael Dias</div>
              <div className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Desenvolvedor · Python, Node.js & React
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'ADS', label: '3º período' },
                  { value: 'Uberlândia', label: 'MG · Brasil' },
                  { value: '11', label: 'repositórios' },
                ].map(item => (
                  <div key={item.value} className={`rounded-lg px-3 py-2 ${isDark ? 'bg-white/[0.04]' : 'bg-gray-50'}`}>
                    <div className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.value}</div>
                    <div className={`text-[11px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{item.label}</div>
                  </div>
                ))}
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
            viewport={{ once: true, margin: '-60px' }}
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
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex flex-col items-center">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${item.highlight ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.7)]' : isDark ? 'bg-gray-600' : 'bg-gray-300'}`} />
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
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
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
            viewport={{ once: true, margin: '-60px' }}
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
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.05 }}
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
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 1.4, delay: 0.2 + i * 0.06, ease: EASE }}
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
