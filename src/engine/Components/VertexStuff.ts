import { Engine } from '../Engine'
import { RenderingPrimitive, VertexAttributeComponentDataType } from '../gl-types'

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

export interface ShaderProgramInfo {
  shaderProgram: WebGLProgram,
  vertexAttributes: readonly VertexAttribute[],
  uniformLocations: {
    projectionMatrix: WebGLUniformLocation,
    modelViewMatrix: WebGLUniformLocation,
    color: WebGLUniformLocation,
  },
  vertexCount: number,
  drawMode: RenderingPrimitive,
  color: number[],
}

export function tryGetUniformLocation(engine: Engine, shaderProgram: WebGLProgram, name: string) {
  const location = engine.gl.getUniformLocation(shaderProgram, name)
  if (!location) {
    throw new Error('[tryGetUniformLocation] uniform location null: ' + JSON.stringify({ engine, shaderProgram, name }, null, 2))
  }
  return location
}