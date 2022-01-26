import { Engine } from './Engine'
import { vec } from '../excalibur/engine'
import { Material } from './Materials/Material'

export abstract class Actor {
  public pos = vec()
  public rotation = 0
  public material?: Material
  public abstract onUpdate(game: Engine, delta: number): void
}