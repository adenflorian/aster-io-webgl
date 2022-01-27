import { Actor } from '../engine/Actor'
import { Engine } from '../engine/Engine'
import { TriangleMaterial, SquareMaterial } from '../engine/Materials/SquareMaterial'
import { Keys, vec } from '../excalibur/engine';

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

const accel = 2
const rotateSpeed = 3
const maxVel = 4

export class PlayerShip2 extends Actor {
  public constructor(engine: Engine) {
    super()
    this.material = new TriangleMaterial(engine, 0.3, 0.5);
    this.drag = 0.996
  }
  public readonly onUpdate = (engine: Engine, delta: number) => {
    if (engine.input.keyboard.isHeld(Keys.W)) {
      this.vel = this.vel.add(vec(0, accel * delta).rotate(-this.rotation))
    }
    if (engine.input.keyboard.wasPressed(Keys.W)) {
      // playerContainerRef.instance.classList.add('thrust')
    }
    if (engine.input.keyboard.wasReleased(Keys.W)) {
      // playerContainerRef.instance.classList.remove('thrust')
    }
    if (engine.input.keyboard.isHeld(Keys.A)) {
      this.rotation -= (rotateSpeed * delta)
      console.log(this.rotation)
    }
    if (engine.input.keyboard.isHeld(Keys.D)) {
      this.rotation += (rotateSpeed * delta)
      console.log(this.rotation)
    }
    if (this.vel.size > maxVel) {
      this.vel.size = maxVel
    }
  }
}