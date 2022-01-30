import Color from 'color';
import { Vector } from '../excalibur/engine';
import { Engine } from './Engine';
import { VertexAttributeComponentDataType } from './gl-types';
import { tryCreateBuffer } from './gl-utils';

export class Mesh {
  public get vertexCount() { return this._positions.length }
  private readonly _positionsBuffer: WebGLBuffer
  private readonly _colorsBuffer: WebGLBuffer

  public constructor(
    engine: Engine,
    private readonly _positions: readonly Vector[] = [],
    private readonly _colors: readonly Color[] = [],
  ) {
    this._positionsBuffer = tryCreateBuffer(engine.gl)
    this._colorsBuffer = tryCreateBuffer(engine.gl)

    engine.gl.bindBuffer(engine.gl.ARRAY_BUFFER, this._positionsBuffer)
    engine.gl.bufferData(engine.gl.ARRAY_BUFFER, new Float32Array(this._positions.map(x => [x.x, x.y]).flat()), engine.gl.STATIC_DRAW)
    engine.gl.bindBuffer(engine.gl.ARRAY_BUFFER, this._colorsBuffer)
    engine.gl.bufferData(engine.gl.ARRAY_BUFFER, new Float32Array(this._colors.map(x => [x.red(), x.green(), x.blue(), x.alpha()]).flat()), engine.gl.STATIC_DRAW)
  }

  // public readonly setPositions = (positions: Vector[]) {

  // }

  public readonly getVertexAttributeData = () => {
    return [
      {
        variableName: 'aVertexPosition',
        numComponents: 2,
        type: 'FLOAT',
        normalize: false,
        stride: 0,
        offset: 0,
        buffer: this._positionsBuffer,
      },
      {
        variableName: 'aVertexColor',
        numComponents: 4,
        type: 'FLOAT',
        normalize: false,
        stride: 0,
        offset: 0,
        buffer: this._colorsBuffer,
      },
    ] as readonly MeshVertexAttributes[]
  }
}

export interface MeshVertexAttributes {
  readonly variableName: string
  readonly numComponents: number
  readonly type: VertexAttributeComponentDataType
  readonly normalize: boolean
  readonly stride: number
  readonly offset: number
  readonly buffer: WebGLBuffer
}