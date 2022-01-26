import { addCanvasToBody } from './canvas'
import { startGame } from './game/game'
import './app.css'

const canvasRef = addCanvasToBody()

const gl = canvasRef.instance!.getContext('webgl2')

// Only continue if WebGL is available and working
if (gl === null) {
  throw new Error('Unable to initialize WebGL. Your browser or machine may not support it.');
}

startGame(gl)