import { createRepository } from '../three/createRepository'
import {
  createCamera,
  createTimer,
  createCube,
  createRenderer,
  createSceneObject,
} from '../three/factories'
import { createResizeObserver } from './browserFactories'

// Design: this is the single registry of everything the scene creates. The keys
// are the vocabulary the hook uses (`create('cube')`), so adding a character in
// a later phase is one new factory and one new line here. It is a function, not
// an exported constant, so no module-level value is shared between callers and
// a test can build a repository with different factories.
export function createSceneRepository() {
  return createRepository({
    scene: createSceneObject,
    camera: createCamera,
    cube: createCube,
    renderer: createRenderer,
    timer: createTimer,
    resizeObserver: createResizeObserver,
  })
}
