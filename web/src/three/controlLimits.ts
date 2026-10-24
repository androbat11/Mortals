import type { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// Design: type-first. The shape of the settings is defined before the code that
// creates or applies them, and it is derived from the real `OrbitControls`
// properties so the two cannot drift apart.
export type ControlLimits = Pick<
  OrbitControls,
  'enablePan' | 'enableDamping' | 'minDistance' | 'maxDistance' | 'maxPolarAngle'
>

// Design: the limits come from a function, not a module-level constant, so no
// state is shared between importers. They suit casual fans on a phone (mission:
// simple, low friction):
// - pan is off, so a two-finger drag cannot push the scene out of view;
// - zoom is clamped, so the cube can neither vanish nor fill the screen;
// - the vertical angle stops just above the horizon, so the camera can never
//   go under the ground plane;
// - damping makes the motion feel smooth (it needs `controls.update()` every
//   frame).
export function createControlLimits(): ControlLimits {
  return {
    enablePan: false,
    enableDamping: true,
    minDistance: 2,
    maxDistance: 10,
    maxPolarAngle: Math.PI / 2 - 0.05,
  }
}

// Copying the limits onto the controls is its own function so the factory only
// creates the object and the settings stay easy to test without WebGL.
export function applyControlLimits(
  controls: ControlLimits,
  limits: ControlLimits,
) {
  Object.assign(controls, limits)
}
