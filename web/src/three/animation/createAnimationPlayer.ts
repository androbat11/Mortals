import type { CharacterRig } from '../objects/character/characterRig'
import type { Animation } from './animationTypes'
import { applyPose } from './applyPose'
import { evaluateAnimation } from './evaluateAnimation'
import type { FrameUpdater } from './frameUpdater'

// Design: the player owns the one piece of state an animation needs, the
// elapsed time, in a closure (not a module-level variable, so each player is
// independent). Each frame it advances by the delta the loop gives it (already
// clamped), wraps around the duration so the move repeats, and applies the
// pose for that time. It returns a plain frame updater, so the render loop does
// not know animations exist. Pause and restart (Phase 8) will be changes here,
// and the loop will not change.
export function createAnimationPlayer(
  rig: CharacterRig,
  animation: Animation,
): FrameUpdater {
  let elapsed = 0

  return (deltaSeconds) => {
    elapsed =
      animation.duration > 0 ? (elapsed + deltaSeconds) % animation.duration : 0
    applyPose(rig, evaluateAnimation(animation, elapsed))
  }
}
