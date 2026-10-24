import { createRepository } from '../three/createRepository'
import {
  createCamera,
  createClock,
  createCube,
  createRenderer,
  createSceneObject,
} from '../three/factories'

function createResizeObserver(callback: ResizeObserverCallback) {
  return new ResizeObserver(callback)
}

export const sceneRepository = createRepository({
  scene: createSceneObject,
  camera: createCamera,
  cube: createCube,
  renderer: createRenderer,
  clock: createClock,
  resizeObserver: createResizeObserver,
})
