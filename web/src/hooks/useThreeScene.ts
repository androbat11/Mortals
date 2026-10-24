import { useEffect, type RefObject } from 'react'
import { applySize } from '../three/applySize'
import { clampDelta } from '../three/clampDelta'
import { disposeScene } from '../three/disposeScene'
import { rotateCube } from '../three/rotateCube'
import { toSafeSize } from '../three/toSafeSize'
import { createSceneRepository } from './createSceneRepository'

// Design: separation of UI and logic. This hook only wires things together:
// it creates the objects, starts the loop, and undoes it all on cleanup. Each
// piece of real logic (sizing, disposal, rotation) is a small function in
// `three/`. The hook takes a ref instead of creating the container, so any
// component can host the scene.
export function useThreeScene(containerRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Every object comes from the repository, never from an inline `new`.
    const repository = createSceneRepository()
    const readSize = () =>
      toSafeSize(container.clientWidth, container.clientHeight)

    const { width, height } = readSize()
    const scene = repository.create('scene')
    const camera = repository.create('camera', width / height)
    const cube = repository.create('cube')
    scene.add(cube)

    const renderer = repository.create(
      'renderer',
      width,
      height,
      window.devicePixelRatio,
    )
    container.appendChild(renderer.domElement)

    // Responsive design: the canvas follows its container, not the window, so
    // it stays correct when the layout changes (rotating a phone, resizing a
    // panel).
    const observer = repository.create('resizeObserver', () =>
      applySize({ renderer, camera }, readSize(), window.devicePixelRatio),
    )
    observer.observe(container)

    // `setAnimationLoop` is used instead of `requestAnimationFrame` because
    // three.js pauses it in hidden tabs and can later switch it to XR frames.
    const clock = repository.create('clock')
    renderer.setAnimationLoop(() => {
      rotateCube(cube, clampDelta(clock.getDelta()))
      renderer.render(scene, camera)
    })

    // Cleanup undoes everything the effect created. React StrictMode mounts,
    // unmounts and mounts again in development, so without this there would be
    // two canvases and two running loops.
    return () => {
      renderer.setAnimationLoop(null)
      observer.disconnect()
      disposeScene(scene)
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [containerRef])
}
