import { Box3 } from 'three'
import { describe, expect, it } from 'vitest'
import { createCharacter } from '../../objects/character/createCharacter'
import type { AnimationId } from '../animationTypes'
import { applyPose } from '../applyPose'
import { evaluateAnimation } from '../evaluateAnimation'
import { createAnimation } from './createAnimation'
import { createAnimationRepository } from './createAnimationRepository'

const ids = createAnimationRepository().keys() as AnimationId[]

describe.each(ids)('%s keeps the feet near the ground', (id) => {
  it('keeps every foot within 3 cm below and 12 cm above the ground', () => {
    const animation = createAnimation(id)
    for (let time = 0; time <= animation.duration; time += 0.1) {
      const rig = createCharacter()
      applyPose(rig, evaluateAnimation(animation, time))
      rig.root.updateMatrixWorld(true)
      // The lower part of each leg, from its knee joint, contains the foot. The
      // exact vertex positions are used (`precise`), because the box around a
      // tilted box is bigger than the box. A tilted foot can dip a corner a little
      // into the ground, as there is no foot joint, so a few centimetres is
      // allowed; the sweep kick raises one foot on purpose, so only the lower
      // limit applies to it.
      const feet = [rig.joints.kneeL, rig.joints.kneeR].map(
        (knee) => new Box3().setFromObject(knee, true).min.y,
      )
      expect(Math.min(...feet)).toBeGreaterThanOrEqual(-0.03)
      if (id !== 'sweep-kick-finisher') expect(Math.max(...feet)).toBeLessThan(0.12)
    }
  })
})
