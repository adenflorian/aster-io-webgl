import { Actor } from '../engine/Actor'
import { Engine } from '../engine/Engine'
import { TriangleMaterial, SquareMaterial } from '../engine/Materials/SquareMaterial'

export class PlayerShip extends Actor {
  public constructor(engine: Engine) {
    super()
    this.material = new SquareMaterial(engine);
  }
  public readonly onUpdate = (engine: Engine, delta: number) => {
    this.rotation += delta / 5
    this.pos.x = -2
    this.pos.y = Math.sin(Date.now() / 1000)
  }
}

export class PlayerShip2 extends Actor {
  public constructor(engine: Engine) {
    super()
    this.material = new TriangleMaterial(engine);
  }
  public readonly onUpdate = (engine: Engine, delta: number) => {
    this.rotation += delta
    this.pos.x = Math.sin(Date.now() / 4000) / 0.5
    this.pos.y = -1
  }
}