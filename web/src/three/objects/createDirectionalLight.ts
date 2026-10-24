import { DirectionalLight } from 'three'

// The main light, from above and to the side, so the character's faces get different
// brightness and read as 3D.
export function createDirectionalLight() {
  const light = new DirectionalLight(0xffffff, 2)
  light.position.set(3, 5, 2)
  return light
}
