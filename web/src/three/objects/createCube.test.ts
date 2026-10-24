import { Box3, Mesh, MeshStandardMaterial } from 'three'
import { describe, expect, it } from 'vitest'
import { createCube } from './createCube'

describe('createCube', () => {
  it('returns a new lit cube mesh each time', () => {
    const cube = createCube()
    expect(cube).toBeInstanceOf(Mesh)
    expect(cube.material).toBeInstanceOf(MeshStandardMaterial)
    expect(createCube()).not.toBe(cube)
  })

  it('rests exactly on the ground plane', () => {
    const cube = createCube()
    cube.updateMatrixWorld()
    expect(new Box3().setFromObject(cube).min.y).toBeCloseTo(0)
  })
})
