import { Engine } from '../engine/Engine'
import { Asteroid } from './actors/Asteroid'
import { PlayerShip } from './actors/PlayerShip'

export function startGame(canvas: HTMLCanvasElement) {

  const engine = new Engine(canvas)

  const asteroid = new Asteroid(engine)
  const playerShip = new PlayerShip(engine)

  engine.add(asteroid)
  engine.add(playerShip)

  engine.start()
}