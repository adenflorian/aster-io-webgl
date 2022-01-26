import { Engine } from '../Engine'
import { initShaderProgram } from '../shader-loading'
import { FragmentShader, VertexShader } from '../shaders'

export abstract class Material {
  public shaderProgram: WebGLProgram
  public programInfo: ShaderProgramInfo

  public constructor(
    engine: Engine,
    public vertexShaderCode: VertexShader,
    public fragmentShaderCode: FragmentShader,
    public vertexAttributes: VertexAttributes,
  ) {
    this.shaderProgram = initShaderProgram(engine.gl, this.vertexShaderCode, this.fragmentShaderCode)
    this.programInfo = {
      uniformLocations: {
        projectionMatrix: tryGetUniformLocation(engine, this.shaderProgram, 'uProjectionMatrix'),
        modelViewMatrix: tryGetUniformLocation(engine, this.shaderProgram, 'uModelViewMatrix'),
      },
    }
    this.vertexAttributes.forEach(x => {
      x.location = engine.gl.getAttribLocation(this.shaderProgram, x.variableName)
    });
  }
}

function tryGetUniformLocation(engine: Engine, shaderProgram: WebGLProgram, name: string) {
  const location = engine.gl.getUniformLocation(shaderProgram, name)
  if (!location) {
    throw new Error('[tryGetUniformLocation] uniform location null: ' + JSON.stringify({ engine, shaderProgram, name }, null, 2))
  }
  return location
}

export interface VertexAttributes extends ReadonlyMap<string, VertexAttribute> { }

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

interface ShaderProgramInfo {
  uniformLocations: {
    projectionMatrix: WebGLUniformLocation,
    modelViewMatrix: WebGLUniformLocation,
  },
}