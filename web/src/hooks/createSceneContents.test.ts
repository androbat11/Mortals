import {
  AmbientLight,
  Box3,
  BoxGeometry,
  Color,
  DirectionalLight,
  Fog,
  Mesh,
  PlaneGeometry,
  Vector3,
} from 'three'
import { describe, expect, it } from 'vitest'
import { createControlLimits } from '../three/controls/controlLimits'
import { createSceneContents } from './createSceneContents'
import { createSceneRepository } from './createSceneRepository'

describe('createSceneContents', () => {
  it('adds the cube, the ground, and both lights to the scene', () => {
    const { scene } = createSceneContents(createSceneRepository(), 1.5)
    const meshes = scene.children.filter((child) => child instanceof Mesh)

    expect(meshes.map((mesh) => mesh.geometry.constructor)).toEqual(
      expect.arrayContaining([BoxGeometry, PlaneGeometry]),
    )
    expect(scene.children.some((c) => c instanceof AmbientLight)).toBe(true)
    expect(scene.children.some((c) => c instanceof DirectionalLight)).toBe(true)
  })

  it('frames the scene with a background and a fog of the same colour', () => {
    const { scene } = createSceneContents(createSceneRepository(), 1)
    expect(scene.background).toBeInstanceOf(Color)
    expect(scene.fog).toBeInstanceOf(Fog)
    expect((scene.fog as Fog).color.equals(scene.background as Color)).toBe(true)
  })

  it('keeps the ground edge beyond the fog from every allowed camera position', () => {
    const { scene } = createSceneContents(createSceneRepository(), 1)
    const ground = scene.children.find(
      (child): child is Mesh =>
        child instanceof Mesh && child.geometry instanceof PlaneGeometry,
    )!
    ground.updateMatrixWorld()
    const halfSize = new Box3().setFromObject(ground).getSize(new Vector3()).x / 2
    const { far } = scene.fog as Fog
    const { maxDistance } = createControlLimits()

    expect(halfSize - maxDistance).toBeGreaterThanOrEqual(far)
  })

  it('returns the frame updaters that drive the scene, not the objects themselves', () => {
    const contents = createSceneContents(createSceneRepository(), 1)
    expect(contents.updaters.length).toBeGreaterThan(0)
    contents.updaters.forEach((update) => expect(() => update(0.1)).not.toThrow())
  })

  it('creates a camera with the given aspect ratio', () => {
    const { camera } = createSceneContents(createSceneRepository(), 1.5)
    expect(camera.aspect).toBe(1.5)
  })
})
