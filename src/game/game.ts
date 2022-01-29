import { Engine } from '../engine/Engine'
import { PlayerShip, PlayerShip2 } from './PlayerShip'

export function startGame(canvas: HTMLCanvasElement) {

  const engine = new Engine(canvas)

  const playerShip = new PlayerShip(engine)
  const playerShip2 = new PlayerShip2(engine)

  engine.add(playerShip)
  engine.add(playerShip2)

  engine.start()
}