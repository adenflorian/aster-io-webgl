import { Keyboard } from '../excalibur/engine'
import { Actor } from './Actor'
import { clearScene, drawActor } from './draw'

export class Engine {
  public readonly input: EngineInput
  public get gl() { return this._gl }
  public get canvasWidth() { return this._canvas.width }
  public get canvasHeight() { return this._canvas.height }
  public get aspectRatio() { return this.canvasWidth / this.canvasHeight }
  public get orthoWidth() { return this.aspectRatio * this.orthographicCameraSize }
  public get orthoHeight() { return this.orthographicCameraSize }
  public orthographicCameraSize = 6
  private readonly _actors = [] as Actor[]
  private readonly _gl: WebGL2RenderingContext
  private _lastTimestamp: DOMHighResTimeStamp = 0

  public constructor(
    private readonly _canvas: HTMLCanvasElement,
  ) {
    this._gl = getContext(this._canvas)

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
    drawActor(this, actor)
    for (const child of actor.children) {
      this.updateActor(child, delta)
    }
  }
}

function getContext(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl2')

  // Only continue if WebGL is available and working
  if (gl === null) {
    throw new Error('Unable to initialize WebGL. Your browser or machine may not support it.');
  }

  return gl
}

interface EngineInput {
  readonly keyboard: Keyboard
}