import { useEffect, type RefObject } from 'react'
import { Mesh } from 'three'
import { rotateCube } from '../three/rotateCube'
import { sceneRepository } from './sceneRepository'

export function useThreeScene(containerRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // `|| 1` avoids a zero size (and a NaN aspect ratio) if the container has
    // not been laid out yet.
    const width = container.clientWidth || 1
    const height = container.clientHeight || 1

    const scene = sceneRepository.create('scene')
    const camera = sceneRepository.create('camera', width / height)
    const cube = sceneRepository.create('cube')
    scene.add(cube)

    const renderer = sceneRepository.create(
      'renderer',
      width,
      height,
      window.devicePixelRatio,
    )
    container.appendChild(renderer.domElement)

    // Responsive design: the canvas follows its container, not the window, so
    // it stays correct when the layout changes (rotating a phone, resizing a
    // panel). Updating the camera aspect and projection matrix avoids a
    // stretched cube.
    const observer = sceneRepository.create('resizeObserver', () => {
      const w = container.clientWidth || 1
      const h = container.clientHeight || 1
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    })
    observer.observe(container)

    // `setAnimationLoop` is used instead of `requestAnimationFrame` because
    // three.js pauses it in hidden tabs and can later switch it to XR frames.
    const clock = sceneRepository.create('clock')
    renderer.setAnimationLoop(() => {
      rotateCube(cube, clock.getDelta())
      renderer.render(scene, camera)
    })

    // Cleanup undoes everything the effect created. React StrictMode mounts,
    // unmounts and mounts again in development, so without this there would be
    // two canvases and two running loops. WebGL memory is not garbage
    // collected, so geometry, material, and renderer are disposed explicitly.
    return () => {
      renderer.setAnimationLoop(null)
      observer.disconnect()
      scene.traverse((object) => {
        if (object instanceof Mesh) {
          object.geometry.dispose()
          object.material.dispose()
        }
      })
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [containerRef])
}
