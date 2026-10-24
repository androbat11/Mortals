import { PerspectiveCamera, Vector3 } from 'three'
import { describe, expect, it } from 'vitest'
import { createCamera } from './createCamera'

describe('createCamera', () => {
  it('returns a camera with the given aspect ratio', () => {
    const camera = createCamera(1.5)
    expect(camera).toBeInstanceOf(PerspectiveCamera)
    expect(camera.aspect).toBe(1.5)
  })

  it('looks toward the origin from above', () => {
    const camera = createCamera(1)
    const toOrigin = camera.position.clone().negate().normalize()
    const facing = camera.getWorldDirection(new Vector3())
    expect(facing.dot(toOrigin)).toBeCloseTo(1)
    expect(camera.position.y).toBeGreaterThan(0)
  })
})
