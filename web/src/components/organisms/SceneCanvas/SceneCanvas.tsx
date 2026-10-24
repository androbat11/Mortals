import { useRef } from 'react'
import { useThreeScene } from '../../../hooks/useThreeScene'

type SceneCanvasProps = {
  label: string
  className?: string
}

// Design: an organism in atomic design, because it owns a self-contained part
// of the screen (the 3D view: the character, the ground, the controls). It renders only a container: the logic is in `useThreeScene`, and
// the sizing is in CSS (it fills its parent), so the parent decides the size.
// It accepts a `className` so a page or template can position or size it,
// which keeps it composable instead of tied to one layout.
// A canvas has no text, so `label` gives it an accessible name; it is a
// required prop so every screen has to describe what the 3D view shows. The
// `img` role applies only while the scene is showing: if WebGL is not available
// the container holds a plain message instead, which must not sit inside an
// element that screen readers treat as an image.
function SceneCanvas({ label, className }: SceneCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { failed } = useThreeScene(containerRef)

  return (
    <div
      ref={containerRef}
      role={failed ? undefined : 'img'}
      aria-label={failed ? undefined : label}
      className={className ? `scene-canvas ${className}` : 'scene-canvas'}
    >
      {failed && <p role="alert">The 3D view is not available on this device.</p>}
    </div>
  )
}

export default SceneCanvas
