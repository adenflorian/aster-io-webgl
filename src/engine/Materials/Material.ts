import { Engine } from '../Engine'
import { FragmentShader, VertexShader } from '../shaders'

export abstract class Material {
  public constructor(
    engine: Engine,
    public vertexShaderCode: VertexShader,
    public fragmentShaderCode: FragmentShader,
  ) {
  }
}