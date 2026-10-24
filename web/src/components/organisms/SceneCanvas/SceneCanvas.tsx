import { useRef } from 'react'
import { useThreeScene } from '../../../hooks/useThreeScene'

type SceneCanvasProps = {
  className?: string
}

// Design: an organism in atomic design, because it owns a self-contained part
// of the screen (the 3D view) that later phases extend with a character and
// controls. It renders only a container: the logic is in `useThreeScene`, and
// the sizing is in CSS (it fills its parent), so the parent decides the size.
// It accepts a `className` so a page or template can position or size it,
// which keeps it composable instead of tied to one layout.
function SceneCanvas({ className }: SceneCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  useThreeScene(containerRef)

  return (
    <div
      ref={containerRef}
      className={className ? `scene-canvas ${className}` : 'scene-canvas'}
    />
  )
}

export default SceneCanvas
