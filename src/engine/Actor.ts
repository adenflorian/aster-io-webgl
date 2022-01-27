import { Engine } from './Engine'
import { vec } from '../excalibur/engine'
import { Material } from './Materials/Material'

export abstract class Actor {
  public pos = vec()
  public vel = vec()
  public drag = 1
  public rotation = 0
  public material?: Material
  public abstract onUpdate(game: Engine, delta: number): void
  public onPhysicsUpdate(game: Engine, delta: number) {
    this.pos = this.pos.add(this.vel.scale(delta))
    if (this.vel.size > 0) {
      if (this.vel.size < 0.0001) {
        this.vel.scale(0)
      } else {
        this.vel = this.vel.scale(this.drag)
      }
    }
  }
}