import type { Keyframe, Rotation } from './animationTypes'

function toRotation({ x = 0, y = 0, z = 0 }: Partial<Rotation>): Rotation {
  return { x, y, z }
}

function lerp(from: number, to: number, amount: number) {
  return from + (to - from) * amount
}

// Design: sampling one track at one time is the smallest piece of the
// evaluator, so it is its own pure function. Linear interpolation between the
// two keyframes around the time is predictable and easy to test; the first
// value is held before the first keyframe and the last after the last one, so
// a time outside the track never extrapolates. The keyframes must be in
// increasing time order, which a test checks for the shipped animations.
export function sampleTrack(keyframes: Keyframe[], time: number): Rotation {
  if (keyframes.length === 0) return { x: 0, y: 0, z: 0 }

  const first = keyframes[0]
  const last = keyframes[keyframes.length - 1]
  if (time <= first.time) return toRotation(first.rotation)
  if (time >= last.time) return toRotation(last.rotation)

  const nextIndex = keyframes.findIndex((keyframe) => keyframe.time > time)
  const before = keyframes[nextIndex - 1]
  const after = keyframes[nextIndex]
  const amount = (time - before.time) / (after.time - before.time)
  const from = toRotation(before.rotation)
  const to = toRotation(after.rotation)

  return {
    x: lerp(from.x, to.x, amount),
    y: lerp(from.y, to.y, amount),
    z: lerp(from.z, to.z, amount),
  }
}
