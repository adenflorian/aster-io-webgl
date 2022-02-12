import Matter, { Axes, Body, Bounds, Common, Composite, Constraint, Detector, Engine, Events, Pairs, Resolver, Vector, Vertices } from 'matter-js';

const MyPlugin = {
  name: 'matter-my-plugin',

  version: '0.1.0',

  for: 'matter-js@^0.18.0',

  install: function (matter) {
    // patch `matter` here (not the global Matter object)
    // @ts-ignore
    matter.Resolver.preSolvePosition = function (pairs) {
      let i,
        pair,
        activeCount,
        pairsLength = pairs.length;

      // find total contacts on each body
      for (i = 0; i < pairsLength; i++) {
        pair = pairs[i];

        if (!pair.isActive || pair.isSensor)
          continue;

        activeCount = pair.activeContacts.length;
        pair.collision.parentA.totalContacts += activeCount;
        pair.collision.parentB.totalContacts += activeCount;
      }
    };

    matter.Resolver.postSolvePosition = function (bodies) {
      var positionWarming = Resolver._positionWarming,
        bodiesLength = bodies.length,
        verticesTranslate = Vertices.translate,
        boundsUpdate = Bounds.update;

      for (var i = 0; i < bodiesLength; i++) {
        var body = bodies[i],
          positionImpulse = body.positionImpulse,
          positionImpulseX = positionImpulse.x,
          positionImpulseY = positionImpulse.y,
          velocity = body.velocity;

        if (body.isSensor)
          continue;

        // reset contact count
        body.totalContacts = 0;

        if (positionImpulseX !== 0 || positionImpulseY !== 0) {
          // update body geometry
          for (var j = 0; j < body.parts.length; j++) {
            var part = body.parts[j];
            verticesTranslate(part.vertices, positionImpulse);
            boundsUpdate(part.bounds, part.vertices, velocity);
            part.position.x += positionImpulseX;
            part.position.y += positionImpulseY;
          }

          // move the body without changing velocity
          body.positionPrev.x += positionImpulseX;
          body.positionPrev.y += positionImpulseY;

          if (positionImpulseX * velocity.x + positionImpulseY * velocity.y < 0) {
            // reset cached impulse if the body has velocity along it
            positionImpulse.x = 0;
            positionImpulse.y = 0;
          } else {
            // warm the next iteration
            positionImpulse.x *= positionWarming;
            positionImpulse.y *= positionWarming;
          }
        }
      }
    };
    matter.Body.update = function (body, deltaTime, timeScale, correction) {
      if (body.isSensor) {
        return;
      }

      var deltaTimeSquared = Math.pow(deltaTime * timeScale * body.timeScale, 2);

      // from the previous step
      var frictionAir = 1 - body.frictionAir * timeScale * body.timeScale,
        velocityPrevX = body.position.x - body.positionPrev.x,
        velocityPrevY = body.position.y - body.positionPrev.y;

      // update velocity with Verlet integration
      body.velocity.x = (velocityPrevX * frictionAir * correction) + (body.force.x / body.mass) * deltaTimeSquared;
      body.velocity.y = (velocityPrevY * frictionAir * correction) + (body.force.y / body.mass) * deltaTimeSquared;

      body.positionPrev.x = body.position.x;
      body.positionPrev.y = body.position.y;
      body.position.x += body.velocity.x;
      body.position.y += body.velocity.y;

      // update angular velocity with Verlet integration
      body.angularVelocity = ((body.angle - body.anglePrev) * frictionAir * correction) + (body.torque / body.inertia) * deltaTimeSquared;
      body.anglePrev = body.angle;
      body.angle += body.angularVelocity;

      // track speed and acceleration
      body.speed = Vector.magnitude(body.velocity);
      body.angularSpeed = Math.abs(body.angularVelocity);

      // transform the body geometry
      for (var i = 0; i < body.parts.length; i++) {
        var part = body.parts[i];

        Vertices.translate(part.vertices, body.velocity);

        if (i > 0) {
          part.position.x += body.velocity.x;
          part.position.y += body.velocity.y;
        }

        if (body.angularVelocity !== 0) {
          Vertices.rotate(part.vertices, body.angularVelocity, body.position);
          Axes.rotate(part.axes, body.angularVelocity);
          if (i > 0) {
            Vector.rotateAbout(part.position, body.angularVelocity, body.position, part.position);
          }
        }

        Bounds.update(part.bounds, part.vertices, body.velocity);
      }
    };
    matter.Body.setVertices = function (body, vertices) {
      // change vertices
      if (vertices[0].body === body) {
        body.vertices = vertices;
      } else {
        body.vertices = Vertices.create(vertices, body);
      }

      // update properties
      body.axes = Axes.fromVertices(body.vertices);
      body.area = Vertices.area(body.vertices);
      Body.setMass(body, body.density * body.area);

      // orient vertices around the centre of mass at origin (0, 0)
      // var centre = Vertices.centre(body.vertices);
      // Vertices.translate(body.vertices, centre, -1);

      // update inertia while vertices are at origin (0, 0)
      Body.setInertia(body, Body._inertiaScale * Vertices.inertia(body.vertices, body.mass));

      // update geometry
      Vertices.translate(body.vertices, body.position);
      Bounds.update(body.bounds, body.vertices, body.velocity);
    };
    matter.Engine.update = function (engine, delta, correction) {
      var startTime = Common.now();

      delta = delta || 1000 / 60;
      correction = correction || 1;

      var world = engine.world,
        detector = engine.detector,
        pairs = engine.pairs,
        timing = engine.timing,
        timestamp = timing.timestamp,
        i;

      // increment timestamp
      timing.timestamp += delta * timing.timeScale;
      timing.lastDelta = delta * timing.timeScale;

      // create an event object
      var event = {
        timestamp: timing.timestamp
      };

      Events.trigger(engine, 'beforeUpdate', event);

      // get all bodies and all constraints in the world
      var allBodies = Composite.allBodies(world),
        allConstraints = Composite.allConstraints(world);

      // update the detector bodies if they have changed
      if (world.isModified) {
        Detector.setBodies(detector, allBodies);
      }

      // reset all composite modified flags
      if (world.isModified) {
        Composite.setModified(world, false, false, true);
      }

      // update sleeping if enabled
      if (engine.enableSleeping)
        Sleeping.update(allBodies, timing.timeScale);

      // apply gravity to all bodies
      Engine._bodiesApplyGravity(allBodies, engine.gravity);

      // update all body position and rotation by integration
      Engine._bodiesUpdate(allBodies, delta, timing.timeScale, correction, world.bounds);

      // update all constraints (first pass)
      Constraint.preSolveAll(allBodies);
      for (i = 0; i < engine.constraintIterations; i++) {
        Constraint.solveAll(allConstraints, timing.timeScale);
      }
      Constraint.postSolveAll(allBodies);

      // find all collisions
      detector.pairs = engine.pairs;
      var collisions = Detector.collisions(detector);

      // update collision pairs
      Pairs.update(pairs, collisions, timestamp);

      // wake up bodies involved in collisions
      if (engine.enableSleeping)
        Sleeping.afterCollisions(pairs.list, timing.timeScale);

      // trigger collision events
      if (pairs.collisionStart.length > 0)
        Events.trigger(engine, 'collisionStart', { pairs: pairs.collisionStart });

      // iteratively resolve position between collisions
      Resolver.preSolvePosition(pairs.list);
      for (i = 0; i < engine.positionIterations; i++) {
        Resolver.solvePosition(pairs.list, timing.timeScale);
      }
      Resolver.postSolvePosition(allBodies);

      // update all constraints (second pass)
      Constraint.preSolveAll(allBodies);
      for (i = 0; i < engine.constraintIterations; i++) {
        Constraint.solveAll(allConstraints, timing.timeScale);
      }
      Constraint.postSolveAll(allBodies);

      // iteratively resolve velocity between collisions
      Resolver.preSolveVelocity(pairs.list);
      for (i = 0; i < engine.velocityIterations; i++) {
        Resolver.solveVelocity(pairs.list, timing.timeScale);
      }

      // trigger collision events
      if (pairs.collisionActive.length > 0)
        Events.trigger(engine, 'collisionActive', { pairs: pairs.collisionActive });

      if (pairs.collisionEnd.length > 0)
        Events.trigger(engine, 'collisionEnd', { pairs: pairs.collisionEnd });

      // clear force buffers
      Engine._bodiesClearForces(allBodies);

      Events.trigger(engine, 'afterUpdate', event);

      // log the time elapsed computing this update
      engine.timing.lastElapsed = Common.now() - startTime;

      return engine;
    };
  },

  // implement your plugin functions etc...
};

Matter.Plugin.register(MyPlugin);

Matter.use(
  'matter-my-plugin'
);