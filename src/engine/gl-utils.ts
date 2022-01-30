export function tryCreateBuffer(gl: WebGL2RenderingContext) {
  const buffer = gl.createBuffer()
  if (!buffer) {
    throw new Error('tryCreateBuffer failed to create a buffer')
  }
  return buffer
}