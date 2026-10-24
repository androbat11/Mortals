import { createRepository } from '../three/core/createRepository'
import { createOrbitControls } from '../three/controls/createOrbitControls'
import { createAmbientLight } from '../three/objects/createAmbientLight'
import { createBackground } from '../three/objects/createBackground'
import { createCamera } from '../three/objects/createCamera'
import { createCube } from '../three/objects/createCube'
import { createDirectionalLight } from '../three/objects/createDirectionalLight'
import { createFog } from '../three/objects/createFog'
import { createGround } from '../three/objects/createGround'
import { createSceneObject } from '../three/objects/createSceneObject'
import { createRenderer } from '../three/rendering/createRenderer'
import { createTimer } from '../three/rendering/createTimer'
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
    background: createBackground,
    fog: createFog,
    ambientLight: createAmbientLight,
    directionalLight: createDirectionalLight,
    controls: createOrbitControls,
    renderer: createRenderer,
    timer: createTimer,
    resizeObserver: createResizeObserver,
  })
}

export type SceneRepository = ReturnType<typeof createSceneRepository>
