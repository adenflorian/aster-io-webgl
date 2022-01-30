import { Actor } from '../../engine/Actors/Actor';
import { Colors } from '../../engine/Color';
import { MeshRenderer } from '../../engine/Components/MeshRenderer';
import { Engine } from '../../engine/Engine';
import { SquareMaterial } from '../../engine/Materials/ShipMaterials';

export class Asteroid extends Actor {
  public constructor(engine: Engine) {
    super()
    this.renderer = new MeshRenderer(engine)
    this.renderer.material = new SquareMaterial(engine, 0.8, Colors.white);
  }
  public readonly onUpdate = (_: Engine, delta: number) => {
    this.rotation += delta / 5
    this.pos.x = -2
    this.pos.y = Math.sin(Date.now() / 1000)
  }
}