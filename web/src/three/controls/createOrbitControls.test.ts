import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { describe, expect, it } from 'vitest'
import { createCamera } from '../objects/createCamera'
import { createOrbitControls } from './createOrbitControls'

describe('createOrbitControls', () => {
  it('controls the given camera on the given element', () => {
    const camera = createCamera(1)
    const element = document.createElement('canvas')
    const controls = createOrbitControls(camera, element)
    expect(controls).toBeInstanceOf(OrbitControls)
    expect(controls.object).toBe(camera)
    expect(controls.domElement).toBe(element)
    controls.dispose()
  })
})
