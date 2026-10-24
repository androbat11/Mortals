import { Box3 } from 'three'
import { describe, expect, it } from 'vitest'
import { createCharacter } from '../../objects/character/createCharacter'
import { applyPose } from '../applyPose'
import type { AnimationId } from '../animationTypes'
import { evaluateAnimation } from '../evaluateAnimation'
import { createAnimation } from './createAnimation'

const newIds: AnimationId[] = ['sweep-kick-finisher', 'overhead-smash-finisher']

function highestPoint(id: AnimationId, time: number, joint: 'shoulderR' | 'hipR') {
  const rig = createCharacter()
  applyPose(rig, evaluateAnimation(createAnimation(id), time))
  rig.root.updateMatrixWorld(true)
  return new Box3().setFromObject(rig.joints[joint])
}

describe.each(newIds)('%s', (id) => {
  const animation = createAnimation(id)

  it('has its own id and a positive duration', () => {
    expect(animation.id).toBe(id)
    expect(animation.duration).toBeGreaterThan(0)
  })

  it('starts and ends at the rest pose, so the loop has no pop', () => {
    const start = evaluateAnimation(animation, 0)
    expect(evaluateAnimation(animation, animation.duration)).toEqual(start)
    Object.values(start).forEach(({ x, y, z }) => expect([x, y, z]).toEqual([0, 0, 0]))
  })

  it('moves at least one joint away from the rest pose in the middle', () => {
    const pose = evaluateAnimation(animation, 1.1)
    const moved = Object.values(pose).some(({ x, y, z }) => x !== 0 || y !== 0 || z !== 0)
    expect(moved).toBe(true)
  })
})

describe('the finisher moves', () => {
  it('sweep kick: the kicking leg is raised forward, with the foot well above the ground', () => {
    const leg = highestPoint('sweep-kick-finisher', 1.0, 'hipR')

    expect(leg.min.y).toBeGreaterThan(0.3)
    expect(leg.max.z).toBeGreaterThan(0.5)
  })

  it('overhead smash: both arms go above the head, then come down in front of the body', () => {
    const raised = highestPoint('overhead-smash-finisher', 0.9, 'shoulderR')
    const slammed = highestPoint('overhead-smash-finisher', 1.2, 'shoulderR')

    expect(raised.max.y).toBeGreaterThan(1.8)
    expect(slammed.max.y).toBeLessThan(raised.max.y - 0.3)
  })

  it('has three different animations in the registry', () => {
    const ids: AnimationId[] = ['uppercut-finisher', ...newIds]
    const poses = ids.map((id) => JSON.stringify(evaluateAnimation(createAnimation(id), 1.1)))
    expect(new Set(poses).size).toBe(3)
  })
})
