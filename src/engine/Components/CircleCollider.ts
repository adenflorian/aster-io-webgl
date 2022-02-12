import { Collider2D } from './BasicPhysics';

export class CircleCollider2D extends Collider2D {
  public constructor(public readonly radius: number) {
    super()
  }
}