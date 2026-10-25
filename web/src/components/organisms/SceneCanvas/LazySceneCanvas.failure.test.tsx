import { cleanup, render, screen } from '@testing-library/react'
import { Suspense } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { createPlaybackControl } from '../../../three/animation/playbackControl'

afterEach(() => {
  cleanup()
  vi.doUnmock('./SceneCanvas')
  vi.restoreAllMocks()
})

describe('LazySceneCanvas when the scene code cannot be loaded', () => {
  it('shows the load-error message instead of a blank scene, and logs the error', async () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.resetModules()
    vi.doMock('./SceneCanvas', () => {
      throw new Error('chunk failed to load')
    })
    const { default: LazySceneCanvas } = await import('./LazySceneCanvas')

    render(
      <Suspense fallback={<p role="status">Loading</p>}>
        <LazySceneCanvas
          label="Test scene"
          animationId="uppercut-finisher"
          playback={createPlaybackControl()}
        />
      </Suspense>,
    )

    expect(await screen.findByRole('alert')).toHaveTextContent('could not be loaded')
    expect(log).toHaveBeenCalled()
  })
})
