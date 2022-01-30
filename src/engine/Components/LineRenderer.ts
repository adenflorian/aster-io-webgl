import Color from 'color';
import { vec } from '../../excalibur/engine';
import { Engine } from '../Engine';
import { RenderingPrimitive } from '../gl-types';
import { DefaultMaterial } from '../Materials/DefaultMaterial';
import { Material } from '../Materials/Material';
import { Mesh } from '../Mesh';
import { initShaderProgram } from '../shader-loading';
import { RendererComponent } from './RendererComponent';
import { tryGetUniformLocation } from './VertexStuff';

export class LineRenderer extends RendererComponent {

  private _material: Material

  private _mesh: Mesh

  public constructor(engine: Engine) {
    super(engine)
    this._mesh = new Mesh(engine)
    this._material = new DefaultMaterial(engine)
  }

  public readonly setPath = (path: string) => {

    // TODO Create vertex positions based on svg path string

    const positions = [
      vec(0.5, 0.8),
      vec(-1.0, 1.3),
      vec(-0.7, -1.0),
      vec(0.9, -1.7),
      vec(0.3, -1.1),
    ]

    const vertexCount = positions.length
    const colors = new Array(vertexCount).fill(0).map(_ => Color('white'))

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
        location: this._engine.gl.getAttribLocation(shaderProgram, x.variableName),
      })),
      uniformLocations: {
        projectionMatrix: tryGetUniformLocation(this._engine, shaderProgram, 'uProjectionMatrix'),
        modelViewMatrix: tryGetUniformLocation(this._engine, shaderProgram, 'uModelViewMatrix'),
      },
      vertexCount: this._mesh.vertexCount,
      // drawMode: RenderingPrimitive.TRIANGLE_STRIP,
      drawMode: RenderingPrimitive.LINE_LOOP,
    }
  }
}

class LineRendererMaterial extends Material {

}