import mainVert from './main.vert'
import mainFrag from './main.frag'
import altVert from './alt.vert'
import altFrag from './alt.frag'

export interface VertexShader extends String { }
export interface FragmentShader extends String { }

export const Shaders = Object.freeze({
  mainVert: mainVert as VertexShader,
  mainFrag: mainFrag as FragmentShader,
  altVert: altVert as VertexShader,
  altFrag: altFrag as FragmentShader,
})