import { Keyboard } from '../excalibur/engine'
import { Actor } from './Actor'
import { clearScene, drawActor } from './draw'

export class Engine {
  private readonly _actors = [] as Actor[]
  private _lastTimestamp: DOMHighResTimeStamp = 0
  public get gl() { return this._gl }
  public readonly input: EngineInput

  public constructor(
    private readonly _gl: WebGL2RenderingContext,
  ) {
    this.input = {
      keyboard: new Keyboard()
    }
    this.input.keyboard.init()
  }

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
    this.input.keyboard.update()
    requestAnimationFrame(this.loop)
  }

  public readonly update = (delta: number) => {
    clearScene(this._gl)
    for (const actor of this._actors) {
      this.updateActor(actor, delta)
    }
  }

  private readonly updateActor = (actor: Actor, delta: number) => {
    if (!actor.enabled) return
    actor.onUpdate(this, delta)
    actor.onPhysicsUpdate(this, delta)
    drawActor(this._gl, actor)
    for (const child of actor.children) {
      this.updateActor(child, delta)
    }
  }
}

interface EngineInput {
  readonly keyboard: Keyboard
}