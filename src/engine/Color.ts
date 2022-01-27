export const Colors = Object.freeze({
  white: [1, 1, 1, 1],
  red: [1, 0, 0, 1],
  green: [0, 1, 0, 1],
  blue: [0, 0, 1, 1],
  yellow: [1, 1, 0, 1],
  purple: [1, 0, 1, 1],
  cyan: [0, 1, 1, 1],
})

export const defaultSquareColors = [Colors.red, Colors.red, Colors.red, Colors.red] as const

export const defaultTriangleColors = [Colors.red, Colors.red, Colors.red] as const