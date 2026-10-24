import { describe, expect, it } from 'vitest'
import { createCamera } from '../objects/createCamera'
import { applyControlLimits, createControlLimits } from './controlLimits'

describe('createControlLimits', () => {
  it('disables panning so the scene cannot be pushed out of view', () => {
    expect(createControlLimits().enablePan).toBe(false)
  })

  it('has a positive zoom range with the minimum below the maximum', () => {
    const { minDistance, maxDistance } = createControlLimits()
    expect(minDistance).toBeGreaterThan(0)
    expect(minDistance).toBeLessThan(maxDistance)
  })

  it('stops the camera above the horizon so it cannot go under the ground', () => {
    expect(createControlLimits().maxPolarAngle).toBeLessThan(Math.PI / 2)
  })

  it('starts the camera inside the zoom range and below the polar limit', () => {
    const { minDistance, maxDistance, maxPolarAngle } = createControlLimits()
    const { position } = createCamera(1)
    const polarAngle = Math.acos(position.y / position.length())

    expect(position.length()).toBeGreaterThanOrEqual(minDistance)
    expect(position.length()).toBeLessThanOrEqual(maxDistance)
    expect(polarAngle).toBeLessThanOrEqual(maxPolarAngle)
  })

  it('returns a new object each time', () => {
    expect(createControlLimits()).not.toBe(createControlLimits())
  })
})

describe('applyControlLimits', () => {
  it('copies every limit onto the controls', () => {
    const controls = createControlLimits()
    Object.assign(controls, {
      enablePan: true,
      enableDamping: false,
      minDistance: 0,
      maxDistance: 100,
      maxPolarAngle: Math.PI,
    })

    applyControlLimits(controls, createControlLimits())

    expect(controls).toEqual(createControlLimits())
  })
})
