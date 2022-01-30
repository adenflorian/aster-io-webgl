import altFrag from './alt.frag'
import altVert from './alt.vert'
import defaultFrag from './default.frag'
import defaultVert from './default.vert'
import mainFrag from './main.frag'
import mainVert from './main.vert'

export interface VertexShader extends String { }
export interface FragmentShader extends String { }

export const Shaders = Object.freeze({
  defaultVert: defaultVert as VertexShader,
  defaultFrag: defaultFrag as FragmentShader,
  mainVert: mainVert as VertexShader,
  mainFrag: mainFrag as FragmentShader,
  altVert: altVert as VertexShader,
  altFrag: altFrag as FragmentShader,
})