import { useEffect, useRef } from 'react'

// Uma luz que dá a volta no hero pelas bordas dos hexágonos do fundo:
// fileira de cima (→), lateral direita (↓), fileira de baixo (←), lateral esquerda (↑).
// Mesma grade do .hex-pattern (index.css): bloco de 56x100, hexágono de pé em y 0..66.
// Vértices do hexágono (i, j): topo (56i+28, 100j), laterais em x 56i e 56i+56
// (y +16 e +50), base (56i+28, 100j+66). Entre fileiras há um vão de 34px.
const W = 56
const H = 100
const SPEED = 380  // px por segundo
const TAIL = 320   // comprimento do rastro, em px
const STEP = 4     // resolução do rastro, em px

function buildLoop(iL, iR, jT, jB) {
  const T = (i, j) => [W * i + 28, H * j]
  const B = (i, j) => [W * i + 28, H * j + 66]
  const pts = [T(iL, jT)]
  // cima, da esquerda para a direita, pelo zigue-zague de cima da fileira
  for (let i = iL; i < iR; i++) pts.push([W * i + 56, H * jT + 16], T(i + 1, jT))
  // lateral direita, descendo pelo lado direito dos hexágonos da coluna iR
  for (let j = jT; j <= jB; j++) {
    const x = W * iR
    pts.push([x + 56, H * j + 16], [x + 56, H * j + 50], B(iR, j))
    if (j < jB) pts.push(T(iR, j + 1))
  }
  // baixo, da direita para a esquerda, pelo zigue-zague de baixo da fileira
  for (let i = iR; i > iL; i--) pts.push([W * i, H * jB + 50], B(i - 1, jB))
  // lateral esquerda, subindo pelo lado esquerdo dos hexágonos da coluna iL
  for (let j = jB; j >= jT; j--) {
    const x = W * iL
    pts.push([x, H * j + 50], [x, H * j + 16], T(iL, j))
    if (j > jT) pts.push(B(iL, j - 1))
  }
  // comprimento acumulado de cada vértice, para posicionar a luz pela distância
  const acc = [0]
  for (let k = 1; k < pts.length; k++) {
    acc.push(acc[k - 1] + Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]))
  }
  return { pts, acc, length: acc[acc.length - 1] }
}

// ponto do caminho a uma distância s do início (dá a volta)
function pointAt(loop, s) {
  const { pts, acc, length } = loop
  s = ((s % length) + length) % length
  let lo = 0
  let hi = acc.length - 1
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1
    if (acc[mid] <= s) lo = mid
    else hi = mid
  }
  const t = (s - acc[lo]) / (acc[hi] - acc[lo] || 1)
  return [pts[lo][0] + (pts[hi][0] - pts[lo][0]) * t, pts[lo][1] + (pts[hi][1] - pts[lo][1]) * t]
}

function draw(ctx, loop, head) {
  // circuito inteiro bem apagado
  ctx.beginPath()
  loop.pts.forEach(([x, y], k) => (k ? ctx.lineTo(x, y) : ctx.moveTo(x, y)))
  ctx.closePath()
  ctx.strokeStyle = 'rgba(34,197,94,0.12)'
  ctx.lineWidth = 1.5
  ctx.shadowBlur = 0
  ctx.stroke()

  // rastro: pedacinhos cada vez mais fortes até a cabeça
  ctx.lineWidth = 2
  ctx.lineCap = 'round'
  ctx.shadowColor = '#22c55e'
  ctx.shadowBlur = 10
  let prev = pointAt(loop, head - TAIL)
  for (let d = TAIL - STEP; d >= 0; d -= STEP) {
    const p = pointAt(loop, head - d)
    const a = 1 - d / TAIL
    ctx.beginPath()
    ctx.moveTo(prev[0], prev[1])
    ctx.lineTo(p[0], p[1])
    ctx.strokeStyle = a > 0.85 ? `rgba(134,239,172,${a})` : `rgba(34,197,94,${a * 0.8})`
    ctx.stroke()
    prev = p
  }

  // cabeça da luz
  ctx.beginPath()
  ctx.arc(prev[0], prev[1], 2.4, 0, Math.PI * 2)
  ctx.fillStyle = '#dcfce7'
  ctx.shadowBlur = 16
  ctx.fill()
}

export default function HexLightning() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let width = 0
    let height = 0
    let loop = null
    let head = 0
    let last = 0
    let frame = 0
    let visible = true

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      width = canvas.parentElement.clientWidth
      height = canvas.parentElement.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // volta com uma coluna/fileira de folga das bordas (a fileira 0 fica sob o menu)
      const iL = 1
      const iR = Math.floor(width / W) - 2
      const jT = 1
      const jB = Math.floor((height - 66 - 12) / H)
      const progress = loop ? head / loop.length : 0
      loop = iR - iL >= 2 && jB - jT >= 1 ? buildLoop(iL, iR, jT, jB) : null
      head = loop ? progress * loop.length : 0
    }

    const tick = now => {
      const dt = Math.min((now - (last || now)) / 1000, 0.05)
      last = now
      ctx.clearRect(0, 0, width, height)
      if (loop) {
        head = (head + SPEED * dt) % loop.length
        draw(ctx, loop, head)
      }
      frame = visible ? requestAnimationFrame(tick) : 0
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement)

    // pausa quando a seção sai da tela
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !frame) { last = 0; frame = requestAnimationFrame(tick) }
    })
    io.observe(canvas)

    frame = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(frame); ro.disconnect(); io.disconnect() }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />
}
