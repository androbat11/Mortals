import { createRepository } from '../three/createRepository'
import {
  createAmbientLight,
  createCamera,
  createCube,
  createDirectionalLight,
  createGround,
  createOrbitControls,
  createRenderer,
  createSceneObject,
  createTimer,
} from '../three/factories'
import { createResizeObserver } from './browserFactories'

// Design: this is the single registry of everything the scene creates. The keys
// are the vocabulary the hook uses (`create('cube')`), so adding a character in
// a later phase is one new factory and one new line here (Phase 3 added the
// ground, the lights, and the orbit controls this way). It is a function, not
// an exported constant, so no module-level value is shared between callers and
// a test can build a repository with different factories.
export function createSceneRepository() {
  return createRepository({
    scene: createSceneObject,
    camera: createCamera,
    cube: createCube,
    ground: createGround,
    ambientLight: createAmbientLight,
    directionalLight: createDirectionalLight,
    controls: createOrbitControls,
    renderer: createRenderer,
    timer: createTimer,
    resizeObserver: createResizeObserver,
  })
}
