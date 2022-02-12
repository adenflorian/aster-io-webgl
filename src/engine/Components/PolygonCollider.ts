import { Vector } from 'matter-js';
import { Collider2D } from './BasicPhysics';

export class PolygonCollider2D extends Collider2D {
  public constructor(public readonly vertices: readonly Vector[], public readonly concave?: boolean) {
    if (vertices.length < 3) {
      throw new Error('[PolygonCollider2D] vertices must have at least 3 vertices')
    }
    super()
  }
}
