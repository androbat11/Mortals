import { Mesh, PerspectiveCamera } from 'three'
import { describe, expect, it } from 'vitest'
import { createScene } from './createScene'

describe('createScene', () => {
  it('contains exactly one cube mesh', () => {
    const { scene, cube } = createScene(1.5)
    expect(scene.children).toEqual([cube])
    expect(cube).toBeInstanceOf(Mesh)
  })

  it('returns a camera with the given positive aspect ratio', () => {
    const { camera } = createScene(1.5)
    expect(camera).toBeInstanceOf(PerspectiveCamera)
    expect(camera.aspect).toBe(1.5)
  })

  it('places the camera in front of the cube', () => {
    const { camera, cube } = createScene(1)
    expect(camera.position.z).toBeGreaterThan(cube.position.z)
  })
})
