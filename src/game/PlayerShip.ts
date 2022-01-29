import { Actor } from '../engine/Actor'
import { Colors } from '../engine/Color';
import { Engine } from '../engine/Engine'
import { TriangleMaterial, SquareMaterial } from '../engine/Materials/ShipMaterials'
import { Keys, vec } from '../excalibur/engine';

export class PlayerShip extends Actor {
  public constructor(engine: Engine) {
    super()
    this.material = new SquareMaterial(engine, 0.8, Colors.white);
  }
  public readonly onUpdate = (_: Engine, delta: number) => {
    this.rotation += delta / 5
    this.pos.x = -2
    this.pos.y = Math.sin(Date.now() / 1000)
  }
}

const accel = 2
const rotateSpeed = 3
const maxVel = 4

export class PlayerShip2 extends Actor {
  private _thruster: ShipThruster

  public constructor(engine: Engine) {
    super()
    this.material = new TriangleMaterial(engine, 0.3, 0.5, Colors.white);
    this.physics = true
    this.drag = 0.996
    this._thruster = new ShipThruster(engine)
    this.addChild(this._thruster)
  }
  public readonly onUpdate = (engine: Engine, delta: number) => {
    if (engine.input.keyboard.isHeld(Keys.W)) {
      this.vel = this.vel.add(vec(0, accel * delta).rotate(this.rotation))
    }
    if (engine.input.keyboard.wasPressed(Keys.W)) {
      this._thruster.enabled = true
    }
    if (engine.input.keyboard.wasReleased(Keys.W)) {
      this._thruster.enabled = false
    }
    if (engine.input.keyboard.isHeld(Keys.A)) {
      this.rotation += (rotateSpeed * delta)
    }
    if (engine.input.keyboard.isHeld(Keys.D)) {
      this.rotation -= (rotateSpeed * delta)
    }
    if (this.vel.size > maxVel) {
      this.vel.size = maxVel
    }
  }
}

class ShipThruster extends Actor {
  public constructor(engine: Engine) {
    super()
    this.material = new TriangleMaterial(engine, 0.1, 0.5, Colors.white);
    this.pos = vec(0, -0.23)
    this.rotation = Math.PI
    this.enabled = false
  }
  public readonly onUpdate = (engine: Engine, delta: number) => {
  }
}