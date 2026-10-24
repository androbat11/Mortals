import { cleanup, render, screen } from '@testing-library/react'
import { StrictMode } from 'react'
import { BoxGeometry, MeshStandardMaterial, PlaneGeometry } from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { createControlLimits } from '../../../three/controls/controlLimits'
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
    const { container } = render(<SceneCanvas label="Test scene" animationId="uppercut-finisher" />)
    expect(container.querySelectorAll('canvas')).toHaveLength(1)
    expect(renderers[0].setAnimationLoop).toHaveBeenCalledWith(
      expect.any(Function),
    )
  })

  it('renders each frame from the animation loop', () => {
    stubResizeObserver()
    render(<SceneCanvas label="Test scene" animationId="uppercut-finisher" />)

    getLoop()()

    expect(renderers[0].render).toHaveBeenCalledTimes(1)
  })

  it('resizes the renderer from the container size and re-applies the capped pixel ratio', () => {
    const { callbacks } = stubResizeObserver()
    vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(800)
    vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(400)
    vi.stubGlobal('devicePixelRatio', 3)
    render(<SceneCanvas label="Test scene" animationId="uppercut-finisher" />)
    renderers[0].setSize.mockClear()
    renderers[0].setPixelRatio.mockClear()

    callbacks[0]([], {} as ResizeObserver)

    expect(renderers[0].setSize).toHaveBeenCalledWith(800, 400)
    expect(renderers[0].setPixelRatio).toHaveBeenCalledWith(2)
  })

  it('gives the 3D view an accessible name', () => {
    stubResizeObserver()
    render(<SceneCanvas label="A low-poly fighter" animationId="uppercut-finisher" />)
    expect(screen.getByRole('img', { name: 'A low-poly fighter' })).toBeInTheDocument()
  })

  it('applies the control limits and updates the controls every frame', () => {
    stubResizeObserver()
    const update = vi.spyOn(OrbitControls.prototype, 'update')
    const controls: OrbitControls[] = []
    const dispose = OrbitControls.prototype.dispose
    vi.spyOn(OrbitControls.prototype, 'dispose').mockImplementation(function (
      this: OrbitControls,
    ) {
      controls.push(this)
      dispose.call(this)
    })
    const { unmount } = render(<SceneCanvas label="Test scene" animationId="uppercut-finisher" />)
    update.mockClear()

    getLoop()()
    unmount()

    expect(update).toHaveBeenCalledTimes(1)
    expect(controls[0]).toMatchObject(createControlLimits())
  })

  it('accepts a className from its parent', () => {
    stubResizeObserver()
    const { container } = render(<SceneCanvas label="Test scene" animationId="uppercut-finisher" className="custom" />)
    expect(container.firstElementChild).toHaveClass('scene-canvas', 'custom')
  })

  it('shows a message instead of crashing when the renderer cannot be created', () => {
    const { observers } = stubResizeObserver()
    const log = vi.spyOn(console, 'error').mockImplementation(() => {})
    // Make the next `new WebGLRenderer()` throw, as it does without WebGL.
    mockThree.failNextRenderer()

    const { container } = render(<SceneCanvas label="Test scene" animationId="uppercut-finisher" />)

    expect(screen.getByRole('alert')).toHaveTextContent('not available')
    // The message must not sit inside an element exposed as an image.
    expect(screen.queryByRole('img')).toBeNull()
    expect(container.querySelector('canvas')).toBeNull()
    expect(observers).toHaveLength(0)
    expect(log).toHaveBeenCalled()
  })

  it('shows the scene again when a failed first attempt is followed by a successful one', () => {
    stubResizeObserver()
    vi.spyOn(console, 'error').mockImplementation(() => {})
    // StrictMode runs the effect twice; only the first renderer fails.
    mockThree.failNextRenderer()

    const { container } = render(
      <StrictMode>
        <SceneCanvas label="Test scene" animationId="uppercut-finisher" />
      </StrictMode>,
    )

    expect(container.querySelectorAll('canvas')).toHaveLength(1)
    expect(screen.queryByRole('alert')).toBeNull()
    expect(screen.getByRole('img', { name: 'Test scene' })).toBeInTheDocument()
  })

  it('undoes a half-finished setup and shows the message when a later step fails', () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {})
    const controlsDispose = vi.spyOn(OrbitControls.prototype, 'dispose')
    const geometry = vi.spyOn(BoxGeometry.prototype, 'dispose')
    // The controls are created before the resize observer, so this fails late.
    vi.stubGlobal(
      'ResizeObserver',
      vi.fn(function () {
        throw new Error('ResizeObserver is not supported')
      }),
    )

    const { container } = render(<SceneCanvas label="Test scene" animationId="uppercut-finisher" />)

    expect(screen.getByRole('alert')).toHaveTextContent('not available')
    expect(container.querySelector('canvas')).toBeNull()
    expect(controlsDispose).toHaveBeenCalledTimes(1)
    // The character's 11 boxes were already created when the observer failed.
    expect(geometry).toHaveBeenCalledTimes(11)
    expect(renderers[0].forceContextLoss).toHaveBeenCalledTimes(1)
    expect(renderers[0].dispose).toHaveBeenCalledTimes(1)
    expect(log).toHaveBeenCalled()
  })

  it('stops the loop, disconnects, disposes everything, releases the context and removes the canvas on unmount', () => {
    const { observers } = stubResizeObserver()
    const partGeometry = vi.spyOn(BoxGeometry.prototype, 'dispose')
    const groundGeometry = vi.spyOn(PlaneGeometry.prototype, 'dispose')
    const material = vi.spyOn(MeshStandardMaterial.prototype, 'dispose')
    const controls = vi.spyOn(OrbitControls.prototype, 'dispose')
    const { container, unmount } = render(<SceneCanvas label="Test scene" animationId="uppercut-finisher" />)

    unmount()

    expect(renderers[0].setAnimationLoop).toHaveBeenLastCalledWith(null)
    expect(observers[0].disconnect).toHaveBeenCalledTimes(1)
    // The character is 11 boxes (sharing 3 materials) and the ground is one
    // plane with its own material.
    expect(partGeometry).toHaveBeenCalledTimes(11)
    expect(groundGeometry).toHaveBeenCalledTimes(1)
    expect(material).toHaveBeenCalledTimes(12)
    expect(controls).toHaveBeenCalledTimes(1)
    expect(renderers[0].forceContextLoss).toHaveBeenCalledTimes(1)
    expect(renderers[0].dispose).toHaveBeenCalledTimes(1)
    expect(container.querySelector('canvas')).toBeNull()
  })

  it('leaves a single canvas and a stopped first loop after a StrictMode double mount', () => {
    stubResizeObserver()
    const controlsDispose = vi.spyOn(OrbitControls.prototype, 'dispose')
    const { container } = render(
      <StrictMode>
        <SceneCanvas label="Test scene" animationId="uppercut-finisher" />
      </StrictMode>,
    )
    expect(container.querySelectorAll('canvas')).toHaveLength(1)
    expect(renderers).toHaveLength(2)
    // The first mount's controls (and their listeners) must be disposed too.
    expect(controlsDispose).toHaveBeenCalledTimes(1)
    expect(renderers[0].setAnimationLoop).toHaveBeenLastCalledWith(null)
    expect(renderers[0].dispose).toHaveBeenCalled()
  })
})
