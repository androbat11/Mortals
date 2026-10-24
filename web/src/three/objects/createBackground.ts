import { Color } from 'three'

// A deliberate dark blue-gray instead of the default black, close to the
// ground's colour, so the horizon looks like part of the scene and not like an
// empty void. It is the same colour as the fog, which makes the ground fade
// into it. A full palette is Phase 12 (Polish).
export function createBackground() {
  return new Color(0x1f2937)
}
