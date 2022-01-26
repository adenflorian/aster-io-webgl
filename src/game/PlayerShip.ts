import { Actor } from '../engine/Actor'
import { Engine } from '../engine/Engine'
import { AltMaterial, SquareMaterial } from '../engine/Materials/SquareMaterial'

export class PlayerShip extends Actor {
  public readonly onUpdate = (engine: Engine, delta: number) => {
    this.rotation += delta / 5
    this.pos.x = -2
    this.pos.y = Math.sin(Date.now() / 1000)
    this.material = new SquareMaterial(engine);
  }
}

export class PlayerShip2 extends Actor {
  public readonly onUpdate = (engine: Engine, delta: number) => {
    this.rotation += delta / 20
    this.pos.x = Math.sin(Date.now() / 4000) / 0.5
    this.pos.y = -1
    this.material = new AltMaterial(engine);
  }
}