import { AmbientLight, BoxGeometry, DirectionalLight, Mesh, PlaneGeometry } from 'three'
import { describe, expect, it } from 'vitest'
import { createSceneContents } from './createSceneContents'
import { createSceneRepository } from './createSceneRepository'

describe('createSceneContents', () => {
  it('adds the cube, the ground, and both lights to the scene', () => {
    const { scene, cube } = createSceneContents(createSceneRepository(), 1.5)
    const meshes = scene.children.filter((child) => child instanceof Mesh)

    expect(scene.children).toContain(cube)
    expect(meshes.map((mesh) => mesh.geometry.constructor)).toEqual(
      expect.arrayContaining([BoxGeometry, PlaneGeometry]),
    )
    expect(scene.children.some((c) => c instanceof AmbientLight)).toBe(true)
    expect(scene.children.some((c) => c instanceof DirectionalLight)).toBe(true)
  })

  it('creates a camera with the given aspect ratio', () => {
    const { camera } = createSceneContents(createSceneRepository(), 1.5)
    expect(camera.aspect).toBe(1.5)
  })
})
