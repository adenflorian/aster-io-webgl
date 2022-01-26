import { Actor } from './Actor'
import { initBuffers } from './buffers'
import { clearScene, drawScene } from './draw'
import { initShaderProgram } from './shader-loading'
import { Shaders } from './shaders'

export class Engine {
  private readonly _actors = [] as Actor[]
  private _lastTimestamp: DOMHighResTimeStamp = 0
  private readonly _programInfo: any
  private readonly _buffers: any
  public get gl() { return this._gl }

  public constructor(
    private readonly _gl: WebGL2RenderingContext,
  ) {

    const shaderProgram = initShaderProgram(_gl, Shaders.mainVert, Shaders.mainFrag);

    this._programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: _gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
        vertexColor: _gl.getAttribLocation(shaderProgram, 'aVertexColor'),
      },
      uniformLocations: {
        projectionMatrix: _gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
        modelViewMatrix: _gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      },
    };

    this._buffers = initBuffers(_gl)
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
    requestAnimationFrame(this.loop)
  }

  public readonly update = (delta: number) => {
    this._actors.forEach(x => x.onUpdate(this, delta))
    clearScene(this._gl)
    this._actors.forEach(x => drawScene(this._gl, this._programInfo, this._buffers, x.pos, x.rotation))
  }
}