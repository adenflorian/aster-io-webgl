import { VertexAttribute } from '../Components/RendererComponent'
import { Engine } from '../Engine'
import { RenderingPrimitive } from '../gl-types'
import { FragmentShader, VertexShader } from '../shaders'

export abstract class Material {
  public constructor(
    engine: Engine,
    public vertexShaderCode: VertexShader,
    public fragmentShaderCode: FragmentShader,
    public vertexAttributes: readonly VertexAttribute[],
    public vertexCount: number,
    public drawMode: RenderingPrimitive = RenderingPrimitive.LINE_LOOP,
  ) {
  }
}