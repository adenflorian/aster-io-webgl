import { Actor } from './Actor'
import { clearScene, drawActor } from './draw'

export class Engine {
  private readonly _actors = [] as Actor[]
  private _lastTimestamp: DOMHighResTimeStamp = 0
  public get gl() { return this._gl }

  public constructor(
    private readonly _gl: WebGL2RenderingContext,
  ) { }

  public readonly add = (actor: Actor) => {
    this._actors.push(actor)
  }

  public readonly start = () => {
    requestAnimationFrame(this.loop)
  }

  public readonly loop = (timestamp: DOMHighResTimeStamp) => {
    const delta = timestamp - this._lastTimestamp
    this._lastTimestamp = timestamp
    this.update(delta / 1000)
    requestAnimationFrame(this.loop)
  }

  public readonly update = (delta: number) => {
    clearScene(this._gl)
    for (const actor of this._actors) {
      actor.onUpdate(this, delta)
      drawActor(this._gl, actor)
    }
  }
}