import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import HexBackground from '../components/HexBackground'

export default function Contact() {
  const { isDark } = useTheme()
  const [form, setForm] = useState({ name: '', surname: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState(null)

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => {
      setStatus('sent')
      setForm({ name: '', surname: '', email: '', phone: '', message: '' })
      setTimeout(() => setStatus(null), 4000)
    }, 1500)
  }

  const inputClass = `w-full rounded-lg px-4 py-3 text-sm outline-none transition-all duration-200 ${
    isDark
      ? 'bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:border-blue-500/50 focus:bg-white/8'
      : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white'
  }`

  return (
    <div className={`min-h-screen pt-16 ${isDark ? 'bg-[#0a0a0a]' : 'bg-gray-50'}`}>
      {/* ── Header CTA ── */}
      <section className={`relative py-20 border-b ${isDark ? 'border-white/5' : 'border-gray-200'} overflow-hidden`}>
        <HexBackground />
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className={`text-4xl sm:text-5xl font-black mb-4 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Obrigado pela
              <br />
              sua visita,{' '}
              <span className="gradient-text">vamos
              <br />
              conversar?</span>
            </h1>
            <p className={`text-sm mb-8 max-w-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Estou disponível para novos{' '}
              <span className="text-blue-500">projetos</span>,{' '}
              <span className="text-cyan-400">oportunidades</span> e
              colaborações. Deixe seu contato e responderei em breve.
            </p>
            <div className="flex gap-3">
              <a
                href="mailto:diegocativeiroleopardo@gmail.com"
                className="btn-secondary text-sm"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Enviar e-mail
              </a>
              <a
                href="https://www.linkedin.com/in/mikael-dias"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#0077b5] text-white text-sm font-semibold px-5 py-3 rounded-lg hover:bg-[#005885] transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </motion.div>

          {/* Right floating card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`rounded-2xl border overflow-hidden ${isDark ? 'bg-[#111] border-white/8' : 'bg-white border-gray-200 shadow-sm'}`}
          >
            <div className={`h-44 flex items-center justify-center relative overflow-hidden ${isDark ? 'bg-gradient-to-br from-blue-950/50 to-[#0d0d0d]' : 'bg-gradient-to-br from-blue-50 to-gray-100'}`}>
              {/* BUILD neon-style text */}
              <div className="text-center">
                <div className="text-4xl font-black text-blue-400 drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]">
                  BUILD
                </div>
                <div className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  Vamos criar algo juntos
                </div>
              </div>
              {/* Floating badges */}
              <div className={`absolute bottom-4 left-4 text-xs px-2 py-1 rounded ${isDark ? 'bg-[#111] border border-white/10' : 'bg-white border border-gray-200 shadow'}`}>
                <span className="text-blue-400">{'< '}</span>
                <span className={isDark ? 'text-white' : 'text-gray-900'}>Dev</span>
                <span className="text-blue-400">{' />'}</span>
              </div>
            </div>
            <div className="p-5">
              <div className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Aberto a novas oportunidades
              </div>
              <p className={`text-xs mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Seja um projeto freelance, uma vaga CLT ou apenas uma troca de ideias — toda mensagem é bem-vinda.
              </p>
              <div className={`text-xs mb-3 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
              </div>
              <a
                href="https://www.linkedin.com/in/mikael-dias"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                Ver meu LinkedIn →
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Contact form ── */}
      <section className={`py-16 ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className={`text-3xl font-black mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Entre em Contato Comigo
            </h2>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Estou aberto a novas oportunidades e colaborações, seja sob contrato CLT ou PJ.
              Sinta-se à vontade para entrar em contato pelos canais de comunicação abaixo.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            {/* Name row */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Nome
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Seu nome"
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Sobrenome
                </label>
                <input
                  type="text"
                  name="surname"
                  value={form.surname}
                  onChange={handleChange}
                  placeholder="Seu sobrenome"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className={`flex items-center gap-2 text-sm font-medium mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Email
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-blue-500">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="exemplo@email.com"
                required
                className={inputClass}
              />
            </div>

            {/* Phone */}
            <div>
              <label className={`flex items-center gap-2 text-sm font-medium mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Contato (opcional)
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-green-500">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="(99) 99999-9999"
                className={inputClass}
              />
            </div>

            {/* Message */}
            <div>
              <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Assunto
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Digite sua mensagem..."
                required
                rows={5}
                className={`${inputClass} resize-y min-h-[120px]`}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className={`w-full py-3.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
                status === 'sent'
                  ? 'bg-green-600 text-white'
                  : isDark
                  ? 'bg-white text-black hover:bg-gray-200 disabled:opacity-50'
                  : 'bg-gray-900 text-white hover:bg-gray-700 disabled:opacity-50'
              }`}
            >
              {status === 'sending' ? 'Enviando...' : status === 'sent' ? 'Mensagem enviada!' : 'Enviar'}
            </button>
          </motion.form>

          {/* Quick contact */}
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <a
              href="https://discord.com/users/mikael"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-3 py-4 rounded-xl border font-semibold text-sm transition-all duration-200 ${
                isDark
                  ? 'bg-[#5865F2]/10 border-[#5865F2]/20 text-[#5865F2] hover:bg-[#5865F2]/20'
                  : 'bg-indigo-50 border-indigo-200 text-indigo-600 hover:bg-indigo-100'
              }`}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.101 18.079.11 18.1.128 18.11a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
              </svg>
              Discord
            </a>
            <a
              href="https://wa.me/5589981089633"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-3 py-4 rounded-xl border font-semibold text-sm transition-all duration-200 ${
                isDark
                  ? 'bg-green-600/10 border-green-600/20 text-green-500 hover:bg-green-600/20'
                  : 'bg-green-50 border-green-200 text-green-600 hover:bg-green-100'
              }`}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
