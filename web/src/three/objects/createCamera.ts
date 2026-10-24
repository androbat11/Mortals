import { PerspectiveCamera } from 'three'

export function createCamera(aspect: number) {
  // The aspect ratio is a parameter, not read from the window, so the factory
  // has no hidden inputs. 60 degrees is a natural field of view for a single
  // object. The camera starts above and to the side, looking at the origin, so
  // the user sees the cube and the ground from a natural angle before they
  // touch the controls. It sits inside the control limits' zoom range.
  const camera = new PerspectiveCamera(60, aspect, 0.1, 100)
  camera.position.set(3, 2.5, 4)
  camera.lookAt(0, 0, 0)
  return camera
}
