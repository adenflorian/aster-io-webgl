import Matter, { Bodies, Body, Common, IPair, World } from 'matter-js'
import { Actor } from '../Actors/Actor'
import { Collider2D } from '../Components/BasicPhysics'
import { CircleCollider2D } from '../Components/CircleCollider'
import { PolygonCollider2D } from '../Components/PolygonCollider'
import { Engine } from '../Engine'
import './matterjs-plugins'
import { Render } from './Render'
const polyDecomp = require('poly-decomp')

let foo = 0

export class Physics2D {
  private readonly _matterEngine = Matter.Engine.create()
  private readonly _actorBodies = new Map<Actor, Body>()
  private readonly _bodyActors = new Map<Body, Actor>()
  private readonly _timeStep = 1 / 144
  private _accumulator = 0
  private readonly matterData: HTMLDivElement = document.getElementById('matterData')! as HTMLDivElement

  public constructor(engine: Engine) {
    this._matterEngine.gravity.x = 0
    this._matterEngine.gravity.y = 0
    this._matterEngine.gravity.scale = 0

    // @ts-ignore
    const render = Render.create({
      element: document.getElementById('matterjs'),
      engine: this._matterEngine,
      options: {
        width: engine.canvasWidth,
        height: engine.canvasHeight,
        showAngleIndicator: true,
        showConvexHulls: false,
      }
    })

    // @ts-ignore
    Render.run(render);

    render.context.scale(engine.canvasWidth / engine.orthoWidth, -engine.canvasHeight / engine.orthoHeight)

    render.context.translate(engine.orthoWidth / 2, -engine.orthoHeight / 2);
  }

  public readonly update = (delta: number) => {
    // if (foo++ > 5) return
    this._accumulator += delta
    let dirty = false
    if (this._accumulator >= this._timeStep) {
      for (const [actor, body] of this._actorBodies) {
        if (body.isSensor) {
          this.matterData.textContent = 'matter data: ' + JSON.stringify({
            x: body.position.x.toFixed(2),
            y: body.position.y.toFixed(2),
            angle: body.angle.toFixed(2),
            vertices: body.vertices.map(x => ({ x: x.x, y: x.y })),
          })
          body.position.x = actor.pos.x
          body.position.y = actor.pos.y
          body.angle = actor.rotation
          // body.velocity.x = 0
          // body.velocity.y = 0
          // console.log(body)
        }
      }
    }
    while (this._accumulator >= this._timeStep) {
      dirty = true
      Matter.Engine.update(this._matterEngine, this._timeStep)
      this.handleCollisions();
      this._accumulator -= this._timeStep
    }
    if (dirty) {
      for (const [actor, body] of this._actorBodies) {
        if (!body.isSensor) {
          actor.pos.x = body.position.x
          actor.pos.y = body.position.y
          actor.rotation = body.angle
        }
      }
    }
  }

  private readonly handleCollisions = () => {
    const pairs = this._matterEngine.pairs as MyPairs

    for (const pair of pairs.collisionStart) {
      const parentA = pair.bodyA.parent
      const parentB = pair.bodyB.parent
      const parents = [parentA, parentB]
      if (!pairs.collisionActive.some(x => parents.includes(x.bodyA.parent) && parents.includes(x.bodyB.parent))) {
        this._bodyActors.get(pair.bodyA.parent)?.onCollisionStart()
        this._bodyActors.get(pair.bodyB.parent)?.onCollisionStart()
      }
    }

    for (const pair of pairs.collisionEnd) {
      const parentA = pair.bodyA.parent
      const parentB = pair.bodyB.parent
      const parents = [parentA, parentB]
      if (!pairs.collisionActive.some(x => parents.includes(x.bodyA.parent) && parents.includes(x.bodyB.parent))) {
        this._bodyActors.get(pair.bodyA.parent)?.onCollisionEnd()
        this._bodyActors.get(pair.bodyB.parent)?.onCollisionEnd()
      }
    }
  }

  public readonly add = (actor: Actor, collider: Collider2D) => {
    const newBody = createBodyFromCollider(actor, collider)
    World.add(this._matterEngine.world, newBody);
    this._actorBodies.set(actor, newBody)
    this._bodyActors.set(newBody, actor)
  }
}

function createBodyFromCollider(actor: Actor, collider: Collider2D) {
  if (collider instanceof CircleCollider2D) {
    return createCircleBodyFromCollider(actor, collider)
  } else if (collider instanceof PolygonCollider2D) {
    return createBodyFromVerticesFromCollider(actor, collider)
  } else {
    throw new Error('collider type not yet implemented')
  }
}

function createCircleBodyFromCollider(actor: Actor, collider: CircleCollider2D): Body {
  const newBody = Bodies.circle(actor.pos.x, actor.pos.y, collider.radius)
  newBody.isSensor = true
  return newBody
}

function createBodyFromVerticesFromCollider(actor: Actor, collider: PolygonCollider2D): Body {
  Common.setDecomp(collider.concave ? polyDecomp : undefined)
  // const newBody = Bodies.fromVertices(actor.pos.x, actor.pos.y, [[Vector.create(10, 10), Vector.create(-10, 10), Vector.create(10, -10)]])
  const newBody = Bodies.fromVertices(actor.pos.x, actor.pos.y, [collider.vertices.slice(0)])
  if (newBody === undefined) {
    throw new Error('Failed to create body from vertices')
  }
  newBody.isSensor = true
  console.log('newBody: ', newBody.vertices)
  console.log(collider.vertices)
  // Body.scale(newBody, actor.transform.scale.x, actor.transform.scale.y)
  return newBody
}

interface MyPairs {
  readonly table: { [key: string]: IPair }
  readonly list: readonly IPair[]
  readonly collisionStart: readonly IPair[]
  readonly collisionActive: readonly IPair[]
  readonly collisionEnd: readonly IPair[]
}