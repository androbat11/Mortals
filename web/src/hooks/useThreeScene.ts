import { useEffect, type RefObject } from 'react'
import { Mesh } from 'three'
import { rotateCube } from '../three/rotateCube'
import { sceneRepository } from './sceneRepository'

export function useThreeScene(containerRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

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

    const observer = sceneRepository.create('resizeObserver', () => {
      const w = container.clientWidth || 1
      const h = container.clientHeight || 1
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    })
    observer.observe(container)

    const clock = sceneRepository.create('clock')
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
