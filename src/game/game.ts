import { Engine } from '../engine/Engine'
import { PlayerShip, PlayerShip2 } from './PlayerShip'

export function startGame(gl: WebGL2RenderingContext) {

  const engine = new Engine(gl)

  const playerShip = new PlayerShip(engine)
  const playerShip2 = new PlayerShip2(engine)

  engine.add(playerShip)
  engine.add(playerShip2)

  engine.start()
}