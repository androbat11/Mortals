import { describe, expect, it } from 'vitest'
import { createXTrack } from './createXTrack'

describe('createXTrack', () => {
  it('builds one keyframe per point, rotating only around x', () => {
    const track = createXTrack('elbowL', [[0, 0], [1, -1.5]])

    expect(track.joint).toBe('elbowL')
    expect(track.keyframes).toEqual([
      { time: 0, rotation: { x: 0 } },
      { time: 1, rotation: { x: -1.5 } },
    ])
  })

  it('builds an empty track for no points', () => {
    expect(createXTrack('neck', []).keyframes).toEqual([])
  })
})
