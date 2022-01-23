import JSX from './custom-render'
import './app.css'
import { vec } from './excalibur/engine'

const canvasSize = vec(640, 480)

const canvas = (
  <canvas id="glCanvas" width={canvasSize.x} height={canvasSize.y} />
) as HTMLCanvasElement

document.body.appendChild(<h1>howdy world 🤠</h1>)

document.body.appendChild(canvas)

const ctx = canvas.getContext('2d')

ctx.fillStyle = 'red'

// Door
ctx.fillRect(110, 190, 40, 60);

function loop() {
  ctx.clearRect(0, 0, canvasSize.x, canvasSize.y);
  const x = (Math.sin(Date.now() / 100) * 50) + 100
  console.log(x)
  ctx.fillRect(x, 190, 40, 60);
  requestAnimationFrame(loop)
}

requestAnimationFrame(loop)