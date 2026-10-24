import { Box3, MeshStandardMaterial, Vector3 } from 'three'
import { describe, expect, it } from 'vitest'
import { createBodyPart } from './createBodyPart'

describe('createBodyPart', () => {
  it('hangs from its origin: the top is at y = 0 and the bottom at -height', () => {
    const part = createBodyPart(
      { width: 0.2, height: 0.5, depth: 0.1 },
      new MeshStandardMaterial(),
    )
    const size = new Box3().setFromObject(part).getSize(new Vector3())
    const box = new Box3().setFromObject(part)

    expect(box.max.y).toBeCloseTo(0)
    expect(box.min.y).toBeCloseTo(-0.5)
    expect(size.x).toBeCloseTo(0.2)
    expect(size.z).toBeCloseTo(0.1)
  })

  it('uses the given material', () => {
    const material = new MeshStandardMaterial()
    const part = createBodyPart({ width: 1, height: 1, depth: 1 }, material)
    expect(part.material).toBe(material)
  })
})
