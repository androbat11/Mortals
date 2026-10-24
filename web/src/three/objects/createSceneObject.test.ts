import { Scene } from 'three'
import { describe, expect, it } from 'vitest'
import { createSceneObject } from './createSceneObject'

describe('createSceneObject', () => {
  it('returns an empty scene', () => {
    const scene = createSceneObject()
    expect(scene).toBeInstanceOf(Scene)
    expect(scene.children).toHaveLength(0)
  })
})
