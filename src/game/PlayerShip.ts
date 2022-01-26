import { Actor } from '../engine/Actor'
import { Engine } from '../engine/Engine'

export class PlayerShip extends Actor {
  public readonly onUpdate = (game: Engine, delta: number) => {
    this.rotation += delta / 2
    this.pos.x = -2
    this.pos.y = Math.sin(Date.now() / 1000)
  }
}

export class PlayerShip2 extends Actor {
  public readonly onUpdate = (game: Engine, delta: number) => {
    this.rotation += delta / 3
    this.pos.x = Math.sin(Date.now() / 1000) / 0.5
    this.pos.y = -1
  }
}