import { Group } from 'three'
import { describe, expect, it } from 'vitest'
import { createJoint } from './createJoint'

describe('createJoint', () => {
  it('returns an empty group at the given position', () => {
    const joint = createJoint({ x: 1, y: 2, z: 3 })
    expect(joint).toBeInstanceOf(Group)
    expect(joint.children).toHaveLength(0)
    expect(joint.position.toArray()).toEqual([1, 2, 3])
  })
})
