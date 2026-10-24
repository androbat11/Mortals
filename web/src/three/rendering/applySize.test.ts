import { describe, expect, it, vi } from 'vitest'
import { applySize } from './applySize'
import { createCamera } from '../objects/createCamera'

describe('applySize', () => {
  it('resizes the renderer and updates the camera aspect', () => {
    const renderer = { setPixelRatio: vi.fn(), setSize: vi.fn() }
    const camera = createCamera(1)

    applySize({ renderer, camera }, { width: 800, height: 400 }, 1)

    expect(renderer.setSize).toHaveBeenCalledWith(800, 400)
    expect(camera.aspect).toBe(2)
  })

  it('re-applies the pixel ratio, capped at 2', () => {
    const renderer = { setPixelRatio: vi.fn(), setSize: vi.fn() }

    applySize(
      { renderer, camera: createCamera(1) },
      { width: 100, height: 100 },
      3,
    )

    expect(renderer.setPixelRatio).toHaveBeenCalledWith(2)
  })
})
