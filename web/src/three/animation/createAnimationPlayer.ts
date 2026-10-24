import type { CharacterRig } from '../objects/character/characterRig'
import type { Animation } from './animationTypes'
import { applyPose } from './applyPose'
import { evaluateAnimation } from './evaluateAnimation'
import type { FrameUpdater } from './frameUpdater'
import type { PlaybackControl } from './playbackControl'

// Design: the player owns the one piece of state an animation needs, the
// elapsed time, in a closure (not a module-level variable, so each player is
// independent). Each frame it advances by the delta the loop gives it (already
// clamped), wraps around the duration so the move repeats, and applies the
// pose for that time. It returns a plain frame updater, so the render loop does
// not know animations exist. The user's pause and replay arrive through the
// shared `playback` control: a restart request sets the time back to 0, and
// time only advances while playing. The pose for the current time is applied
// every frame, so a paused or just-restarted move shows the right pose, while
// the loop keeps rendering and the orbit controls keep working. A non-finite
// delta is ignored, because one NaN would otherwise poison the elapsed time
// for good.
export function createAnimationPlayer(
  rig: CharacterRig,
  animation: Animation,
  playback: PlaybackControl,
): FrameUpdater {
  let elapsed = 0

  return (deltaSeconds) => {
    if (!Number.isFinite(deltaSeconds)) return
    if (playback.takeRestart()) elapsed = 0
    if (playback.isPlaying()) {
      elapsed =
        animation.duration > 0
          ? (elapsed + deltaSeconds) % animation.duration
          : 0
    }
    applyPose(rig, evaluateAnimation(animation, elapsed))
  }
}
