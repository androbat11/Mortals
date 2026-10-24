import { createAnimation } from '../three/animation/animations/createAnimation'
import { createAnimationPlayer } from '../three/animation/createAnimationPlayer'
import { createRepository } from '../three/core/createRepository'
import { createOrbitControls } from '../three/controls/createOrbitControls'
import { createAmbientLight } from '../three/objects/createAmbientLight'
import { createBackground } from '../three/objects/createBackground'
import { createCamera } from '../three/objects/createCamera'
import { createCharacter } from '../three/objects/character/createCharacter'
import { createDirectionalLight } from '../three/objects/createDirectionalLight'
import { createFog } from '../three/objects/createFog'
import { createGround } from '../three/objects/createGround'
import { createSceneObject } from '../three/objects/createSceneObject'
import { createViewTarget } from '../three/objects/createViewTarget'
import { createRenderer } from '../three/rendering/createRenderer'
import { createTimer } from '../three/rendering/createTimer'
import { createResizeObserver } from './browserFactories'

// Design: this is the single registry of everything the scene creates. The keys
// are the vocabulary the hooks use (`create('character')`), so adding something
// to the scene means one new factory and one new line here; the ground, lights,
// controls and character were all added this way. It is a function, not an
// exported constant, so no module-level value is shared between callers, and a
// test can build a repository with different factories.
export function createSceneRepository() {
  return createRepository({
    scene: createSceneObject,
    camera: createCamera,
    character: createCharacter,
    animation: createAnimation,
    animationPlayer: createAnimationPlayer,
    ground: createGround,
    background: createBackground,
    fog: createFog,
    ambientLight: createAmbientLight,
    directionalLight: createDirectionalLight,
    viewTarget: createViewTarget,
    controls: createOrbitControls,
    renderer: createRenderer,
    timer: createTimer,
    resizeObserver: createResizeObserver,
  })
}

export type SceneRepository = ReturnType<typeof createSceneRepository>
