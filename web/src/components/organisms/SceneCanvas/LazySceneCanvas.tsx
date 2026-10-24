import { lazy, type ComponentType } from 'react'
import type { SceneCanvasProps } from './SceneCanvas'
import SceneLoadError from './SceneLoadError'

// Design: Three.js is most of the app's size, so the scene is loaded only when a
// fatality page needs it (the list page never downloads it). This is the one
// deliberate module-level value in the app: React needs a lazy component to be
// created once, outside any component, because creating it during a render
// restarts loading every time (the linter flags that too), and it holds no
// application state. If the download fails, the rejected import is caught and
// the error message is used as the component, so the page shows a message
// instead of a blank scene.
const LazySceneCanvas = lazy<ComponentType<SceneCanvasProps>>(() =>
  import('./SceneCanvas').catch(() => ({ default: SceneLoadError })),
)

export default LazySceneCanvas
