import { Colors, defaultSquareColors, defaultTriangleColors } from './Color';

export function createSquare(
  gl: WebGL2RenderingContext,
  size: number = 1,
  colors: typeof defaultSquareColors | typeof Colors.red = defaultSquareColors,
): MeshData {
  const positionBuffer = gl.createBuffer();

  if (!positionBuffer) {
    throw new Error('[createPositionBuffer] !positionBuffer')
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  const positions = [
    1.0, 1.0,
    -1.0, 1.0,
    -1.0, -1.0,
    1.0, -1.0,
  ].map(x => x * size);

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  const colorBuffer = gl.createBuffer();

  if (!colorBuffer) {
    throw new Error('[createColorBuffer] !colorBuffer')
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

  const colorsFlat = colors.flat()

  let colorsFinal = colorsFlat

  if (colorsFlat.length === 4) {
    colorsFinal = [...colorsFlat, ...colorsFlat, ...colorsFlat, ...colorsFlat]
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorsFinal), gl.STATIC_DRAW);

  return {
    position: positionBuffer,
    color: colorBuffer,
  };
}

export function createTriangle(
  gl: WebGL2RenderingContext,
  size: number = 1,
  width: number = 1,
  colors: typeof defaultTriangleColors | typeof Colors.red = defaultTriangleColors,
): MeshData {
  const positionBuffer = gl.createBuffer();

  if (!positionBuffer) {
    throw new Error('[createPositionBuffer] !positionBuffer')
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  const height = Math.sqrt(3)
  const R = (2 * height) / 3
  const r = R / 2

  const positions = [
    -1.0 * width, -r,
    0.0, R,
    1.0 * width, -r,
  ].map(x => x * size);

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  const colorBuffer = gl.createBuffer();

  if (!colorBuffer) {
    throw new Error('[createColorBuffer] !colorBuffer')
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

  const colorsFlat = colors.flat()

  let colorsFinal = colorsFlat

  if (colorsFlat.length === 4) {
    colorsFinal = [...colorsFlat, ...colorsFlat, ...colorsFlat]
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorsFinal), gl.STATIC_DRAW);

  return {
    position: positionBuffer,
    color: colorBuffer,
  };
}

export interface MeshData {
  position: WebGLBuffer
  color: WebGLBuffer
}