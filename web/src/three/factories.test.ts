import {
  AmbientLight,
  Box3,
  DirectionalLight,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  Timer,
  Vector3,
} from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { describe, expect, it, vi } from 'vitest'
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

  it('createCamera looks toward the origin from above', () => {
    const camera = createCamera(1)
    const toOrigin = camera.position.clone().negate().normalize()
    const facing = camera.getWorldDirection(new Vector3())
    expect(facing.dot(toOrigin)).toBeCloseTo(1)
    expect(camera.position.y).toBeGreaterThan(0)
  })

  it('createCube returns a new lit cube mesh each time', () => {
    const cube = createCube()
    expect(cube).toBeInstanceOf(Mesh)
    expect(cube.material).toBeInstanceOf(MeshStandardMaterial)
    expect(createCube()).not.toBe(cube)
  })

  it('createCube rests exactly on the ground plane', () => {
    const cube = createCube()
    cube.updateMatrixWorld()
    expect(new Box3().setFromObject(cube).min.y).toBeCloseTo(0)
  })

  it('createGround returns a flat plane larger than the cube', () => {
    const ground = createGround()
    ground.updateMatrixWorld()
    const size = new Box3().setFromObject(ground).getSize(new Vector3())
    expect(ground.geometry).toBeInstanceOf(PlaneGeometry)
    expect(size.y).toBeCloseTo(0)
    expect(size.x).toBeGreaterThan(10)
    expect(size.z).toBeGreaterThan(10)
  })

  it('creates an ambient light and a directional light', () => {
    expect(createAmbientLight()).toBeInstanceOf(AmbientLight)
    expect(createDirectionalLight()).toBeInstanceOf(DirectionalLight)
  })

  it('createOrbitControls controls the given camera on the given element', () => {
    const camera = createCamera(1)
    const element = document.createElement('canvas')
    const controls = createOrbitControls(camera, element)
    expect(controls).toBeInstanceOf(OrbitControls)
    expect(controls.object).toBe(camera)
    expect(controls.domElement).toBe(element)
    controls.dispose()
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
