import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, animate, motion, useInView } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import HexBackground from '../components/HexBackground'
import ProjectFolder from '../components/ProjectFolder'

const GITHUB_USER = 'mikaellobatodiass-hue'
const GITHUB = `https://github.com/${GITHUB_USER}`

const LANG_COLORS = {
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  HTML: '#E34F26',
  CSS: '#663399',
  Python: '#3572A5',
  Docker: '#2496ED',
  Markdown: '#083FA1',
}
const langColor = lang => LANG_COLORS[lang] ?? '#8b949e'

const CATEGORIES = ['Back-end', 'Front-end', 'Full Stack']

// Cores de cada pasta (frente em degradê, aba/fundo e brilho no hover)
const FOLDER_COLORS = {
  'Back-end': { from: '#fdba74', to: '#ea580c', tab: '#c2410c', glow: 'rgba(234,88,12,0.28)' },
  'Front-end': { from: '#7dd3fc', to: '#2563eb', tab: '#1e40af', glow: 'rgba(37,99,235,0.28)' },
  'Full Stack': { from: '#86efac', to: '#16a34a', tab: '#166534', glow: 'rgba(34,197,94,0.28)' },
}

// Textos escritos à mão para cada repositório. Estrelas, datas e repositórios novos
// vêm da API do GitHub; stars/pushedAt aqui só valem se a API não responder.
const CURATED = {
  'igreen-tasks': {
    title: 'iGreen Tasks',
    description: 'Sistema web de gestão de demandas profissionais e acompanhamento de produtividade.',
    longDesc: 'Aplicação full stack em Next.js 15 com autenticação, banco PostgreSQL via Prisma e ambiente em Docker — do cadastro de demandas aos relatórios de produtividade.',
    highlights: [
      'Dashboard com KPIs em tempo real e produtividade semanal',
      'Matriz de Eisenhower com drag & drop nos 4 quadrantes',
      'CRUD de demandas com filtros, busca e controle de horas',
      'Relatórios por período com gráficos e distribuição por categoria',
    ],
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'NextAuth', 'Tailwind', 'shadcn/ui', 'TanStack Query', 'Zod'],
    lang: 'TypeScript',
    category: 'Full Stack',
    featured: true,
    stars: 0,
    pushedAt: '2026-06-01T12:00:00Z',
  },
  'hacker-apresentation': {
    title: 'Dossiê: O Caso Daniel Nascimento',
    description: 'Apresentação em 10 slides sobre o hacker Daniel Nascimento — o ataque à Telemar e a Operação Ponto Com. Animações em CSS puro, layout responsivo e zero dependências.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    lang: 'HTML',
    category: 'Front-end',
    stars: 0,
    pushedAt: '2026-09-22T12:00:00Z',
  },
  'msg-securty': {
    title: 'Msg Security',
    description: 'Chat interno em tempo real organizado por salas: quem entra com o mesmo nome de sala cai na mesma conversa. As mensagens trafegam via MQTT direto no navegador.',
    tech: ['HTML', 'JavaScript', 'MQTT', 'Real-time'],
    lang: 'HTML',
    category: 'Full Stack',
    demo: null, // o deploy na Vercel está fora do ar
    stars: 0,
    pushedAt: '2026-09-09T12:00:00Z',
  },
  'chatbot-mitinho': {
    title: 'Chatbot RAG',
    description: 'Arquitetura de um chatbot corporativo com RAG que responde dúvidas a partir de PDFs privados: ingestão, embeddings, banco vetorial, integração com LLM e governança de dados.',
    tech: ['RAG', 'LLM', 'Embeddings', 'Banco vetorial'],
    lang: 'Markdown',
    category: 'Back-end',
    stars: 0,
    pushedAt: '2026-08-31T12:00:00Z',
  },
  'mikael-lds': {
    title: 'Portfólio Mikaelfiles',
    description: 'Este portfólio: React com Vite e Tailwind, animações com Framer Motion, luz animada em canvas sobre a grade hexagonal e dock de redes sociais estilo macOS.',
    tech: ['React', 'Vite', 'Tailwind', 'Framer Motion'],
    lang: 'JavaScript',
    category: 'Front-end',
    demo: 'https://mikael-lds.vercel.app',
    stars: 1,
    pushedAt: '2026-05-23T12:00:00Z',
  },
  'docker-postgres-guide': {
    title: 'Docker + PostgreSQL Guide',
    description: 'Guia prático para subir um banco PostgreSQL em container, com comando direto ou Docker Compose, volume para persistência e parâmetros explicados.',
    tech: ['Docker', 'Docker Compose', 'PostgreSQL'],
    lang: 'Docker',
    category: 'Back-end',
    stars: 1,
    pushedAt: '2026-05-24T12:00:00Z',
  },
  'mysql-container-db': {
    title: 'MySQL Container DB',
    description: 'Setup reproduzível para subir MySQL 8 em container, centralizando credenciais, portas e persistência de dados para desenvolvimento e testes locais.',
    tech: ['Docker', 'Docker Compose', 'MySQL'],
    lang: 'Docker',
    category: 'Back-end',
    stars: 1,
    pushedAt: '2026-03-03T12:00:00Z',
  },
  'mikaellobatodiass-hue': {
    title: 'README do Perfil',
    description: 'Página de apresentação do meu perfil no GitHub: foco em back-end, stacks, bancos de dados, ferramentas e links de contato.',
    tech: ['Markdown', 'GitHub'],
    lang: 'Markdown',
    category: 'Back-end',
    stars: 1,
    pushedAt: '2026-05-24T12:00:00Z',
  },
  'tela-discord': {
    title: 'Discord Clone',
    description: 'Recriação da página principal do Discord com foco em estrutura semântica, fidelidade ao layout original e interatividade com JavaScript.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    lang: 'CSS',
    category: 'Front-end',
    stars: 1,
    pushedAt: '2026-04-22T12:00:00Z',
  },
  'tela-validacao-trelo': {
    title: 'Login Trello — Validação',
    description: 'Tela de login inspirada no Trello, feita do zero sem frameworks: formulário com validação, botões de login social e layout responsivo com Flexbox.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    lang: 'JavaScript',
    category: 'Front-end',
    stars: 1,
    pushedAt: '2026-04-21T12:00:00Z',
  },
  'web-calculadora': {
    title: 'Calculadora Web',
    description: 'Calculadora com tema dark e as quatro operações, limpar tela, apagar último dígito e resultado em tempo real — prática de lógica e manipulação do DOM.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    lang: 'HTML',
    category: 'Front-end',
    stars: 1,
    pushedAt: '2026-04-09T12:00:00Z',
  },
}

const humanize = name => name.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

function toProject(id, c, gh) {
  return {
    id,
    title: c.title ?? humanize(id),
    description: c.description ?? gh?.description ?? 'Repositório público no GitHub.',
    longDesc: c.longDesc,
    highlights: c.highlights,
    tech: c.tech ?? (gh?.language ? [gh.language] : []),
    lang: c.lang ?? gh?.language ?? 'Outro',
    category: c.category ?? 'Outros',
    featured: !!c.featured,
    repo: gh?.html_url ?? `${GITHUB}/${id}`,
    demo: 'demo' in c ? c.demo : gh?.homepage || null,
    stars: gh?.stargazers_count ?? c.stars ?? 0,
    pushedAt: gh?.pushed_at ?? c.pushedAt,
  }
}

const FALLBACK = Object.entries(CURATED).map(([id, c]) => toProject(id, c))

// Lista os repositórios ao vivo pela API do GitHub; se falhar, fica com a lista escrita à mão
function useGitHubRepos() {
  const [state, setState] = useState({ repos: FALLBACK, live: false })
  useEffect(() => {
    let cancelled = false
    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`)
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(list => {
        if (cancelled || !Array.isArray(list) || !list.length) return
        setState({ repos: list.map(gh => toProject(gh.name, CURATED[gh.name] ?? {}, gh)), live: true })
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])
  return state
}

const rtf = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' })
function timeAgo(iso) {
  const days = Math.round((new Date(iso) - Date.now()) / 86400000)
  if (Math.abs(days) < 30) return rtf.format(days, 'day')
  const months = Math.round(days / 30)
  if (Math.abs(months) < 12) return rtf.format(months, 'month')
  return rtf.format(Math.round(days / 365), 'year')
}

/* ───────────────────────── Pequenos componentes ───────────────────────── */

function CountUp({ value }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: v => { if (ref.current) ref.current.textContent = Math.round(v) },
    })
    return () => controls.stop()
  }, [inView, value])
  return <span ref={ref}>0</span>
}

// Card com brilho verde que segue o mouse pela borda e pelo fundo
function SpotlightCard({ children, isDark, className = '' }) {
  const ref = useRef(null)
  const move = e => {
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--x', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--y', `${e.clientY - r.top}px`)
  }
  const leave = () => {
    ref.current.style.setProperty('--x', '-999px')
    ref.current.style.setProperty('--y', '-999px')
  }
  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      className={`group relative rounded-2xl p-px ${className}`}
      style={{
        background: `radial-gradient(420px circle at var(--x, -999px) var(--y, -999px), rgba(74,222,128,0.55), transparent 55%), ${
          isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
        }`,
      }}
    >
      <div className={`relative h-full rounded-[15px] overflow-hidden ${isDark ? 'bg-[#0f0f0f]' : 'bg-white'}`}>
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: 'radial-gradient(520px circle at var(--x, -999px) var(--y, -999px), rgba(34,197,94,0.08), transparent 45%)' }}
        />
        <div className="relative h-full">{children}</div>
      </div>
    </div>
  )
}

const Icon = {
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  ),
  external: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4">
      <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
      <path d="M5 12l5 5L20 7" />
    </svg>
  ),
}

const CATEGORY_ICONS = {
  'Full Stack': <path d="M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 17l9 5 9-5" />,
  'Front-end': <path d="M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1zM3 9h18M9 9v10" />,
  'Back-end': <path d="M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zM4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />,
  Outros: <path d="M4 7h16M4 12h16M4 17h10" />,
}

function CategoryIcon({ category, className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {CATEGORY_ICONS[category] ?? CATEGORY_ICONS.Outros}
    </svg>
  )
}

function TechBadge({ name, isDark }) {
  return (
    <span className={`text-[11px] px-2 py-0.5 rounded-md font-mono border ${isDark ? 'bg-white/[0.03] border-white/10 text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
      {name}
    </span>
  )
}

/* ───────────────────────── Prévia do iGreen Tasks ───────────────────────── */

function TasksPreview({ isDark }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const bars = [42, 65, 50, 80, 58, 92, 70]
  const muted = isDark ? 'text-gray-500' : 'text-gray-400'
  const tile = isDark ? 'bg-white/[0.04] border-white/10' : 'bg-gray-50 border-gray-200'
  return (
    <div ref={ref} className={`rounded-xl border overflow-hidden shadow-2xl ${isDark ? 'bg-[#0b0d0c] border-white/10 shadow-green-500/5' : 'bg-white border-gray-200'}`}>
      {/* barra da janela */}
      <div className={`flex items-center gap-2 px-3 py-2 border-b ${isDark ? 'border-white/10 bg-white/[0.02]' : 'border-gray-200 bg-gray-50'}`}>
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        <span className={`ml-3 text-[10px] font-mono px-2 py-0.5 rounded ${isDark ? 'bg-white/5 text-gray-500' : 'bg-white text-gray-400 border border-gray-200'}`}>
          igreen-tasks / dashboard
        </span>
      </div>
      <div className="grid grid-cols-[88px_1fr] min-h-[260px]">
        {/* sidebar */}
        <div className={`border-r p-2.5 space-y-1 ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
          <div className="flex items-center gap-1.5 mb-3">
            <span className="w-5 h-5 rounded-md bg-green-500 text-black text-[9px] font-black flex items-center justify-center">iG</span>
            <span className={`text-[10px] font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Tasks</span>
          </div>
          {['Dashboard', 'Demandas', 'Matriz', 'Conquistas', 'Relatórios'].map((item, i) => (
            <div key={item} className={`text-[9px] px-1.5 py-1 rounded ${i === 0 ? 'bg-green-500/15 text-green-400' : muted}`}>{item}</div>
          ))}
        </div>
        {/* conteúdo */}
        <div className="p-3 space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {[['Demandas', '24'], ['Horas', '38h'], ['Concluídas', '87%']].map(([label, value]) => (
              <div key={label} className={`rounded-lg border p-2 ${tile}`}>
                <div className={`text-[8px] uppercase tracking-wider ${muted}`}>{label}</div>
                <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-[1.4fr_1fr] gap-2">
            <div className={`rounded-lg border p-2 ${tile}`}>
              <div className={`text-[8px] uppercase tracking-wider mb-2 ${muted}`}>Produtividade semanal</div>
              <div className="flex items-end gap-1.5 h-20">
                {bars.map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-t bg-gradient-to-t from-green-600 to-green-400"
                    initial={{ height: 0 }}
                    animate={{ height: inView ? `${h}%` : 0 }}
                    transition={{ duration: 0.7, delay: 0.3 + i * 0.07, ease: 'easeOut' }}
                  />
                ))}
              </div>
            </div>
            <div className={`rounded-lg border p-2 ${tile}`}>
              <div className={`text-[8px] uppercase tracking-wider mb-2 ${muted}`}>Eisenhower</div>
              <div className="grid grid-cols-2 gap-1 h-20">
                {[
                  ['Fazer', 'bg-green-500/25 text-green-300'],
                  ['Agendar', 'bg-emerald-500/15 text-emerald-300'],
                  ['Delegar', 'bg-yellow-500/15 text-yellow-300'],
                  ['Eliminar', 'bg-red-500/15 text-red-300'],
                ].map(([label, cls]) => (
                  <div key={label} className={`rounded text-[8px] flex items-center justify-center ${cls}`}>{label}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ───────────────────────── Cards ───────────────────────── */

function FeaturedProject({ project, isDark }) {
  return (
    <SpotlightCard isDark={isDark} className="mb-6">
      <div className="grid lg:grid-cols-5 gap-8 p-6 sm:p-8">
        <div className="lg:col-span-2 flex flex-col">
          <div className="flex items-center gap-2 mb-5">
            <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium border ${isDark ? 'bg-green-500/10 text-green-400 border-green-500/25' : 'bg-green-50 text-green-700 border-green-200'}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Projeto em destaque
            </span>
            <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>atualizado {timeAgo(project.pushedAt)}</span>
          </div>
          <h2 className={`text-3xl font-black tracking-tight mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{project.title}</h2>
          <p className={`text-sm leading-relaxed mb-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{project.longDesc ?? project.description}</p>
          {project.highlights && (
            <ul className="space-y-2 mb-6">
              {project.highlights.map(h => (
                <li key={h} className={`flex items-start gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-green-500/15 text-green-400 flex items-center justify-center">{Icon.check}</span>
                  {h}
                </li>
              ))}
            </ul>
          )}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tech.map(t => <TechBadge key={t} name={t} isDark={isDark} />)}
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-auto">
            <a href={project.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-green-500 hover:bg-green-400 text-black text-sm font-semibold px-4 py-2.5 transition-colors">
              {Icon.github} Ver código
            </a>
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 rounded-lg border text-sm font-semibold px-4 py-2.5 transition-colors ${isDark ? 'border-white/15 text-white hover:bg-white/5' : 'border-gray-300 text-gray-900 hover:bg-gray-50'}`}>
                {Icon.external} Ver online
              </a>
            )}
            <span className={`flex items-center gap-1.5 text-xs ml-auto ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: langColor(project.lang) }} />
              {project.lang}
            </span>
          </div>
        </div>
        <div className="lg:col-span-3 flex items-center">
          <div className="w-full relative">
            <div className="absolute -inset-6 bg-green-500/10 blur-3xl rounded-full pointer-events-none" />
            <div className="relative"><TasksPreview isDark={isDark} /></div>
          </div>
        </div>
      </div>
    </SpotlightCard>
  )
}

function ProjectCard({ project, isDark }) {
  return (
    <SpotlightCard isDark={isDark} className="h-full">
      <div className="flex flex-col h-full p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <span className={`w-9 h-9 rounded-lg border flex items-center justify-center ${isDark ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-green-50 border-green-200 text-green-700'}`}>
              <CategoryIcon category={project.category} />
            </span>
            <span className={`text-[11px] uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{project.category}</span>
          </div>
          <div className="flex items-center gap-1">
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label="Ver online" className={`p-1.5 rounded-md transition-colors ${isDark ? 'text-gray-500 hover:text-green-400 hover:bg-white/5' : 'text-gray-400 hover:text-green-600 hover:bg-gray-100'}`}>
                {Icon.external}
              </a>
            )}
            <a href={project.repo} target="_blank" rel="noopener noreferrer" aria-label="Ver código" className={`p-1.5 rounded-md transition-colors ${isDark ? 'text-gray-500 hover:text-white hover:bg-white/5' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'}`}>
              {Icon.github}
            </a>
          </div>
        </div>

        <h3 className={`text-lg font-bold mb-2 transition-colors duration-300 ${isDark ? 'text-white group-hover:text-green-400' : 'text-gray-900 group-hover:text-green-700'}`}>
          {project.title}
        </h3>
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-green-500 hover:text-green-400 mb-2 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            {project.demo.replace('https://', '')}
          </a>
        )}
        <p className={`text-sm leading-relaxed mb-5 line-clamp-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{project.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.slice(0, 4).map(t => <TechBadge key={t} name={t} isDark={isDark} />)}
        </div>

        <div className={`flex items-center gap-4 mt-auto pt-4 border-t text-xs ${isDark ? 'border-white/5 text-gray-500' : 'border-gray-100 text-gray-400'}`}>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: langColor(project.lang) }} />
            {project.lang}
          </span>
          <span className="flex items-center gap-1">{Icon.star}{project.stars}</span>
          <span className="ml-auto">{timeAgo(project.pushedAt)}</span>
        </div>
      </div>
    </SpotlightCard>
  )
}

/* ───────────────────────── Página ───────────────────────── */

export default function Projects() {
  const { isDark } = useTheme()
  const { repos, live } = useGitHubRepos()
  const [category, setCategory] = useState('Todos')
  const [query, setQuery] = useState('')
  const listRef = useRef(null)

  const openFolder = c => {
    setCategory(c)
    setQuery('')
    listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const stats = useMemo(() => {
    const byLang = {}
    repos.forEach(r => { byLang[r.lang] = (byLang[r.lang] ?? 0) + 1 })
    const langs = Object.entries(byLang).sort((a, b) => b[1] - a[1])
    const latest = repos.reduce((a, r) => (r.pushedAt > a ? r.pushedAt : a), '')
    return { total: repos.length, stars: repos.reduce((n, r) => n + r.stars, 0), langs, latest }
  }, [repos])

  const categories = useMemo(() => {
    const present = CATEGORIES.filter(c => repos.some(r => r.category === c))
    if (repos.some(r => r.category === 'Outros')) present.push('Outros')
    return ['Todos', ...present]
  }, [repos])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return repos
      .filter(r => category === 'Todos' || r.category === category)
      .filter(r => !q || [r.title, r.description, r.lang, ...r.tech].join(' ').toLowerCase().includes(q))
      .sort((a, b) => (b.pushedAt > a.pushedAt ? 1 : -1))
  }, [repos, category, query])

  const featured = filtered.find(r => r.featured)
  const rest = filtered.filter(r => !r.featured)

  const heading = isDark ? 'text-white' : 'text-gray-900'
  const muted = isDark ? 'text-gray-400' : 'text-gray-600'

  return (
    <div className={`min-h-screen pt-16 ${isDark ? 'bg-[#0a0a0a]' : 'bg-gray-50'}`}>
      {/* ── Topo ── */}
      <section className={`relative overflow-hidden border-b ${isDark ? 'border-white/5' : 'border-gray-200'}`}>
        <HexBackground />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-green-500/10 blur-3xl rounded-full pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 text-xs font-mono px-3 py-1 rounded-full border mb-6 transition-colors ${isDark ? 'border-green-500/25 bg-green-500/10 text-green-400 hover:bg-green-500/15' : 'border-green-200 bg-green-50 text-green-700'}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${live ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`} />
              github.com/{GITHUB_USER} {live ? '· ao vivo' : ''}
            </a>
            <h1 className={`text-4xl sm:text-6xl font-black tracking-tight leading-[1.05] mb-4 ${heading}`}>
              Tudo o que eu construí,
              <br />
              <span className="gradient-text">direto do GitHub.</span>
            </h1>
            <p className={`text-base max-w-2xl mb-10 ${muted}`}>
              Projetos de back-end, front-end e full stack — aplicações, guias de infraestrutura, estudos de interface e documentação técnica,
              todos os meus repositórios públicos em um só lugar.
            </p>
          </motion.div>

          {/* estatísticas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8"
          >
            {[
              { label: 'Repositórios', value: <CountUp value={stats.total} /> },
              { label: 'Estrelas', value: <CountUp value={stats.stars} /> },
              { label: 'Linguagens', value: <CountUp value={stats.langs.length} /> },
              { label: 'Último push', value: stats.latest ? timeAgo(stats.latest) : '—' },
            ].map(s => (
              <div key={s.label} className={`rounded-xl border px-4 py-3 backdrop-blur ${isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-gray-200'}`}>
                <div className={`text-2xl font-black ${heading}`}>{s.value}</div>
                <div className={`text-[11px] uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* barra de linguagens, estilo GitHub */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <div className={`flex h-2 rounded-full overflow-hidden mb-3 ${isDark ? 'bg-white/5' : 'bg-gray-200'}`}>
              {stats.langs.map(([lang, n], i) => (
                <motion.div
                  key={lang}
                  title={`${lang}: ${n}`}
                  style={{ backgroundColor: langColor(lang) }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(n / stats.total) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.4 + i * 0.08, ease: 'easeOut' }}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-1">
              {stats.langs.map(([lang, n]) => (
                <span key={lang} className={`flex items-center gap-1.5 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: langColor(lang) }} />
                  {lang}
                  <span className={isDark ? 'text-gray-600' : 'text-gray-400'}>{Math.round((n / stats.total) * 100)}%</span>
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Pastas por área ── */}
      <section className="pt-14 pb-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-12">
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-green-500 mb-2">Explore por área</div>
              <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${heading}`}>Back-end, Front-end e Full Stack</h2>
            </div>
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              Passe o mouse nas pastas para espiar os projetos · clique para filtrar
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 pt-6">
            {CATEGORIES.map(c => (
              <ProjectFolder
                key={c}
                name={c}
                colors={FOLDER_COLORS[c]}
                projects={repos.filter(r => r.category === c).sort((a, b) => (b.pushedAt > a.pushedAt ? 1 : -1))}
                isDark={isDark}
                langColor={langColor}
                onSelect={() => openFolder(c)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Filtros + projetos ── */}
      <section ref={listRef} className="py-10 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-8">
            <div className="flex gap-1.5 overflow-x-auto scrollbar-hide -mx-1 px-1">
              {categories.map(c => {
                const count = c === 'Todos' ? repos.length : repos.filter(r => r.category === c).length
                const active = c === category
                return (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`relative flex-shrink-0 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      active ? (c === 'Todos' && isDark ? 'text-black' : 'text-white') : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="project-filter"
                        className="absolute inset-0 rounded-lg"
                        style={{ background: FOLDER_COLORS[c]?.to ?? (isDark ? '#4ade80' : '#16a34a') }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                    <span className="relative flex items-center gap-1.5">
                      {c}
                      <span className={`text-[10px] ${active ? 'opacity-70' : isDark ? 'text-gray-600' : 'text-gray-400'}`}>{count}</span>
                    </span>
                  </button>
                )
              })}
            </div>
            <label className={`md:ml-auto flex items-center gap-2 rounded-lg border px-3 py-2 w-full md:w-64 transition-colors focus-within:border-green-500/60 ${isDark ? 'bg-white/[0.03] border-white/10 text-gray-500' : 'bg-white border-gray-200 text-gray-400'}`}>
              {Icon.search}
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Buscar por nome ou tecnologia…"
                className={`bg-transparent outline-none text-sm w-full ${isDark ? 'text-white placeholder:text-gray-600' : 'text-gray-900 placeholder:text-gray-400'}`}
              />
            </label>
          </div>

          <AnimatePresence mode="popLayout">
            {featured && (
              <motion.div key={featured.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                <FeaturedProject project={featured} isDark={isDark} />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {rest.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: Math.min(i * 0.05, 0.35) }}
                >
                  <ProjectCard project={project} isDark={isDark} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {!filtered.length && (
            <div className={`text-center py-20 rounded-2xl border border-dashed ${isDark ? 'border-white/10 text-gray-500' : 'border-gray-300 text-gray-400'}`}>
              Nenhum projeto encontrado para “{query}”.
              <button onClick={() => { setQuery(''); setCategory('Todos') }} className="ml-2 text-green-500 hover:text-green-400">Limpar filtros</button>
            </div>
          )}
        </div>
      </section>

      {/* ── GitHub CTA ── */}
      <section className={`relative py-20 overflow-hidden ${isDark ? 'bg-[#0d0d0d]' : 'bg-gray-100'}`}>
        <HexBackground />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className={`text-4xl font-black mb-4 ${heading}`}>
                Quer ver mais do
                <br />
                meu trabalho?
                <br />
                <span className={isDark ? 'text-gray-600' : 'text-gray-400'}>Confira meu</span>
                <br />
                <span className="gradient-text">GitHub.</span>
              </h2>
              <p className={`text-sm mb-8 ${muted}`}>
                Repositórios públicos com{' '}
                <span className="text-green-500">aplicações full stack</span>,{' '}
                <span className="text-emerald-400">guias de infraestrutura</span>{' '}
                e estudos de interface.
              </p>
              <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex">
                {Icon.github}
                Explore meu GitHub
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex justify-center"
            >
              <SpotlightCard isDark={isDark} className="w-full max-w-sm">
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center text-black font-black text-lg">
                      M
                    </div>
                    <div>
                      <div className={`font-bold ${heading}`}>{GITHUB_USER}</div>
                      <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>github.com</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[
                      { label: 'Repos', value: stats.total },
                      { label: 'Stars', value: stats.stars },
                      { label: 'Commits', value: '300+' },
                    ].map(stat => (
                      <div key={stat.label} className={`rounded-lg p-3 text-center ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                        <div className={`text-lg font-bold ${heading}`}>{stat.value}</div>
                        <div className={`text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{stat.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className={`text-xs text-center ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>Uberlândia, MG · Brasil</div>
                </div>
              </SpotlightCard>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
