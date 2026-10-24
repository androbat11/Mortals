import { MeshStandardMaterial } from 'three'

// Flat shading gives every face its own brightness, which is what makes a
// low-poly shape read as faceted. One material per colour is shared by many
// parts, so the character needs three materials instead of one per part.
export function createBodyMaterial(color: number) {
  return new MeshStandardMaterial({ color, flatShading: true })
}
