import { mat4 } from 'gl-matrix';
import { Actor } from './Actor';
import { Engine } from './Engine';

export function clearScene(gl: WebGL2RenderingContext) {
  gl.clearColor(14 / 255, 14 / 255, 14 / 255, 1.0);  // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  // Clear the canvas before we start drawing on it.
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

const fieldOfView = 45 * Math.PI / 180;   // in radians
const zNear = 0.1;
const zFar = 100.0;
const projectionMatrix = mat4.create();
const modelViewMatrix = mat4.create();

export function drawActor(engine: Engine, actor: Actor) {
  const { gl } = engine

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  // mat4.perspective(projectionMatrix,
  //   fieldOfView,
  //   aspect,
  //   zNear,
  //   zFar);

  // const width = 640
  // const height = 480
  const size = engine.orthographicCameraSize
  const width = (engine.canvasWidth / engine.canvasHeight) * size
  const height = 1 * size
  mat4.ortho(projectionMatrix,
    -width / 2,
    width / 2,
    -height / 2,
    height / 2,
    -100,
    100,
  )

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.

  // Now move the drawing position a bit to where we want to
  // start drawing the square.

  mat4.identity(modelViewMatrix)

  const transform = actor.transform.getGlobalTransform()

  mat4.translate(modelViewMatrix,     // destination matrix
    modelViewMatrix,     // matrix to translate
    [transform.pos.x, transform.pos.y, -6.0]);  // amount to translate
  mat4.rotateZ(modelViewMatrix, modelViewMatrix, transform.rotation)

  for (let i = 0; i < actor.material!.vertexAttributes.length; i++) {
    const attr = actor.material!.vertexAttributes[i]
    gl.bindBuffer(gl.ARRAY_BUFFER, attr.buffer);
    gl.vertexAttribPointer(
      attr.location!,
      attr.numComponents,
      gl[attr.type],
      attr.normalize,
      attr.stride,
      attr.offset);
    gl.enableVertexAttribArray(attr.location!);
  }

  // Tell WebGL to use our program when drawing
  gl.useProgram(actor.material!.shaderProgram);

  // Set the shader uniforms
  gl.uniformMatrix4fv(
    actor.material!.programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix);
  gl.uniformMatrix4fv(
    actor.material!.programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix);

  {
    const offset = 0;
    gl.drawArrays(actor.material!.drawMode, offset, actor.material!.vertexCount);
  }
}