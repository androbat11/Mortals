import type { PerspectiveCamera } from 'three'
import {
  applyControlLimits,
  createControlLimits,
} from '../three/controls/controlLimits'
import type { SceneRepository } from './createSceneRepository'

// Design: creating the orbit controls and giving them their limits is one job,
// so it lives apart from the hook that wires the scene together. The controls
// attach listeners to the element, which is why the caller must dispose them.
export function createSceneControls(
  repository: SceneRepository,
  camera: PerspectiveCamera,
  domElement: HTMLElement,
) {
  const controls = repository.create('controls', camera, domElement)
  // Turn around the centre of the character, the same point the camera looks at.
  controls.target.copy(repository.create('viewTarget'))
  applyControlLimits(controls, createControlLimits())
  return controls
}
