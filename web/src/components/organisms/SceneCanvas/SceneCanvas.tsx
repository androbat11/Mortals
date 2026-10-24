import { useRef } from 'react'
import { useThreeScene } from '../../../hooks/useThreeScene'

type SceneCanvasProps = {
  label: string
  className?: string
}

// Design: an organism in atomic design, because it owns a self-contained part
// of the screen (the 3D view) that later phases extend with a character and
// controls. It renders only a container: the logic is in `useThreeScene`, and
// the sizing is in CSS (it fills its parent), so the parent decides the size.
// It accepts a `className` so a page or template can position or size it,
// which keeps it composable instead of tied to one layout. If WebGL is not
// available it shows a short message rather than an empty box. A canvas has no
// text, so `label` gives it an accessible name; it is a required prop so every
// screen has to describe what the 3D view shows.
function SceneCanvas({ label, className }: SceneCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { failed } = useThreeScene(containerRef)

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={label}
      className={className ? `scene-canvas ${className}` : 'scene-canvas'}
    >
      {failed && <p role="alert">The 3D view is not available on this device.</p>}
    </div>
  )
}

export default SceneCanvas
