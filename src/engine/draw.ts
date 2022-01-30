import { mat4 } from 'gl-matrix'
import { ShaderProgramInfo } from './Components/RendererComponent'
import { Engine } from './Engine'
import { Transform } from './Transform'

export function clearScene(gl: WebGL2RenderingContext) {
  gl.clearColor(14 / 255, 14 / 255, 14 / 255, 1.0)  // Clear to black, fully opaque
  gl.clearDepth(1.0)                 // Clear everything
  gl.enable(gl.DEPTH_TEST)           // Enable depth testing
  gl.depthFunc(gl.LEQUAL)            // Near things obscure far things

  // Clear the canvas before we start drawing on it.
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
}

export function drawActor(engine: Engine, transform: Transform, programInfo: ShaderProgramInfo) {
  const { gl } = engine

  gl.useProgram(programInfo.shaderProgram)

  setAttributes(engine, programInfo)

  setUniforms(engine, transform, programInfo)

  const offset = 0
  gl.drawArrays(programInfo.drawMode, offset, programInfo.vertexCount)
}

function setAttributes(engine: Engine, programInfo: ShaderProgramInfo) {
  const { gl } = engine

  for (let i = 0; i < programInfo.vertexAttributes.length; i++) {
    const attr = programInfo.vertexAttributes[i]
    gl.bindBuffer(gl.ARRAY_BUFFER, attr.buffer)
    gl.vertexAttribPointer(
      attr.location!,
      attr.numComponents,
      gl[attr.type],
      attr.normalize,
      attr.stride,
      attr.offset)
    gl.enableVertexAttribArray(attr.location!)
  }
}

const fieldOfView = 45 * Math.PI / 180   // in radians
const zNear = 0.1
const zFar = 100.0
const projectionMatrix = mat4.create()
const modelViewMatrix = mat4.create()

function setUniforms(engine: Engine, transform: Transform, programInfo: ShaderProgramInfo) {
  const { gl } = engine

  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight

  // mat4.perspective(projectionMatrix,
  //   fieldOfView,
  //   aspect,
  //   zNear,
  //   zFar)

  const size = engine.orthographicCameraSize
  const width = aspect * size
  const height = 1 * size
  mat4.ortho(projectionMatrix,
    -width / 2,
    width / 2,
    -height / 2,
    height / 2,
    -100,
    100,
  )

  mat4.identity(modelViewMatrix)

  mat4.translate(modelViewMatrix,     // destination matrix
    modelViewMatrix,     // matrix to translate
    [transform.pos.x, transform.pos.y, -6.0])  // amount to translate
  mat4.rotateZ(modelViewMatrix, modelViewMatrix, transform.rotation)

  // Set the shader uniforms
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix)
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix)
}