import Color from 'color';
import { Actor } from '../../engine/Actors/Actor';
import { BasicPhysics } from '../../engine/Components/BasicPhysics';
import { LineRenderer } from '../../engine/Components/LineRenderer';
import { Engine } from '../../engine/Engine';

export class Asteroid extends Actor {
  private offset = Math.random() * Math.PI * 2
  private readonly _lineRenderer: LineRenderer
  public constructor(engine: Engine, xPos: number) {
    super(engine)
    this._lineRenderer = new LineRenderer(engine)
    this._lineRenderer.setPath('M -10 6 L -13 -1 L -10 -3 L -10 -5 L -14 -7 L -10 -15 L 0 -17 L 4 -12 L 12 -9 L 13 -2 L 10 4 L 2 8')
    this.renderer = this._lineRenderer
    const scale = 0.05 + (Math.random() * 0.03)
    this.transform.scale.x = scale
    this.transform.scale.y = scale
    this.body = new BasicPhysics()
    this.pos.x = xPos
    this.rotation = Math.random() * Math.PI * 2
  }
  public readonly onUpdate = (_: Engine, delta: number) => {
    this.rotation += delta / 5
    this.pos.y = Math.sin((Date.now() / 1000) + this.offset)
  }

  public readonly onCollisionStart = () => {
    this._lineRenderer.color = Color('red')
  }

  public readonly onCollisionEnd = () => {
    this._lineRenderer.color = Color('white')
  }
}