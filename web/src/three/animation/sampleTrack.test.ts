import { describe, expect, it } from 'vitest'
import type { Keyframe } from './animationTypes'
import { sampleTrack } from './sampleTrack'

const keyframes: Keyframe[] = [
  { time: 0, rotation: { x: 0 } },
  { time: 1, rotation: { x: 2, y: 4 } },
  { time: 3, rotation: { x: 2, y: 0 } },
]

describe('sampleTrack', () => {
  it('returns the keyframe value at an exact keyframe', () => {
    expect(sampleTrack(keyframes, 1)).toEqual({ x: 2, y: 4, z: 0 })
  })

  it('interpolates linearly between two keyframes', () => {
    expect(sampleTrack(keyframes, 0.5)).toEqual({ x: 1, y: 2, z: 0 })
    expect(sampleTrack(keyframes, 2)).toEqual({ x: 2, y: 2, z: 0 })
  })

  it('treats an axis left out of a keyframe as 0', () => {
    expect(sampleTrack(keyframes, 0).y).toBe(0)
  })

  it('holds the first value before the first keyframe and the last after the last', () => {
    expect(sampleTrack(keyframes, -5)).toEqual({ x: 0, y: 0, z: 0 })
    expect(sampleTrack(keyframes, 99)).toEqual({ x: 2, y: 0, z: 0 })
  })

  it('handles a track with one keyframe and an empty track', () => {
    expect(sampleTrack([{ time: 1, rotation: { z: 3 } }], 7)).toEqual({ x: 0, y: 0, z: 3 })
    expect(sampleTrack([], 1)).toEqual({ x: 0, y: 0, z: 0 })
  })
})
