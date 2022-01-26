import { Engine } from '../Engine';
import { Shaders } from '../shaders';
import { Material } from './Material';

export class SquareMaterial extends Material {
  public constructor(engine: Engine) {
    super(engine, Shaders.mainVert, Shaders.mainFrag)
  }
}

export class AltMaterial extends Material {
  public constructor(engine: Engine) {
    super(engine, Shaders.altVert, Shaders.altFrag)
  }
}