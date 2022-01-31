import Color from 'color';
import { getColorArray } from '../Color';
import { Engine } from '../Engine';
import { RenderingPrimitive } from '../gl-types';
import { Material } from '../Materials/Material';
import { Mesh } from '../Mesh';
import { initShaderProgram } from '../shader-loading';
import { RendererComponent } from './RendererComponent';
import { tryGetUniformLocation } from './VertexStuff';

export class MeshRenderer extends RendererComponent {

  private _material?: Material
  public set material(m: Material) {
    this._material = m
    this._updateProgram()
  }

  private _mesh?: Mesh
  public set mesh(m: Mesh) {
    this._mesh = m
    this._updateProgram()
  }

  private _colorArray = [1, 1, 1, 1]
  public set color(x: Color) {
    this._colorArray = getColorArray(x)
    if (this.programInfo) {
      this.programInfo.color = this._colorArray
    }
  }

  public constructor(engine: Engine) {
    super(engine)
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
        color: tryGetUniformLocation(this._engine, shaderProgram, 'uColor'),
      },
      vertexCount: this._mesh.vertexCount,
      // drawMode: RenderingPrimitive.TRIANGLE_STRIP,
      drawMode: RenderingPrimitive.LINE_LOOP,
      color: this._colorArray,
    }
  }
}