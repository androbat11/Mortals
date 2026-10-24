import { cleanup, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { renderers } from '../../../test/mockThree'
import SceneCanvas from './SceneCanvas'

vi.mock('three', async (importOriginal) =>
  (await import('../../../test/mockThree')).withMockRenderer(
    await importOriginal(),
  ),
)

beforeEach(() => {
  renderers.length = 0
})

afterEach(cleanup)

describe('SceneCanvas', () => {
  it('appends a canvas and starts the animation loop on mount', () => {
    const { container } = render(<SceneCanvas />)
    expect(container.querySelectorAll('canvas')).toHaveLength(1)
    expect(renderers[0].setAnimationLoop).toHaveBeenCalledWith(
      expect.any(Function),
    )
  })

  it('stops the loop, disposes the renderer and removes the canvas on unmount', () => {
    const { container, unmount } = render(<SceneCanvas />)
    unmount()
    expect(renderers[0].setAnimationLoop).toHaveBeenLastCalledWith(null)
    expect(renderers[0].dispose).toHaveBeenCalledTimes(1)
    expect(container.querySelector('canvas')).toBeNull()
  })

  it('leaves a single canvas after a StrictMode double mount', async () => {
    const { StrictMode } = await import('react')
    const { container } = render(
      <StrictMode>
        <SceneCanvas />
      </StrictMode>,
    )
    expect(container.querySelectorAll('canvas')).toHaveLength(1)
    expect(renderers.length).toBeGreaterThan(1)
    expect(renderers[0].dispose).toHaveBeenCalled()
  })
})
