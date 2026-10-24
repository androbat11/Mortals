import { Object3D } from 'three'
import { describe, expect, it } from 'vitest'
import { rotateCube } from './rotateCube'

describe('rotateCube', () => {
  it('increases rotation by the time delta', () => {
    const cube = new Object3D()
    rotateCube(cube, 0.5)
    expect(cube.rotation.x).toBeCloseTo(0.5)
    expect(cube.rotation.y).toBeCloseTo(0.5)
  })

  it('does not rotate when no time has passed', () => {
    const cube = new Object3D()
    rotateCube(cube, 0)
    expect(cube.rotation.x).toBe(0)
  })
})
