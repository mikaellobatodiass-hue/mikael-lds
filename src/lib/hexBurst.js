// Evento disparado quando o visitante curte o site (ouvido pelos fundos hexagonais)
export const LIKE_EVENT = 'portfolio:like'

// Mesma grade do .hex-pattern (index.css): bloco de 56x100, hexágono de pé em y 0..66
const W = 56
const H = 100

// y da borda na posição x: zigue-zague de cima (topo em y 0) ou de baixo (base em y 66)
function edgeY(x, row, bottom) {
  const d = Math.abs((((x % W) + W) % W) - 28) / 28 // 0 no topo/base, 1 nas laterais
  return bottom ? H * row + 66 - 16 * d : H * row + 16 * d
}

// Luz correndo da direita para a esquerda: cabeça em p.x, rastro para a direita
function drawPulse(ctx, p) {
  const x1 = p.x + p.tail
  const pts = [[p.x, edgeY(p.x, p.row, p.bottom)]]
  for (let vx = Math.floor(p.x / 28) * 28 + 28; vx < x1; vx += 28) pts.push([vx, edgeY(vx, p.row, p.bottom)])
  pts.push([x1, edgeY(x1, p.row, p.bottom)])

  const grad = ctx.createLinearGradient(p.x, 0, x1, 0)
  grad.addColorStop(0, 'rgba(134,239,172,0.95)')
  grad.addColorStop(0.25, 'rgba(34,197,94,0.6)')
  grad.addColorStop(1, 'rgba(34,197,94,0)')

  ctx.beginPath()
  pts.forEach(([x, y], k) => (k ? ctx.lineTo(x, y) : ctx.moveTo(x, y)))
  ctx.strokeStyle = grad
  ctx.lineWidth = 2
  ctx.shadowColor = '#22c55e'
  ctx.shadowBlur = 10
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(pts[0][0], pts[0][1], 2.2, 0, Math.PI * 2)
  ctx.fillStyle = '#dcfce7'
  ctx.shadowBlur = 14
  ctx.fill()
}

// Solta várias luzes pelas fileiras da grade dentro do canvas; chama onDone ao terminar.
// Devolve uma função que cancela a animação.
export function runHexBurst(canvas, onDone) {
  const ctx = canvas.getContext('2d')
  const dpr = window.devicePixelRatio || 1
  const width = canvas.parentElement.clientWidth
  const height = canvas.parentElement.clientHeight
  canvas.width = width * dpr
  canvas.height = height * dpr
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  const rows = Math.max(Math.floor((height - 66) / H) + 1, 1)
  const count = Math.min(Math.max(rows * 3, 12), 30)
  const pulses = Array.from({ length: count }, () => ({
    row: Math.floor(Math.random() * rows),
    bottom: Math.random() < 0.5,
    // começam fora da tela, à direita, escalonadas para saírem em sequência
    x: width + Math.random() * width * 0.6,
    speed: 650 + Math.random() * 350,
    tail: 180 + Math.random() * 120,
  }))

  let last = 0
  let frame = requestAnimationFrame(function tick(now) {
    const dt = Math.min((now - (last || now)) / 1000, 0.05)
    last = now
    pulses.forEach(p => { p.x -= p.speed * dt })

    ctx.clearRect(0, 0, width, height)
    const alive = pulses.filter(p => p.x + p.tail > 0)
    alive.forEach(p => drawPulse(ctx, p))

    if (alive.length) frame = requestAnimationFrame(tick)
    else onDone?.()
  })

  return () => cancelAnimationFrame(frame)
}
