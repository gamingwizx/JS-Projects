export function drawSquare(canvas, { x, y, width, height }) {
  const context = canvas.getContext("2d")
  context.fillStyle = "red"
  context.fillRect(x, y, width, height)
}

export function drawLine(canvas, { x, y, width, height, lineWidth }) {
  const context = canvas.getContext("2d")
  context.strokeStyle = "blue"
  context.lineWidth = lineWidth
  context.strokeRect(x, y, width, height)
}

export function drawCircle(canvas, { x, y, size, color }) {
  const context = canvas.getContext("2d")
  context.fillStyle = color
  context.arc(x, y, size, 0, Math.PI * 2)
  context.fill()
}
