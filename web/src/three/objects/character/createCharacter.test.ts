import {
  Box3,
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  Vector3,
  type Object3D,
} from 'three'
import { describe, expect, it } from 'vitest'
import type { JointName } from './characterRig'
import { createCharacter } from './createCharacter'

const jointNames: JointName[] = [
  'neck',
  'shoulderL',
  'shoulderR',
  'elbowL',
  'elbowR',
  'hipL',
  'hipR',
  'kneeL',
  'kneeR',
]

function getMeshes(root: Object3D) {
  const meshes: Mesh[] = []
  root.traverse((object) => {
    if (object instanceof Mesh) meshes.push(object)
  })
  return meshes
}

function getBounds(root: Object3D) {
  root.updateMatrixWorld(true)
  return new Box3().setFromObject(root)
}

describe('createCharacter', () => {
  it('has every named joint', () => {
    const { joints } = createCharacter()
    expect(Object.keys(joints).sort()).toEqual([...jointNames].sort())
  })

  it('attaches the elbows and knees to their limbs, so they move with them', () => {
    const { joints } = createCharacter()
    expect(joints.elbowL.parent).toBe(joints.shoulderL)
    expect(joints.elbowR.parent).toBe(joints.shoulderR)
    expect(joints.kneeL.parent).toBe(joints.hipL)
    expect(joints.kneeR.parent).toBe(joints.hipR)
  })

  it('is mirrored left to right', () => {
    const { joints } = createCharacter()
    // The character's left is +x, so swapping the two sides would fail here.
    expect(joints.shoulderL.position.x).toBeGreaterThan(0)
    expect(joints.hipL.position.x).toBeGreaterThan(0)
    expect(joints.shoulderL.position.x).toBeCloseTo(-joints.shoulderR.position.x)
    expect(joints.hipL.position.x).toBeCloseTo(-joints.hipR.position.x)
    expect(joints.shoulderL.position.y).toBeCloseTo(joints.shoulderR.position.y)
  })

  it('stands with its feet on the ground and is about 1.8 tall', () => {
    const bounds = getBounds(createCharacter().root)
    expect(bounds.min.y).toBeCloseTo(0)
    expect(bounds.max.y - bounds.min.y).toBeCloseTo(1.8)
  })

  it('is centred on the origin, left to right and front to back', () => {
    const centre = getBounds(createCharacter().root).getCenter(new Vector3())
    expect(centre.x).toBeCloseTo(0)
    expect(centre.z).toBeCloseTo(0)
  })

  it('is built from 11 boxes and no imported geometry', () => {
    const meshes = getMeshes(createCharacter().root)
    expect(meshes).toHaveLength(11)
    meshes.forEach((mesh) => expect(mesh.geometry).toBeInstanceOf(BoxGeometry))
  })

  it('uses flat-shaded materials shared between parts', () => {
    const meshes = getMeshes(createCharacter().root)
    const materials = new Set(meshes.map((mesh) => mesh.material))
    materials.forEach((material) => {
      expect(material).toBeInstanceOf(MeshStandardMaterial)
      expect((material as MeshStandardMaterial).flatShading).toBe(true)
    })
    expect(materials.size).toBe(3)
  })

  it('swings the whole arm forward (toward +z) when the shoulder rotates by a negative x angle', () => {
    const { root, joints } = createCharacter()
    const before = getBounds(joints.shoulderL).getCenter(new Vector3())

    joints.shoulderL.rotation.x = -Math.PI / 2
    root.updateMatrixWorld(true)
    const after = getBounds(joints.shoulderL).getCenter(new Vector3())

    // The arm is about 0.6 long, so its centre moves roughly 0.3 forward.
    expect(after.z).toBeGreaterThan(before.z + 0.2)
  })

  it('swings the whole arm backward when the shoulder rotates by a positive x angle', () => {
    const { root, joints } = createCharacter()
    const before = getBounds(joints.shoulderL).getCenter(new Vector3())

    joints.shoulderL.rotation.x = Math.PI / 2
    root.updateMatrixWorld(true)
    const after = getBounds(joints.shoulderL).getCenter(new Vector3())

    expect(after.z).toBeLessThan(before.z - 0.2)
  })

  it('returns a new character each time', () => {
    expect(createCharacter().root).not.toBe(createCharacter().root)
  })
})
