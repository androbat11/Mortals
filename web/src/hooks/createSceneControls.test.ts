import { describe, expect, it } from 'vitest'
import { createControlLimits } from '../three/controls/controlLimits'
import { createCamera } from '../three/objects/createCamera'
import { createViewTarget } from '../three/objects/createViewTarget'
import { createSceneControls } from './createSceneControls'
import { createSceneRepository } from './createSceneRepository'

describe('createSceneControls', () => {
  it('creates controls for the camera and element with the limits applied', () => {
    const camera = createCamera(1)
    const element = document.createElement('canvas')

    const controls = createSceneControls(createSceneRepository(), camera, element)

    expect(controls.object).toBe(camera)
    expect(controls.domElement).toBe(element)
    expect(controls).toMatchObject(createControlLimits())
    expect(controls.target.equals(createViewTarget())).toBe(true)
    controls.dispose()
  })
})
