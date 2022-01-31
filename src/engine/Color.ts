import Color from 'color'

export const defaultSquareColors = [Color('white'), Color('white'), Color('white'), Color('white')] as const

export const defaultTriangleColors = [Color('white'), Color('white'), Color('white')] as const

export function getColorArray(color: Color) {
  return [color.red() / 255, color.green() / 255, color.blue() / 255, color.alpha()]
}