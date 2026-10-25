// Design: type-first. Playback (playing or paused, and "start over") is shared
// between the buttons in React and the animation player in the render loop. It
// is one small object with its state in a closure (not a module-level variable,
// so each page gets its own), which the buttons write and the player reads every
// frame. That lets the user pause or replay without rebuilding the scene, which
// would also recreate the WebGL context. The render loop does not know it exists.
export type PlaybackControl = {
  isPlaying: () => boolean
  play: () => void
  pause: () => void
  // Start from the beginning and play, also when paused.
  restart: () => void
  // True once per restart request, so the player resets its time exactly once.
  takeRestart: () => boolean
}

export function createPlaybackControl(initiallyPlaying = true): PlaybackControl {
  let playing = initiallyPlaying
  let restartRequested = false

  return {
    isPlaying: () => playing,
    play: () => {
      playing = true
    },
    pause: () => {
      playing = false
    },
    restart: () => {
      restartRequested = true
      playing = true
    },
    takeRestart: () => {
      const requested = restartRequested
      restartRequested = false
      return requested
    },
  }
}
