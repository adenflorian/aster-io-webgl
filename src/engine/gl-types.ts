export enum RenderingPrimitive {
  /** Passed to drawElements or drawArrays to draw single points. */
  POINTS = 0x0000,
  /** Passed to drawElements or drawArrays to draw lines. Each vertex connects to the one after it. */
  LINES = 0x0001,
  /** Passed to drawElements or drawArrays to draw lines. Each set of two vertices is treated as a separate line segment. */
  LINE_LOOP = 0x0002,
  /** Passed to drawElements or drawArrays to draw a connected group of line segments from the first vertex to the last. */
  LINE_STRIP = 0x0003,
  /** Passed to drawElements or drawArrays to draw triangles. Each set of three vertices creates a separate triangle. */
  TRIANGLES = 0x0004,
  /** Passed to drawElements or drawArrays to draw a connected group of triangles. */
  TRIANGLE_STRIP = 0x0005,
  /** Passed to drawElements or drawArrays to draw a connected group of triangles. Each vertex connects to the previous and the first vertex in the fan. */
  TRIANGLE_FAN = 0x0006,
}

export type VertexAttributeComponentDataType = 'BYTE' | 'SHORT' | 'UNSIGNED_BYTE' | 'UNSIGNED_SHORT' | 'FLOAT' | 'HALF_FLOAT'