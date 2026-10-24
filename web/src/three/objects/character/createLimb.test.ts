import { Box3, MeshStandardMaterial } from 'three'
import { describe, expect, it } from 'vitest'
import { createLimb } from './createLimb'

describe('createLimb', () => {
  const upper = { width: 0.2, height: 0.4, depth: 0.2 }
  const lower = { width: 0.2, height: 0.3, depth: 0.2 }

  function create() {
    return createLimb({
      position: { x: 0.3, y: 1, z: 0 },
      upper: { size: upper, material: new MeshStandardMaterial() },
      lower: { size: lower, material: new MeshStandardMaterial() },
    })
  }

  it('places the upper joint at the given position', () => {
    expect(create().joint.position.x).toBeCloseTo(0.3)
    expect(create().joint.position.y).toBeCloseTo(1)
  })

  it('hangs the lower joint from the end of the upper part', () => {
    const { joint, childJoint } = create()
    expect(childJoint.parent).toBe(joint)
    expect(childJoint.position.y).toBeCloseTo(-0.4)
  })

  it('reaches down by the upper plus the lower length', () => {
    const { joint } = create()
    joint.updateMatrixWorld(true)
    const box = new Box3().setFromObject(joint)
    expect(box.max.y - box.min.y).toBeCloseTo(0.7)
  })
})
