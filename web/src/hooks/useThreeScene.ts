import { useEffect, type RefObject } from 'react'
import { Clock, Mesh, WebGLRenderer } from 'three'
import { createScene } from '../three/createScene'
import { rotateCube } from '../three/rotateCube'

const MAX_PIXEL_RATIO = 2

export function useThreeScene(containerRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const width = container.clientWidth || 1
    const height = container.clientHeight || 1
    const { scene, camera, cube } = createScene(width / height)

    const renderer = new WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO))
    renderer.setSize(width, height)
    container.appendChild(renderer.domElement)

    const resize = () => {
      const w = container.clientWidth || 1
      const h = container.clientHeight || 1
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    const observer = new ResizeObserver(resize)
    observer.observe(container)

    const clock = new Clock()
    renderer.setAnimationLoop(() => {
      rotateCube(cube, clock.getDelta())
      renderer.render(scene, camera)
    })

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
