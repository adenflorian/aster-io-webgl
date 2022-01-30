import { Engine } from '../Engine'
import { RenderingPrimitive } from '../gl-types'
import { Material } from '../Materials/Material'
import { initShaderProgram } from '../shader-loading'
import { Component } from './Component'

export abstract class RendererComponent extends Component {
  public programInfo?: ShaderProgramInfo

  private _material?: Material
  public set material(m: Material) {
    this._material = m
    this._loadShaders(m)
  }

  public constructor(
    private readonly _engine: Engine,
  ) {
    super()
  }

  private _loadShaders(material: Material) {
    const shaderProgram = initShaderProgram(this._engine.gl, material.vertexShaderCode, material.fragmentShaderCode)
    this.programInfo = {
      shaderProgram,
      vertexAttributes: material.vertexAttributes,
      uniformLocations: {
        projectionMatrix: tryGetUniformLocation(this._engine, shaderProgram, 'uProjectionMatrix'),
        modelViewMatrix: tryGetUniformLocation(this._engine, shaderProgram, 'uModelViewMatrix'),
      },
      vertexCount: material.vertexCount,
      drawMode: material.drawMode,
    }
    this.programInfo.vertexAttributes.forEach(x => {
      x.location = this._engine.gl.getAttribLocation(shaderProgram, x.variableName)
    });
  }
}

export interface VertexAttribute {
  readonly variableName: string
  readonly numComponents: number
  readonly type: VertexAttributeComponentDataType
  readonly normalize: boolean
  readonly stride: number
  readonly offset: number
  readonly buffer: WebGLBuffer
  location?: number
}

type VertexAttributeComponentDataType = 'BYTE' | 'SHORT' | 'UNSIGNED_BYTE' | 'UNSIGNED_SHORT' | 'FLOAT' | 'HALF_FLOAT'

export interface ShaderProgramInfo {
  shaderProgram: WebGLProgram,
  vertexAttributes: readonly VertexAttribute[],
  uniformLocations: {
    projectionMatrix: WebGLUniformLocation,
    modelViewMatrix: WebGLUniformLocation,
  },
  vertexCount: number,
  drawMode: RenderingPrimitive,
}

function tryGetUniformLocation(engine: Engine, shaderProgram: WebGLProgram, name: string) {
  const location = engine.gl.getUniformLocation(shaderProgram, name)
  if (!location) {
    throw new Error('[tryGetUniformLocation] uniform location null: ' + JSON.stringify({ engine, shaderProgram, name }, null, 2))
  }
  return location
}