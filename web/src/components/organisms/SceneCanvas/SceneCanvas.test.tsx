import { cleanup, render, screen } from '@testing-library/react'
import { StrictMode } from 'react'
import { BoxGeometry, MeshBasicMaterial, Scene, Timer } from 'three'
import type { Object3D } from 'three'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { stubResizeObserver } from '../../../test/stubResizeObserver'
import SceneCanvas from './SceneCanvas'

const mockThree = await vi.hoisted(async () =>
  (await import('../../../test/mockThree')).createMockThree(),
)

vi.mock('three', async (importOriginal) =>
  mockThree.withMockRenderer(await importOriginal()),
)

const { renderers } = mockThree

function getLoop() {
  return renderers[0].setAnimationLoop.mock.calls[0][0] as () => void
}

beforeEach(() => {
  renderers.length = 0
})

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('SceneCanvas', () => {
  it('appends a canvas and starts the animation loop on mount', () => {
    stubResizeObserver()
    const { container } = render(<SceneCanvas />)
    expect(container.querySelectorAll('canvas')).toHaveLength(1)
    expect(renderers[0].setAnimationLoop).toHaveBeenCalledWith(
      expect.any(Function),
    )
  })

  it('renders each frame and rotates the cube by the clamped delta', () => {
    stubResizeObserver()
    let cube: Object3D | undefined
    const add = Scene.prototype.add
    vi.spyOn(Scene.prototype, 'add').mockImplementation(function (
      this: Scene,
      ...objects: Object3D[]
    ) {
      cube = objects[0]
      return add.apply(this, objects)
    })
    // A 5 second delta (a tab returning from the background) must be clamped.
    vi.spyOn(Timer.prototype, 'getDelta').mockReturnValue(5)
    render(<SceneCanvas />)

    getLoop()()

    expect(renderers[0].render).toHaveBeenCalledTimes(1)
    expect(cube?.rotation.x).toBeCloseTo(0.1)
  })

  it('resizes the renderer from the container size and re-applies the capped pixel ratio', () => {
    const { callbacks } = stubResizeObserver()
    vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(800)
    vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(400)
    vi.stubGlobal('devicePixelRatio', 3)
    render(<SceneCanvas />)
    renderers[0].setSize.mockClear()
    renderers[0].setPixelRatio.mockClear()

    callbacks[0]([], {} as ResizeObserver)

    expect(renderers[0].setSize).toHaveBeenCalledWith(800, 400)
    expect(renderers[0].setPixelRatio).toHaveBeenCalledWith(2)
  })

  it('accepts a className from its parent', () => {
    stubResizeObserver()
    const { container } = render(<SceneCanvas className="custom" />)
    expect(container.firstElementChild).toHaveClass('scene-canvas', 'custom')
  })

  it('shows a message instead of crashing when the renderer cannot be created', () => {
    const { observers } = stubResizeObserver()
    // Make the next `new WebGLRenderer()` throw, as it does without WebGL.
    mockThree.failNextRenderer()

    const { container } = render(<SceneCanvas />)

    expect(screen.getByRole('alert')).toHaveTextContent('not available')
    expect(container.querySelector('canvas')).toBeNull()
    expect(observers).toHaveLength(0)
  })

  it('stops the loop, disconnects, disposes everything, releases the context and removes the canvas on unmount', () => {
    const { observers } = stubResizeObserver()
    const geometry = vi.spyOn(BoxGeometry.prototype, 'dispose')
    const material = vi.spyOn(MeshBasicMaterial.prototype, 'dispose')
    const { container, unmount } = render(<SceneCanvas />)

    unmount()

    expect(renderers[0].setAnimationLoop).toHaveBeenLastCalledWith(null)
    expect(observers[0].disconnect).toHaveBeenCalledTimes(1)
    expect(geometry).toHaveBeenCalledTimes(1)
    expect(material).toHaveBeenCalledTimes(1)
    expect(renderers[0].forceContextLoss).toHaveBeenCalledTimes(1)
    expect(renderers[0].dispose).toHaveBeenCalledTimes(1)
    expect(container.querySelector('canvas')).toBeNull()
  })

  it('leaves a single canvas and a stopped first loop after a StrictMode double mount', () => {
    stubResizeObserver()
    const { container } = render(
      <StrictMode>
        <SceneCanvas />
      </StrictMode>,
    )
    expect(container.querySelectorAll('canvas')).toHaveLength(1)
    expect(renderers).toHaveLength(2)
    expect(renderers[0].setAnimationLoop).toHaveBeenLastCalledWith(null)
    expect(renderers[0].dispose).toHaveBeenCalled()
  })
})
