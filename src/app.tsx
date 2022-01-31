import './app.css'
import { addCanvasToBody } from './canvas'
import { startGame } from './game/game'

const canvasRef = addCanvasToBody()

startGame(canvasRef.instance!)