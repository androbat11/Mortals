import { Timer } from 'three'

// `Clock` is deprecated in current three.js; `Timer` replaces it. Call
// `update()` once per frame, then read `getDelta()`.
export function createTimer() {
  return new Timer()
}
