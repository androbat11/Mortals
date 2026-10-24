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
    expect(screen.getByText(fatality.game)).toBeInTheDocument()
    expect(screen.getByText(fatality.description)).toBeInTheDocument()
    fatality.tutorialSteps.forEach((step) =>
      expect(screen.getByText(step)).toBeInTheDocument(),
    )
  })

  it('shows the animation next to it, named after the entry', () => {
    const { container } = render(<FatalityPage fatalityId="sample-uppercut" />)

    expect(
      screen.getByRole('img', { name: new RegExp(fatality.name) }),
    ).toBeInTheDocument()
    expect(container.querySelectorAll('canvas')).toHaveLength(1)
    expect(mockThree.renderers).toHaveLength(1)
  })

  it('is a single main landmark', () => {
    render(<FatalityPage fatalityId="sample-uppercut" />)
    expect(screen.getAllByRole('main')).toHaveLength(1)
  })

  it('pauses and resumes from the buttons without rebuilding the scene', () => {
    render(<FatalityPage fatalityId="sample-uppercut" />)
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
