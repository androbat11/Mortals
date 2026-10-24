import { describe, expect, it } from 'vitest'
import { createCube } from './factories'
import { rotateCube } from './rotateCube'

describe('rotateCube', () => {
  it('spins around the vertical axis by the time delta at the default speed', () => {
    const cube = createCube()
    rotateCube(cube, 0.5)
    expect(cube.rotation.y).toBeCloseTo(0.5)
  })

  it('does not tumble on the other axes, so the cube stays flat on the ground', () => {
    const cube = createCube()
    rotateCube(cube, 0.5)
    expect(cube.rotation.x).toBe(0)
    expect(cube.rotation.z).toBe(0)
  })

  it('scales the rotation by a custom speed', () => {
    const cube = createCube()
    rotateCube(cube, 0.5, 2)
    expect(cube.rotation.y).toBeCloseTo(1)
  })

  it('does not rotate when no time has passed', () => {
    const cube = createCube()
    rotateCube(cube, 0)
    expect(cube.rotation.y).toBe(0)
  })
})
