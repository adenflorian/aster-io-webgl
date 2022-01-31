import { Bodies, Body, Engine, Events, World } from 'matter-js'
import { Actor } from '../Actors/Actor'

export class Physics2D {
  private readonly _matterEngine = Engine.create()
  private readonly _actorBodies = new Map<Actor, Body>()
  private readonly _bodyActors = new Map<Body, Actor>()
  private readonly _timeStep = 1 / 5
  private _accumulator = 0

  public constructor() {
    this._matterEngine.gravity.x = 0
    this._matterEngine.gravity.y = 0
    this._matterEngine.gravity.scale = 0

    Events.on(this._matterEngine, 'collisionStart', e => {
      for (const pair of e.pairs) {
        this._bodyActors.get(pair.bodyA)?.onCollisionStart()
        this._bodyActors.get(pair.bodyB)?.onCollisionStart()
      }
    })

    Events.on(this._matterEngine, 'collisionEnd', e => {
      for (const pair of e.pairs) {
        this._bodyActors.get(pair.bodyA)?.onCollisionEnd()
        this._bodyActors.get(pair.bodyB)?.onCollisionEnd()
      }
    })
  }

  public readonly update = (delta: number) => {
    this._accumulator += delta
    let dirty = false
    while (this._accumulator >= this._timeStep) {
      dirty = true
      Engine.update(this._matterEngine, this._timeStep)
      this._accumulator -= this._timeStep
    }
    if (dirty) {
      for (const [actor, body] of this._actorBodies) {
        if (body.isSensor) {
          body.position.x = actor.pos.x
          body.position.y = actor.pos.y
        } else {
          actor.pos.x = body.position.x
          actor.pos.y = body.position.y
        }
      }
    }
  }

  public readonly add = (actor: Actor) => {
    const newBody = Bodies.circle(actor.pos.x, actor.pos.y, 0.8)
    newBody.isSensor = true
    World.add(this._matterEngine.world, newBody);
    this._actorBodies.set(actor, newBody)
    this._bodyActors.set(newBody, actor)
  }
}