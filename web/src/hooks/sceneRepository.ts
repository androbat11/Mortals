import { createRepository } from '../three/createRepository'
import {
  createCamera,
  createClock,
  createCube,
  createRenderer,
  createSceneObject,
} from '../three/factories'

// The ResizeObserver factory lives here, not in `three/`, because it is a
// browser API. That keeps `three/` free of DOM code, as the project rules
// require, and still lets the hook create it through the repository.
function createResizeObserver(callback: ResizeObserverCallback) {
  return new ResizeObserver(callback)
}

// Design: this is the single registry of everything the scene creates. The keys
// are the vocabulary the hook uses (`create('cube')`), so adding a character in
// a later phase is one new factory and one new line here. The repository holds
// only factories, never created objects, so exporting it as a module-level
// value shares no mutable state between callers.
export const sceneRepository = createRepository({
  scene: createSceneObject,
  camera: createCamera,
  cube: createCube,
  renderer: createRenderer,
  clock: createClock,
  resizeObserver: createResizeObserver,
})
