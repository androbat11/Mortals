import { BoxGeometry, Mesh, type Material } from 'three'
import type { PartSize } from './characterRig'

// Design: the geometry is shifted so the part's origin is at its top. A part
// then hangs from its joint, so rotating the joint swings the part around its
// top end, the way a shoulder swings an arm, with no extra offset maths. Parts
// that stand above a joint (the head) are lifted by their own height.
export function createBodyPart({ width, height, depth }: PartSize, material: Material) {
  const geometry = new BoxGeometry(width, height, depth)
  geometry.translate(0, -height / 2, 0)
  return new Mesh(geometry, material)
}
