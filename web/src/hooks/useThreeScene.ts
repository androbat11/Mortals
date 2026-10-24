import { useEffect, useState, type RefObject } from 'react'
import { applySize } from '../three/applySize'
import { clampDelta } from '../three/clampDelta'
import { applyControlLimits, createControlLimits } from '../three/controlLimits'
import { disposeScene } from '../three/disposeScene'
import { rotateCube } from '../three/rotateCube'
import { toSafeSize } from '../three/toSafeSize'
import { tryCreate } from '../three/tryCreate'
import { createSceneContents } from './createSceneContents'
import { createSceneRepository } from './createSceneRepository'

type ThreeSceneState = {
  failed: boolean
}

// Design: separation of UI and logic. This hook only wires things together:
// it creates the objects, starts the loop, and undoes it all on cleanup. Each
// piece of real logic (sizing, disposal, rotation) is a small function in
// `three/`. The hook takes a ref instead of creating the container, so any
// component can host the scene. It reports `failed` so the component can show
// a message instead of the whole app going blank.
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

    // Orbit controls let the user look around with mouse or touch. They attach
    // listeners to the canvas, so they are created after it is in the page and
    // disposed on cleanup.
    const controls = repository.create('controls', camera, renderer.domElement)
    applyControlLimits(controls, createControlLimits())

    // Responsive design: the canvas follows its container, not the window, so
    // it stays correct when the layout changes (rotating a phone, resizing a
    // panel).
    const observer = repository.create('resizeObserver', () =>
      applySize({ renderer, camera }, readSize(), window.devicePixelRatio),
    )
    observer.observe(container)

    // `setAnimationLoop` is used instead of `requestAnimationFrame` because
    // three.js pauses it in hidden tabs and can later switch it to XR frames.
    const timer = repository.create('timer')
    renderer.setAnimationLoop(() => {
      timer.update()
      controls.update()
      rotateCube(cube, clampDelta(timer.getDelta()))
      renderer.render(scene, camera)
    })

    // Cleanup undoes everything the effect created. React StrictMode mounts,
    // unmounts and mounts again in development, so without this there would be
    // two canvases, two running loops, and two sets of control listeners.
    // `forceContextLoss` releases the WebGL context right away: browsers allow
    // only a limited number of live contexts, and repeated remounts
    // (StrictMode, hot reload) would hit it.
    return () => {
      renderer.setAnimationLoop(null)
      observer.disconnect()
      controls.dispose()
      disposeScene(scene)
      renderer.forceContextLoss()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [containerRef])

  return { failed }
}
