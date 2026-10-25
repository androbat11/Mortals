import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createFatality } from '../data/createFatality'
import { stubResizeObserver } from '../test/stubResizeObserver'
import FatalityPage from './FatalityPage'

const mockThree = await vi.hoisted(async () =>
  (await import('../test/mockThree')).createMockThree(),
)

vi.mock('three', async (importOriginal) =>
  mockThree.withMockRenderer(await importOriginal()),
)

beforeEach(() => {
  mockThree.renderers.length = 0
  stubResizeObserver()
})

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

describe('FatalityPage', () => {
  const fatality = createFatality('sample-uppercut')

  it('shows the entry\'s data', () => {
    render(<FatalityPage fatalityId="sample-uppercut" />)

    expect(
      screen.getByRole('heading', { level: 1, name: fatality.name }),
    ).toBeInTheDocument()
    expect(screen.getByText(fatality.game.name)).toBeInTheDocument()
    expect(screen.getByText(fatality.description)).toBeInTheDocument()
    fatality.tutorialSteps.forEach((step) =>
      expect(screen.getByText(step)).toBeInTheDocument(),
    )
  })

  // The loading message is tested in `LazySceneCanvas.test.tsx`: the lazy scene
  // stays loaded after its first use, so asserting the fallback here would only
  // pass when this test runs first.
  it('shows the animation, named after the entry', async () => {
    const { container } = render(<FatalityPage fatalityId="sample-uppercut" />)

    expect(
      await screen.findByRole('img', { name: new RegExp(fatality.name) }),
    ).toBeInTheDocument()
    expect(container.querySelectorAll('canvas')).toHaveLength(1)
    expect(mockThree.renderers).toHaveLength(1)
  })

  it('sets the page title to the fatality name', () => {
    render(<FatalityPage fatalityId="sample-uppercut" />)
    expect(document.title).toBe(`${fatality.name} - Mortals`)
  })

  it('is a single main landmark', () => {
    render(<FatalityPage fatalityId="sample-uppercut" />)
    expect(screen.getAllByRole('main')).toHaveLength(1)
  })

  it('pauses and resumes from the buttons without rebuilding the scene', async () => {
    render(<FatalityPage fatalityId="sample-uppercut" />)
    await screen.findByRole('img', { name: new RegExp(fatality.name) })
    expect(mockThree.renderers).toHaveLength(1)

    fireEvent.click(screen.getByRole('button', { name: 'Pause' }))
    expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Play' }))
    expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument()
    expect(mockThree.renderers).toHaveLength(1)
  })

  it('has a replay button', () => {
    render(<FatalityPage fatalityId="sample-uppercut" />)
    fireEvent.click(screen.getByRole('button', { name: 'Pause' }))

    fireEvent.click(screen.getByRole('button', { name: 'Replay' }))

    expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument()
  })
})
