import { PerspectiveCamera } from 'three'
import { createViewTarget } from './createViewTarget'

export function createCamera(aspect: number) {
  // The aspect ratio is a parameter, not read from the window, so the factory
  // has no hidden inputs. 60 degrees is a natural field of view for a single
  // object. The camera starts above and to the side, looking at the view
  // target (the centre of the character), so the user sees the character and the
  // ground from a natural angle before they touch the controls. It sits inside
  // the control limits' zoom range. It starts close because the move previews are
  // wide, short 16:9 slots, where a far camera leaves the figure tiny.
  const camera = new PerspectiveCamera(60, aspect, 0.1, 100)
  camera.position.set(2.1, 1.7, 2.8)
  camera.lookAt(createViewTarget())
  return camera
}
