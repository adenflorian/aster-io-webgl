export function tryCreateBuffer(gl: WebGL2RenderingContext) {
  const buffer = gl.createBuffer()
  if (!buffer) {
    throw new Error('tryCreateBuffer failed to create a buffer')
  }
  return buffer
}

export function tryGetAttribLocation(gl: WebGL2RenderingContext, program: WebGLProgram, name: string) {
  const location = gl.getAttribLocation(program, name)
  if (location === -1) {
    throw new Error('tryGetAttribLocation failed to get location')
  }
  return location
}