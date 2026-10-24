import { Box3 } from 'three'
import { describe, expect, it } from 'vitest'
import { createCharacter } from '../../objects/character/createCharacter'
import { applyPose } from '../applyPose'
import { evaluateAnimation } from '../evaluateAnimation'
import { createUppercutFinisher } from './createUppercutFinisher'

describe('createUppercutFinisher', () => {
  const animation = createUppercutFinisher()

  it('has the id it is registered under and a positive duration', () => {
    expect(animation.id).toBe('uppercut-finisher')
    expect(animation.duration).toBeGreaterThan(0)
  })

  it('has keyframes in increasing time order within the duration for every track', () => {
    animation.tracks.forEach(({ keyframes }) => {
      const times = keyframes.map((keyframe) => keyframe.time)
      expect(times).toEqual([...times].sort((a, b) => a - b))
      expect(times[0]).toBeGreaterThanOrEqual(0)
      expect(times[times.length - 1]).toBeLessThanOrEqual(animation.duration)
    })
  })

  it('has at most one track per joint', () => {
    const joints = animation.tracks.map((track) => track.joint)
    expect(new Set(joints).size).toBe(joints.length)
  })

  it('loops without a pop: the pose at the end equals the pose at the start', () => {
    expect(evaluateAnimation(animation, animation.duration)).toEqual(
      evaluateAnimation(animation, 0),
    )
  })

  it('starts and ends at the rest pose', () => {
    const pose = evaluateAnimation(animation, 0)
    Object.values(pose).forEach(({ x, y, z }) => expect([x, y, z]).toEqual([0, 0, 0]))
  })

  it('raises the striking arm above the shoulder at the strike', () => {
    const rig = createCharacter()
    const shoulderY = rig.joints.shoulderR.position.y

    applyPose(rig, evaluateAnimation(animation, 1.1))
    rig.root.updateMatrixWorld(true)

    expect(new Box3().setFromObject(rig.joints.shoulderR).max.y).toBeGreaterThan(
      shoulderY + 0.3,
    )
  })

  it('keeps the feet within a few centimetres of the ground during the crouch', () => {
    const rig = createCharacter()

    applyPose(rig, evaluateAnimation(animation, 0.8))
    rig.root.updateMatrixWorld(true)

    const feet = Math.min(
      new Box3().setFromObject(rig.joints.hipL).min.y,
      new Box3().setFromObject(rig.joints.hipR).min.y,
    )
    expect(feet).toBeGreaterThanOrEqual(-0.001)
    expect(feet).toBeLessThan(0.1)
  })
})
