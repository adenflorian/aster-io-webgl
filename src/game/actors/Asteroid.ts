import { Actor } from '../../engine/Actors/Actor';
import { BasicPhysics } from '../../engine/Components/BasicPhysics';
import { LineRenderer } from '../../engine/Components/LineRenderer';
import { Engine } from '../../engine/Engine';

export class Asteroid extends Actor {
  public constructor(engine: Engine) {
    super(engine)
    const lineRenderer = new LineRenderer(engine)
    lineRenderer.setPath('M -10 6 L -13 -1 L -10 -3 L -10 -5 L -14 -7 L -10 -15 L 0 -17 L 4 -12 L 12 -9 L 13 -2 L 10 4 L 2 8')
    this.renderer = lineRenderer
    const scale = 0.07
    this.transform.scale.x = scale
    this.transform.scale.y = scale
    this.body = new BasicPhysics()
    this.pos.x = -2
  }
  public readonly onUpdate = (_: Engine, delta: number) => {
    this.rotation += delta / 5
    this.pos.y = Math.sin(Date.now() / 1000)
  }
}