import { startRenderLoop } from '../three/animation/startRenderLoop'
import { applySize } from '../three/rendering/applySize'
import type { createRenderer } from '../three/rendering/createRenderer'
import { createSceneCleanup, type CleanupTargets } from './createSceneCleanup'
import { createSceneContents } from './createSceneContents'
import { createSceneControls } from './createSceneControls'
import type { SceneRepository } from './createSceneRepository'
import { readContainerSize } from './readContainerSize'

type Renderer = ReturnType<typeof createRenderer>

// Design: assembling the scene around an existing renderer is one job, and it
// owns its own failure handling. Anything after the renderer (the contents, the
// controls, the resize observer, the loop) can throw, for example a browser
// without `ResizeObserver`. The parts created so far are kept in `parts`, so on
// an error exactly those are undone (listeners, GPU objects, context, canvas)
// before the error is passed on; without that the effect would leak and the
// error would unmount the whole React tree. On success it returns the cleanup.
export function setupScene(
  repository: SceneRepository,
  container: HTMLElement,
  renderer: Renderer,
) {
  const parts: CleanupTargets = { renderer }

  try {
    const { width, height } = readContainerSize(container)
    const { scene, camera, updaters } = createSceneContents(
      repository,
      width / height,
    )
    parts.scene = scene
    container.appendChild(renderer.domElement)

    // The controls attach listeners to the canvas, so they are created after
    // it is in the page.
    const controls = createSceneControls(repository, camera, renderer.domElement)
    parts.controls = controls

    // Responsive design: the canvas follows its container, not the window, so
    // it stays correct when the layout changes (rotating a phone, resizing a
    // panel).
    const observer = repository.create('resizeObserver', () =>
      applySize(
        { renderer, camera },
        readContainerSize(container),
        window.devicePixelRatio,
      ),
    )
    parts.observer = observer
    observer.observe(container)

    parts.stopLoop = startRenderLoop({
      renderer,
      scene,
      camera,
      controls,
      timer: repository.create('timer'),
      updaters,
    })
  } catch (error) {
    createSceneCleanup(parts)()
    throw error
  }

  return createSceneCleanup(parts)
}
