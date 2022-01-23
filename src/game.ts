import { clearScene, drawScene } from './draw'
import { vec } from './excalibur/engine'

abstract class Actor {
  public pos = vec()
  public rotation = 0

  public abstract onUpdate(game: Game, delta: number): void
}

export class PlayerShip extends Actor {
  public readonly onUpdate = (game: Game, delta: number) => {
    this.rotation += delta / 2
    this.pos.x = -2
    this.pos.y = Math.sin(Date.now() / 1000)
  }
}

export class PlayerShip2 extends Actor {
  public readonly onUpdate = (game: Game, delta: number) => {
    this.rotation += delta / 3
    this.pos.x = Math.sin(Date.now() / 1000) / 0.5
    this.pos.y = -1
  }
}

export class Game {
  private readonly actors = [] as Actor[]
  private lastTimestamp: DOMHighResTimeStamp = 0

  public constructor(
    private readonly gl: WebGL2RenderingContext,
    private readonly programInfo: any,
    private readonly buffers: any,
  ) { }

  public readonly add = (actor: Actor) => {
    this.actors.push(actor)
  }

  public readonly start = () => {
    requestAnimationFrame(this.loop)
  }

  public readonly loop = (timestamp: DOMHighResTimeStamp) => {
    const delta = timestamp - this.lastTimestamp
    this.lastTimestamp = timestamp
    this.update(delta / 1000)
    requestAnimationFrame(this.loop)
  }

  public readonly update = (delta: number) => {
    this.actors.forEach(x => x.onUpdate(this, delta))
    clearScene(this.gl)
    this.actors.forEach(x => drawScene(this.gl, this.programInfo, this.buffers, x.pos, x.rotation))
  }
}