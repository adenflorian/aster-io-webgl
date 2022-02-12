import { vec, Vector } from '../../excalibur/engine'
import { Collider2D } from '../Components/BasicPhysics'
import { RendererComponent } from '../Components/RendererComponent'
import { Engine } from '../Engine'
import { Material } from '../Materials/Material'
import { TransformComponent } from '../Transform'

export abstract class Actor {
  public enabled = true
  public vel = vec()
  public get pos() { return this.transform.pos }
  public set pos(val: Vector) { this.transform.pos = val }
  /** Rotation in radians. */
  public get rotation() { return this.transform.rotation }
  public set rotation(val: number) { this.transform.rotation = val }
  private _transform = new TransformComponent(this)
  public get transform() { return this._transform }
  private _parent?: Actor
  public get parent() { return this._parent }
  public physics = false
  public drag = 1
  public material?: Material
  private _children: Actor[] = []
  public get children() { return this._children }
  public renderer?: RendererComponent
  public collider?: Collider2D

  public constructor(protected _engine: Engine) {
  }

  public onUpdate(game: Engine, delta: number): void { }

  public addChild<T extends Actor>(child: T) {
    this._children.push(child)
    child.setParent(this)
    return child
  }

  public onPhysicsUpdate(game: Engine, delta: number) {
    if (!this.physics) return
    if (!this.enabled) return
    this.pos = this.pos.add(this.vel.scale(delta))
    if (this.vel.size > 0) {
      if (this.vel.size < 0.0001) {
        this.vel.scale(0)
      } else {
        this.vel = this.vel.scale(this.drag)
      }
    }
  }

  private setParent(newParent: Actor) {
    this._parent = newParent
  }

  public readonly onCollisionStart = () => {

  }

  public readonly onCollisionEnd = () => {

  }
}