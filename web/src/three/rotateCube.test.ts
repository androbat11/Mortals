import { describe, expect, it } from 'vitest'
import { createCube } from './factories'
import { rotateCube } from './rotateCube'

describe('rotateCube', () => {
  it('increases rotation by the time delta at the default speed', () => {
    const cube = createCube()
    rotateCube(cube, 0.5)
    expect(cube.rotation.x).toBeCloseTo(0.5)
    expect(cube.rotation.y).toBeCloseTo(0.5)
  })

  it('scales the rotation by a custom speed', () => {
    const cube = createCube()
    rotateCube(cube, 0.5, 2)
    expect(cube.rotation.x).toBeCloseTo(1)
  })

  it('does not rotate when no time has passed', () => {
    const cube = createCube()
    rotateCube(cube, 0)
    expect(cube.rotation.x).toBe(0)
  })
})
