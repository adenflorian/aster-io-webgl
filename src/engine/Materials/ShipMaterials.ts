import { createSquare, createTriangle } from '../buffers';
import { Colors, defaultSquareColors, defaultTriangleColors } from '../Color';
import { VertexAttribute } from '../Components/RendererComponent';
import { Engine } from '../Engine';
import { Shaders } from '../shaders';
import { Material } from './Material';

export class SquareMaterial extends Material {
  public constructor(engine: Engine, size: number = 1, colors: typeof defaultSquareColors | typeof Colors.red = [Colors.green, Colors.yellow, Colors.cyan, Colors.blue]) {
    const buffers = createSquare(engine.gl, size, colors)
    const vertexAttributes: VertexAttribute[] = [
      {
        variableName: 'aVertexPosition',
        numComponents: 2,
        type: 'FLOAT',
        normalize: false,
        stride: 0,
        offset: 0,
        buffer: buffers.position,
      },
      {
        variableName: 'aVertexColor',
        numComponents: 4,
        type: 'FLOAT',
        normalize: false,
        stride: 0,
        offset: 0,
        buffer: buffers.color,
      },
    ]
    super(engine, Shaders.mainVert, Shaders.mainFrag, vertexAttributes, 4)
  }
}

export class TriangleMaterial extends Material {
  public constructor(engine: Engine, size: number = 1, width: number = 1, colors: typeof defaultTriangleColors | typeof Colors.red = defaultTriangleColors,) {
    const buffers = createTriangle(engine.gl, size, width, colors)
    const vertexAttributes: VertexAttribute[] = [
      {
        variableName: 'aVertexPosition',
        numComponents: 2,
        type: 'FLOAT',
        normalize: false,
        stride: 0,
        offset: 0,
        buffer: buffers.position,
      },
      {
        variableName: 'aVertexColor',
        numComponents: 4,
        type: 'FLOAT',
        normalize: false,
        stride: 0,
        offset: 0,
        buffer: buffers.color,
      },
    ]
    super(engine, Shaders.mainVert, Shaders.mainFrag, vertexAttributes, 3)
  }
}