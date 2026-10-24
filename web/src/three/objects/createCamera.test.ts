import { PerspectiveCamera, Vector3 } from 'three'
import { describe, expect, it } from 'vitest'
import { createCamera } from './createCamera'
import { createViewTarget } from './createViewTarget'

describe('createCamera', () => {
  it('returns a camera with the given aspect ratio', () => {
    const camera = createCamera(1.5)
    expect(camera).toBeInstanceOf(PerspectiveCamera)
    expect(camera.aspect).toBe(1.5)
  })

  it('looks at the view target from above', () => {
    const camera = createCamera(1)
    const toTarget = createViewTarget().sub(camera.position).normalize()
    const facing = camera.getWorldDirection(new Vector3())
    expect(facing.dot(toTarget)).toBeCloseTo(1)
    expect(camera.position.y).toBeGreaterThan(0)
  })
})
