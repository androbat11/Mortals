import { Scene } from 'three'

// The factory is named `createSceneObject` because `createScene` would read as
// "build the whole scene". This only creates the empty container; filling it is
// `createSceneContents` in `hooks/`.
export function createSceneObject() {
  return new Scene()
}
