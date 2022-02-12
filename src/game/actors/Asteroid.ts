import Color from 'color';
import { Actor } from '../../engine/Actors/Actor';
import { LineRenderer } from '../../engine/Components/LineRenderer';
import { PolygonCollider2D } from '../../engine/Components/PolygonCollider';
import { Engine } from '../../engine/Engine';

export class Asteroid extends Actor {
  private offset = Math.random() * Math.PI * 2
  private readonly _lineRenderer: LineRenderer

  public constructor(engine: Engine, xPos: number) {
    super(engine)
    this._lineRenderer = new LineRenderer(engine)
    this._lineRenderer.setPath('M -10 6 L -13 -1 L -10 -3 L -10 -5 L -14 -7 L -10 -15 L 0 -17 L 4 -12 L 12 -9 L 13 -2 L 10 4 L 2 8')
    this.renderer = this._lineRenderer
    const scale = 1// + (Math.random() * 0.3)
    this.transform.scale.x = scale
    this.transform.scale.y = scale
    // this.pos.x = xPos
    this.collider = new PolygonCollider2D(this._lineRenderer.vertices, true)
    // this.rotation = Math.random() * Math.PI * 2
  }

  public readonly onUpdate = (_: Engine, delta: number) => {
    // this.rotation += delta / 1
    // this.pos.y = 0.4
  }

  public readonly onCollisionStart = () => {
    console.log('Asteroid onCollisionStart')
    this._lineRenderer.color = Color('red')
  }

  public readonly onCollisionEnd = () => {
    console.log('Asteroid onCollisionEnd')
    this._lineRenderer.color = Color('white')
  }
}