import type { CharacterRig } from './characterRig'
import { createBodyMaterial } from './createBodyMaterial'
import { createBodyPart } from './createBodyPart'
import { createCharacterDimensions } from './createCharacterDimensions'
import { createCharacterPalette } from './createCharacterPalette'
import { createJoint } from './createJoint'
import { createLimb } from './createLimb'

// Design: this only assembles. The measurements, colours, parts, joints and
// limbs each come from their own small function, so this file reads as the body
// plan: a pelvis and torso, a head on a neck joint, and two arms and two legs
// under named joints. The character stands upright with its feet on the ground
// at y = 0. It is a plain Three.js group built from boxes, with no imported
// model. Animation is Phase 5: here the character stands still.
export function createCharacter(): CharacterRig {
  const palette = createCharacterPalette()
  const dim = createCharacterDimensions()
  const skin = createBodyMaterial(palette.skin)
  const outfit = createBodyMaterial(palette.outfit)
  const accent = createBodyMaterial(palette.accent)

  const root = createJoint({ x: 0, y: 0, z: 0 })

  const pelvis = createBodyPart(dim.pelvis, accent)
  pelvis.position.y = dim.pelvisTop.y
  const torso = createBodyPart(dim.torso, outfit)
  torso.position.y = dim.torsoTop.y
  root.add(pelvis, torso)

  // The head stands above the neck joint, so it is lifted by its own height.
  const neck = createJoint(dim.neck)
  const head = createBodyPart(dim.head, skin)
  head.position.y = dim.head.height
  neck.add(head)
  root.add(neck)

  // Sides: +x is the character's left (it faces +z), -x its right.
  const arm = (side: 1 | -1) =>
    createLimb({
      position: { ...dim.shoulder, x: side * dim.shoulder.x },
      upper: { size: dim.upperArm, material: outfit },
      lower: { size: dim.forearm, material: skin },
    })
  const leg = (side: 1 | -1) =>
    createLimb({
      position: { ...dim.hip, x: side * dim.hip.x },
      upper: { size: dim.upperLeg, material: outfit },
      lower: { size: dim.lowerLeg, material: accent },
    })

  const armL = arm(1)
  const armR = arm(-1)
  const legL = leg(1)
  const legR = leg(-1)
  root.add(armL.joint, armR.joint, legL.joint, legR.joint)

  return {
    root,
    joints: {
      neck,
      shoulderL: armL.joint,
      shoulderR: armR.joint,
      elbowL: armL.childJoint,
      elbowR: armR.childJoint,
      hipL: legL.joint,
      hipR: legR.joint,
      kneeL: legL.childJoint,
      kneeR: legR.childJoint,
    },
  }
}
