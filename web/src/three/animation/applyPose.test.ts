import { describe, expect, it } from 'vitest'
import { createCharacter } from '../objects/character/createCharacter'
import { applyPose } from './applyPose'

describe('applyPose', () => {
  it('sets the rotation of the joints named in the pose', () => {
    const rig = createCharacter()

    applyPose(rig, { elbowL: { x: -1, y: 0.5, z: 0.25 } })

    expect(rig.joints.elbowL.rotation.toArray().slice(0, 3)).toEqual([-1, 0.5, 0.25])
  })

  it('leaves joints that are not in the pose untouched', () => {
    const rig = createCharacter()
    rig.joints.kneeR.rotation.x = 0.3

    applyPose(rig, { elbowL: { x: -1, y: 0, z: 0 } })

    expect(rig.joints.kneeR.rotation.x).toBeCloseTo(0.3)
    expect(rig.joints.neck.rotation.x).toBe(0)
  })
})
