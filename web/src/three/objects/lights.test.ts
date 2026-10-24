import { AmbientLight, DirectionalLight } from 'three'
import { describe, expect, it } from 'vitest'
import { createAmbientLight } from './createAmbientLight'
import { createDirectionalLight } from './createDirectionalLight'

describe('lights', () => {
  it('createAmbientLight returns an ambient light', () => {
    expect(createAmbientLight()).toBeInstanceOf(AmbientLight)
  })

  it('createDirectionalLight returns a directional light above the scene', () => {
    const light = createDirectionalLight()
    expect(light).toBeInstanceOf(DirectionalLight)
    expect(light.position.y).toBeGreaterThan(0)
  })
})
