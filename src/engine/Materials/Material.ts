import { Engine } from '../Engine'
import { initShaderProgram } from '../shader-loading'
import { FragmentShader, VertexShader } from '../shaders'

export abstract class Material {
  public shaderProgram: WebGLProgram

  public constructor(
    engine: Engine,
    public vertexShaderCode: VertexShader,
    public fragmentShaderCode: FragmentShader,
  ) {
    this.shaderProgram = initShaderProgram(engine.gl, this.vertexShaderCode, this.fragmentShaderCode)
  }
}