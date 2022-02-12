import { vec } from './excalibur/engine';
import JSX from './jsx/custom-render';
import { NodeRef } from './jsx/NodeRef';

export function addCanvasToBody() {

  const canvasSize = vec(800, 600)

  const canvasRef = new NodeRef<HTMLCanvasElement>();

  const app = (
    <>
      <canvas id="glCanvas" ref={canvasRef} width={canvasSize.x} height={canvasSize.y} />
      <div id="matterjs" />
      <div id="myData" />
      <div id="matterData" />
    </>
  ) as HTMLCanvasElement

  document.body.appendChild(app)

  return canvasRef
}