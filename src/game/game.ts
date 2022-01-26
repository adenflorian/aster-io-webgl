import { Engine } from '../engine/Engine'
import { PlayerShip, PlayerShip2 } from './PlayerShip'

export function startGame(gl) {

  const game = new Engine(gl)

  const playerShip = new PlayerShip()
  const playerShip2 = new PlayerShip2()

  game.add(playerShip)
  game.add(playerShip2)

  game.start()
}