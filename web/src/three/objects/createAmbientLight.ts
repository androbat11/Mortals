import { AmbientLight } from 'three'

// Soft light from everywhere, so faces turned away from the main light are dim
// instead of black.
export function createAmbientLight() {
  return new AmbientLight(0xffffff, 0.6)
}
