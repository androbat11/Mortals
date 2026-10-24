import { useEffect, useState, type RefObject } from 'react'
import { startRenderLoop } from '../three/animation/startRenderLoop'
import { tryCreate } from '../three/core/tryCreate'
import { applySize } from '../three/rendering/applySize'
import { toSafeSize } from '../three/rendering/toSafeSize'
import { createSceneCleanup } from './createSceneCleanup'
import { createSceneContents } from './createSceneContents'
import { createSceneControls } from './createSceneControls'
import { createSceneRepository } from './createSceneRepository'

type ThreeSceneState = {
  failed: boolean
}

// Design: separation of UI and logic. This hook only wires things together; each
// piece of real work is a small function (contents, controls, sizing, the
// per-frame loop, cleanup). The hook takes a ref instead of creating the
// container, so any component can host the scene. It reports `failed` so the
// component can show a message instead of the whole app going blank.
export function useThreeScene(
  containerRef: RefObject<HTMLDivElement | null>,
): ThreeSceneState {
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Every object comes from the repository, never from an inline `new`.
    const repository = createSceneRepository()
    const readSize = () =>
      toSafeSize(container.clientWidth, container.clientHeight)
    const { width, height } = readSize()

    // The renderer is created first, alone, because it is the one step that
    // can throw (WebGL unavailable or blocked). Failing here means nothing else
    // has been created yet, so there is nothing to clean up, and the error does
    // not unmount the whole React tree.
    const renderer = tryCreate(() =>
      repository.create('renderer', width, height, window.devicePixelRatio),
    )
    if (!renderer) {
      setFailed(true)
      return
    }

    const { scene, camera, cube } = createSceneContents(
      repository,
      width / height,
    )
    container.appendChild(renderer.domElement)

    // The controls attach listeners to the canvas, so they are created after
    // it is in the page.
    const controls = createSceneControls(repository, camera, renderer.domElement)

    // Responsive design: the canvas follows its container, not the window, so
    // it stays correct when the layout changes (rotating a phone, resizing a
    // panel).
    const observer = repository.create('resizeObserver', () =>
      applySize({ renderer, camera }, readSize(), window.devicePixelRatio),
    )
    observer.observe(container)

    const stopLoop = startRenderLoop({
      renderer,
      scene,
      camera,
      cube,
      controls,
      timer: repository.create('timer'),
    })

    return createSceneCleanup({ stopLoop, observer, controls, scene, renderer })
  }, [containerRef])

  return { failed }
}
