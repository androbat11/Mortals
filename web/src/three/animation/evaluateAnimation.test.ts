import { describe, expect, it } from 'vitest'
import type { Animation } from './animationTypes'
import { evaluateAnimation } from './evaluateAnimation'

const animation: Animation = {
  id: 'uppercut-finisher',
  duration: 2,
  tracks: [
    {
      joint: 'shoulderR',
      keyframes: [
        { time: 0, rotation: { x: 0 } },
        { time: 2, rotation: { x: -2 } },
      ],
    },
    { joint: 'neck', keyframes: [{ time: 0, rotation: { x: 1 } }] },
  ],
}

describe('evaluateAnimation', () => {
  it('returns the interpolated rotation of every tracked joint', () => {
    const pose = evaluateAnimation(animation, 1)
    expect(pose.shoulderR).toEqual({ x: -1, y: 0, z: 0 })
    expect(pose.neck).toEqual({ x: 1, y: 0, z: 0 })
  })

  it('leaves joints that have no track out of the pose', () => {
    expect(Object.keys(evaluateAnimation(animation, 1)).sort()).toEqual([
      'neck',
      'shoulderR',
    ])
  })

  it('gives the same pose for the same time, so it has no hidden state', () => {
    expect(evaluateAnimation(animation, 0.7)).toEqual(
      evaluateAnimation(animation, 0.7),
    )
  })
})
