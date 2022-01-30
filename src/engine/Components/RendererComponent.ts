import { Engine } from '../Engine'
import { Component } from './Component'
import { ShaderProgramInfo } from './VertexStuff'

export abstract class RendererComponent extends Component {
  public programInfo?: ShaderProgramInfo

  protected get _gl() { return this._engine.gl }

  public constructor(
    protected readonly _engine: Engine,
  ) {
    super()
  }
}