import { addCanvasToBody } from './canvas'
import { startGame } from './game/game'
import './app.css'

const canvasRef = addCanvasToBody()

startGame(canvasRef.instance!)