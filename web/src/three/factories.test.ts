import { Mesh, PerspectiveCamera, Scene, Timer } from 'three'
import { describe, expect, it, vi } from 'vitest'
import {
  createCamera,
  createCube,
  createRenderer,
  createSceneObject,
  createTimer,
} from './factories'

const mockThree = await vi.hoisted(async () =>
  (await import('../test/mockThree')).createMockThree(),
)

vi.mock('three', async (importOriginal) =>
  mockThree.withMockRenderer(await importOriginal()),
)

describe('factories', () => {
  it('createSceneObject returns an empty scene', () => {
    const scene = createSceneObject()
    expect(scene).toBeInstanceOf(Scene)
    expect(scene.children).toHaveLength(0)
  })

  it('createCamera returns a camera with the given aspect ratio in front of the origin', () => {
    const camera = createCamera(1.5)
    expect(camera).toBeInstanceOf(PerspectiveCamera)
    expect(camera.aspect).toBe(1.5)
    expect(camera.position.z).toBeGreaterThan(0)
  })

  it('createCube returns a new cube mesh each time', () => {
    const cube = createCube()
    expect(cube).toBeInstanceOf(Mesh)
    expect(createCube()).not.toBe(cube)
  })

  it('createTimer returns a new timer each time', () => {
    const timer = createTimer()
    expect(timer).toBeInstanceOf(Timer)
    expect(createTimer()).not.toBe(timer)
  })

  it('createRenderer sizes the renderer and caps the pixel ratio at 2', () => {
    const renderer = createRenderer(800, 400, 3)
    expect(renderer.setSize).toHaveBeenCalledWith(800, 400)
    expect(renderer.setPixelRatio).toHaveBeenCalledWith(2)
  })
})
