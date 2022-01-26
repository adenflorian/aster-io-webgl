import { Engine } from './Engine'
import { vec } from '../excalibur/engine'

export abstract class Actor {
  public pos = vec()
  public rotation = 0

  public abstract onUpdate(game: Engine, delta: number): void
}