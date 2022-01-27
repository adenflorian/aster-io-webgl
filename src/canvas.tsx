import JSX from './jsx/custom-render'
import { vec } from './excalibur/engine';
import { NodeRef } from './jsx/NodeRef';

export function addCanvasToBody() {

  const canvasSize = vec(640, 480)

  const canvasRef = new NodeRef<HTMLCanvasElement>();

  const app = (
    <div class="canvas-container">
      <canvas id="glCanvas" ref={canvasRef} width={canvasSize.x} height={canvasSize.y} />
    </div>
  ) as HTMLCanvasElement

  document.body.appendChild(<h1>l i n e s <sup>2</sup></h1>)

  document.body.appendChild(app)

  const bottomText: HTMLHeadingElement = <h1>l i n e s <sup>2</sup></h1>

  document.body.appendChild(bottomText)

  bottomText.style.transform = 'rotate3d(0, 0, 1, 180deg)'

  return canvasRef
}