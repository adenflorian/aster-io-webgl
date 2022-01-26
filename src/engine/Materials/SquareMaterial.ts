import { initBuffers } from '../buffers';
import { Engine } from '../Engine';
import { Shaders } from '../shaders';
import { Material, VertexAttributes } from './Material';

export class SquareMaterial extends Material {
  public constructor(engine: Engine) {
    const buffers = initBuffers(engine.gl)
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
    super(engine, Shaders.mainVert, Shaders.mainFrag, vertexAttributes)
  }
}

export class AltMaterial extends Material {
  public constructor(engine: Engine) {
    const buffers = initBuffers(engine.gl)
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
    super(engine, Shaders.altVert, Shaders.altFrag, vertexAttributes)
  }
}