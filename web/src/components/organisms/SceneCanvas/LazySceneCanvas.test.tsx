import { cleanup, render, screen } from '@testing-library/react'
import { Suspense } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { stubResizeObserver } from '../../../test/stubResizeObserver'
import { createPlaybackControl } from '../../../three/animation/playbackControl'
import LazySceneCanvas from './LazySceneCanvas'

const mockThree = await vi.hoisted(async () =>
  (await import('../../../test/mockThree')).createMockThree(),
)

vi.mock('three', async (importOriginal) =>
  mockThree.withMockRenderer(await importOriginal()),
)

beforeEach(() => stubResizeObserver())

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

describe('LazySceneCanvas', () => {
  it('shows the fallback first and then the real scene once its code has loaded', async () => {
    render(
      <Suspense fallback={<p role="status">Loading</p>}>
        <LazySceneCanvas
          label="Test scene"
          animationId="uppercut-finisher"
          playback={createPlaybackControl()}
        />
      </Suspense>,
    )

    expect(screen.getByRole('status')).toHaveTextContent('Loading')
    expect(await screen.findByRole('img', { name: 'Test scene' })).toBeInTheDocument()
  })
})
