import { Actor } from './Actor'
import { initBuffers } from './buffers'
import { clearScene, drawScene } from './draw'
import { initShaderProgram } from './shader-loading'
import vsSource from './shaders/main_vert.glsl'
import fsSource from './shaders/main_frag.glsl'

export class Engine {
  private readonly actors = [] as Actor[]
  private lastTimestamp: DOMHighResTimeStamp = 0
  private readonly programInfo: any
  private readonly buffers: any

  public constructor(
    private readonly gl: WebGL2RenderingContext,
  ) {

    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

    this.programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
        vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
      },
      uniformLocations: {
        projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
        modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      },
    };

    this.buffers = initBuffers(gl)
  }

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