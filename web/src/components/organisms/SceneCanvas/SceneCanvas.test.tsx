import { cleanup, render } from '@testing-library/react'
import { StrictMode } from 'react'
import { BoxGeometry, MeshBasicMaterial } from 'three'
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

  it('renders the scene from the animation loop', () => {
    stubResizeObserver()
    render(<SceneCanvas />)
    const loop = renderers[0].setAnimationLoop.mock.calls[0][0] as () => void

    loop()

    expect(renderers[0].render).toHaveBeenCalledTimes(1)
  })

  it('resizes the renderer when its container is resized', () => {
    const { callbacks } = stubResizeObserver()
    render(<SceneCanvas />)
    renderers[0].setSize.mockClear()

    callbacks[0]([], {} as ResizeObserver)

    expect(renderers[0].setSize).toHaveBeenCalledTimes(1)
  })

  it('accepts a className from its parent', () => {
    stubResizeObserver()
    const { container } = render(<SceneCanvas className="custom" />)
    expect(container.firstElementChild).toHaveClass('scene-canvas', 'custom')
  })

  it('stops the loop, disconnects, disposes everything and removes the canvas on unmount', () => {
    const { observers } = stubResizeObserver()
    const geometry = vi.spyOn(BoxGeometry.prototype, 'dispose')
    const material = vi.spyOn(MeshBasicMaterial.prototype, 'dispose')
    const { container, unmount } = render(<SceneCanvas />)

    unmount()

    expect(renderers[0].setAnimationLoop).toHaveBeenLastCalledWith(null)
    expect(observers[0].disconnect).toHaveBeenCalledTimes(1)
    expect(geometry).toHaveBeenCalledTimes(1)
    expect(material).toHaveBeenCalledTimes(1)
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
