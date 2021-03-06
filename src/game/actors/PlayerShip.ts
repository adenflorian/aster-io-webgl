import { Actor } from '../../engine/Actors/Actor';
import { BasicPhysics } from '../../engine/Components/BasicPhysics';
import { LineRenderer } from '../../engine/Components/LineRenderer';
import { Engine } from '../../engine/Engine';
import { Keys, vec } from '../../excalibur/engine';

const accel = 2
const rotateSpeed = 3
const maxVel = 4
const orthoEdgeOffset = 1.13

export class PlayerShip extends Actor {
  private _thruster: ShipThruster

  public constructor(engine: Engine) {
    super(engine)
    const lineRenderer = new LineRenderer(engine)
    lineRenderer.setPath('M -5 7 L 0 -8 L 5 7 M 4 4 L -4 4')
    this.renderer = lineRenderer
    const scale = 0.04
    this.transform.scale = vec(scale, scale)
    this.physics = true
    this.drag = 0.996
    this._thruster = new ShipThruster(engine)
    this.addChild(this._thruster)
    this.body = new BasicPhysics()
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

    const gameAreaWidth = engine.orthoWidth * orthoEdgeOffset
    const gameAreaHeight = engine.orthoHeight * orthoEdgeOffset

    if (this.pos.y > gameAreaHeight / 2) {
      this.pos.y -= gameAreaHeight
    }
    if (this.pos.y < -gameAreaHeight / 2) {
      this.pos.y += gameAreaHeight
    }
    if (this.pos.x > gameAreaWidth / 2) {
      this.pos.x -= gameAreaWidth
    }
    if (this.pos.x < -gameAreaWidth / 2) {
      this.pos.x += gameAreaWidth
    }
  }
}

class ShipThruster extends Actor {
  public constructor(engine: Engine) {
    super(engine)
    const lineRenderer = new LineRenderer(engine)
    lineRenderer.setPath('M -1 4 L 0 7 L 1 4')
    this.renderer = lineRenderer
    this.enabled = false
  }
}