import { Keyboard } from '../excalibur/engine'
import { Actor } from './Actors/Actor'
import { clearScene, drawActor } from './draw'
import { Physics2D } from './Physics2D/Physics2D'

export class Engine {
  public readonly input: EngineInput
  public get gl() { return this._gl }
  public get canvasWidth() { return this._canvas.width }
  public get canvasHeight() { return this._canvas.height }
  public get aspectRatio() { return this.canvasWidth / this.canvasHeight }
  public get orthoWidth() { return this.aspectRatio * this.orthographicCameraSize }
  public get orthoHeight() { return this.orthographicCameraSize }
  public orthographicCameraSize = 100
  private readonly _actors = [] as Actor[]
  private readonly _gl: WebGL2RenderingContext
  private _lastTimestamp: DOMHighResTimeStamp = 0
  private readonly _physics2D: Physics2D;

  private readonly myData: HTMLDivElement = document.getElementById('myData')! as HTMLDivElement

  public constructor(
    private readonly _canvas: HTMLCanvasElement,
  ) {
    this._gl = getContext(this._canvas)

    this.input = {
      keyboard: new Keyboard()
    }
    this.input.keyboard.init()
    this._physics2D = new Physics2D(this);
  }

  public readonly add = (actor: Actor) => {
    this._actors.push(actor)
    if (actor.collider) {
      this._physics2D.add(actor, actor.collider)
    }
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
    this._physics2D.update(delta)
    for (const actor of this._actors) {
      this.updateActor(actor, delta)
    }
  }

  private readonly updateActor = (actor: Actor, delta: number) => {
    if (!actor.enabled) return
    actor.onUpdate(this, delta)
    actor.onPhysicsUpdate(this, delta)
    if (actor.renderer && actor.renderer.programInfo) {
      this.myData.textContent = 'my data: ' + JSON.stringify({ x: actor.pos.x.toFixed(2), y: actor.pos.y.toFixed(2), angle: actor.rotation.toFixed(2) })
      drawActor(this, actor.transform.getGlobalTransform(), actor.renderer.programInfo)
    }
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