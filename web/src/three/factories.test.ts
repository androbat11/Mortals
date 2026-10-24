import { Mesh, PerspectiveCamera, Scene } from 'three'
import { describe, expect, it } from 'vitest'
import { createCamera, createCube, createSceneObject } from './factories'

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
})
