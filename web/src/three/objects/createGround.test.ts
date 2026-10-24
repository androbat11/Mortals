import { Box3, PlaneGeometry, Vector3 } from 'three'
import { describe, expect, it } from 'vitest'
import { createGround } from './createGround'

describe('createGround', () => {
  it('returns a flat plane much larger than the character', () => {
    const ground = createGround()
    ground.updateMatrixWorld()
    const size = new Box3().setFromObject(ground).getSize(new Vector3())
    expect(ground.geometry).toBeInstanceOf(PlaneGeometry)
    expect(size.y).toBeCloseTo(0)
    expect(size.x).toBe(100)
    expect(size.z).toBe(100)
  })
})
