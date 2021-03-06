import Color from 'color';
import { vec, Vector } from '../../excalibur/engine';
import { getColorArray } from '../Color';
import { Engine } from '../Engine';
import { RenderingPrimitive } from '../gl-types';
import { tryGetAttribLocation } from '../gl-utils';
import { DefaultMaterial } from '../Materials/DefaultMaterial';
import { Material } from '../Materials/Material';
import { Mesh } from '../Mesh';
import { initShaderProgram } from '../shader-loading';
import { RendererComponent } from './RendererComponent';
import { tryGetUniformLocation } from './VertexStuff';

export class LineRenderer extends RendererComponent {

  private _material: Material

  private _mesh: Mesh

  private _colorArray = [1, 1, 1, 1]
  public set color(x: Color) {
    this._colorArray = getColorArray(x)
    if (this.programInfo) {
      this.programInfo.color = this._colorArray
    }
  }

  public constructor(engine: Engine) {
    super(engine)
    this._mesh = new Mesh(engine)
    this._material = new DefaultMaterial(engine)
  }

  public readonly setPath = (path: string) => {
    const args = path.split(' ')
    let i = 0
    let cursor = vec(0, 0)
    let lastCommand: string | undefined

    let positions: Vector[] = []

    while (true) {
      const command = args[i]

      if (!command) break;

      if (command === 'M') {
        const x = args[i + 1]
        const y = args[i + 2]
        cursor.x = Number.parseFloat(x)
        cursor.y = -Number.parseFloat(y)
        i += 3
      }

      if (command === 'L') {
        if (lastCommand === 'M') {
          positions.push(cursor.clone())
        }
        const x = args[i + 1]
        const y = args[i + 2]
        positions.push(vec(Number.parseFloat(x), -Number.parseFloat(y)))
        i += 3
      }

      lastCommand = command
    }

    const vertexCount = positions.length
    const colors = new Array(vertexCount).fill(0).map(_ => Color('red').hue(0.5 - Math.random()))

    this._mesh = new Mesh(this._engine, positions, colors)

    this._updateProgram()
  }

  private _updateProgram() {
    if (!this._material || !this._mesh) return

    const shaderProgram = initShaderProgram(this._engine.gl, this._material.vertexShaderCode, this._material.fragmentShaderCode)
    this.programInfo = {
      shaderProgram,
      vertexAttributes: this._mesh.getVertexAttributeData().map(x => ({
        ...x,
        location: tryGetAttribLocation(this._engine.gl, shaderProgram, x.variableName),
      })),
      uniformLocations: {
        projectionMatrix: tryGetUniformLocation(this._engine, shaderProgram, 'uProjectionMatrix'),
        modelViewMatrix: tryGetUniformLocation(this._engine, shaderProgram, 'uModelViewMatrix'),
        color: tryGetUniformLocation(this._engine, shaderProgram, 'uColor'),
      },
      vertexCount: this._mesh.vertexCount,
      drawMode: RenderingPrimitive.LINE_LOOP,
      color: this._colorArray,
    }
  }
}

class LineRendererMaterial extends Material {

}