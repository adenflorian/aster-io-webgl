import { createSquare, createTriangle } from '../buffers';
import { Colors } from '../Color';
import { Engine } from '../Engine';
import { Shaders } from '../shaders';
import { Material, VertexAttributes } from './Material';

export class SquareMaterial extends Material {
  public constructor(engine: Engine) {
    const buffers = createSquare(engine.gl, 1, [Colors.green, Colors.yellow, Colors.cyan, Colors.blue])
    const vertexAttributes: VertexAttributes = new Map([
      ['position', {
        variableName: 'aVertexPosition',
        numComponents: 2,
        type: 'FLOAT',
        normalize: false,
        stride: 0,
        offset: 0,
        buffer: buffers.position,
      }],
      ['color', {
        variableName: 'aVertexColor',
        numComponents: 4,
        type: 'FLOAT',
        normalize: false,
        stride: 0,
        offset: 0,
        buffer: buffers.color,
      }]
    ])
    super(engine, Shaders.mainVert, Shaders.mainFrag, vertexAttributes, 4)
  }
}

export class TriangleMaterial extends Material {
  public constructor(engine: Engine) {
    const buffers = createTriangle(engine.gl, 0.75)
    const vertexAttributes: VertexAttributes = new Map([
      ['position', {
        variableName: 'aVertexPosition',
        numComponents: 2,
        type: 'FLOAT',
        normalize: false,
        stride: 0,
        offset: 0,
        buffer: buffers.position,
      }],
      ['color', {
        variableName: 'aVertexColor',
        numComponents: 4,
        type: 'FLOAT',
        normalize: false,
        stride: 0,
        offset: 0,
        buffer: buffers.color,
      }]
    ])
    super(engine, Shaders.altVert, Shaders.altFrag, vertexAttributes, 3)
  }
}