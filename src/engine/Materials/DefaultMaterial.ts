import { Engine } from '../Engine';
import { Shaders } from '../shaders';
import { Material } from './Material';

export class DefaultMaterial extends Material {
  public constructor(engine: Engine) {
    super(engine, Shaders.defaultVert, Shaders.defaultFrag)
  }
}