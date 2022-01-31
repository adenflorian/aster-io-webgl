import { Engine } from '../engine/Engine'
import { Asteroid } from './actors/Asteroid'
import { PlayerShip } from './actors/PlayerShip'

export function startGame(canvas: HTMLCanvasElement) {

  const engine = new Engine(canvas)

  const asteroid = new Asteroid(engine, -2)
  const asteroid2 = new Asteroid(engine, 2)
  const playerShip = new PlayerShip(engine)

  engine.add(asteroid)
  engine.add(asteroid2)
  engine.add(playerShip)

  engine.start()
}