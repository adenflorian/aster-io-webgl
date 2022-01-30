import Color from 'color'
import { vec } from '../excalibur/engine'
import { defaultSquareColors, defaultTriangleColors } from './Color'
import { Engine } from './Engine'
import { Mesh } from './Mesh'

export function createSquareMesh(
  engine: Engine,
  size: number = 1,
  colors: readonly Color[] = defaultSquareColors,
): Mesh {
  if (colors.length !== 4) throw new Error('square colors must be exactly 4 colors')

  const positions = [
    vec(1.0, 1.0),
    vec(-1.0, 1.0),
    vec(-1.0, -1.0),
    vec(1.0, -1.0),
  ].map(x => x.scale(size))

  return new Mesh(engine, positions, colors)
}

export function createTriangle(
  engine: Engine,
  size: number = 1,
  width: number = 1,
  colors: readonly Color[] = defaultTriangleColors,
): Mesh {
  if (colors.length !== 3) throw new Error('triangle colors must be exactly 3 colors')

  const height = Math.sqrt(3)
  const R = (2 * height) / 3
  const r = R / 2

  const positions = [
    vec(-1.0 * width, -r),
    vec(0.0, R),
    vec(1.0 * width, -r),
  ].map(x => x.scale(size))

  return new Mesh(engine, positions, colors)
}
