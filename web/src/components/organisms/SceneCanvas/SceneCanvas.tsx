import { useRef } from 'react'
import { useThreeScene } from '../../../hooks/useThreeScene'

function SceneCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  useThreeScene(containerRef)

  return <div ref={containerRef} className="scene-canvas" />
}

export default SceneCanvas
