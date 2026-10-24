import { Fog } from 'three'

// Design: fog fades the ground into the background colour with distance, so
// the ground plane never shows an edge. The ground is sized so its edge is
// beyond the fog's far distance from every allowed camera position (zoom is
// limited to 10 units from the centre), and a test checks that relationship.
// The colour matches `createBackground`; fog is cheap on phones.
export function createFog() {
  return new Fog(0x1f2937, 8, 30)
}
