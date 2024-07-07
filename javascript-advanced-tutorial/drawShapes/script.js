//draw a red square
//draw a lined square
//draw a circle
//when press c, it will clear

import { drawSquare, drawLine, drawCircle } from "./draw.js"

const canvas = document.createElement("canvas")
canvas.height = window.innerHeight - 20
canvas.width = window.innerWidth - 20
document.body.append(canvas)

drawSquare(canvas, { x: 50, y: 50, width: 200, height: 200 })
drawLine(canvas, { x: 350, y: 50, width: 200, height: 200, lineWidth: 20 })
drawCircle(canvas, { x: 350, y: 50, size: 50, color: "green" })
