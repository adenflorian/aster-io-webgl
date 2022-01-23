import JSX from './custom-render'
import { vec } from './excalibur/engine'
import { initShaderProgram } from './shader-loading'
import { fsSource, vsSource } from './shaders'
import { drawScene } from './draw'
import { initBuffers } from './buffers'
import './app.css'
import { NodeRef } from './NodeRef'

const canvasSize = vec(640, 480)

const canvasRef = new NodeRef<HTMLCanvasElement>();

const app = (
  <div class="canvas-container">
    <canvas id="glCanvas" ref={canvasRef} width={canvasSize.x} height={canvasSize.y} />
  </div>
) as HTMLCanvasElement

document.body.appendChild(<h1>s q u a r e</h1>)

document.body.appendChild(app)

const bottomText: HTMLHeadingElement = <h1>s q u a r e</h1>

document.body.appendChild(bottomText)

bottomText.style.transform = 'rotate3d(0, 0, 1, 180deg)'

const gl = canvasRef.instance!.getContext('webgl2')

// Only continue if WebGL is available and working
if (gl === null) {
  throw new Error('Unable to initialize WebGL. Your browser or machine may not support it.');
}

// Set clear color to black, fully opaque
gl.clearColor(48 / 255, 48 / 255, 48 / 255, 1.0);
// Clear the color buffer with specified clear color
gl.clear(gl.COLOR_BUFFER_BIT);

const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

const programInfo = {
  program: shaderProgram,
  attribLocations: {
    vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
    vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
  },
  uniformLocations: {
    projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
    modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
  },
};

const buffers = initBuffers(gl)

drawScene(gl, programInfo, buffers)

function loop() {
  requestAnimationFrame(loop)
}

requestAnimationFrame(loop)