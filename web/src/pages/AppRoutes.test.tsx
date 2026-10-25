import { act, cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { stubResizeObserver } from '../test/stubResizeObserver'
import AppRoutes from './AppRoutes'

const mockThree = await vi.hoisted(async () =>
  (await import('../test/mockThree')).createMockThree(),
)

vi.mock('three', async (importOriginal) =>
  mockThree.withMockRenderer(await importOriginal()),
)

beforeEach(() => {
  mockThree.renderers.length = 0
  stubResizeObserver()
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
})

afterEach(() => {
  cleanup()
  window.location.hash = ''
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('AppRoutes', () => {
  it('shows the list for the empty hash', () => {
    render(<AppRoutes />)
    expect(screen.getByRole('heading', { level: 1, name: 'Mortals' })).toBeInTheDocument()
  })

  it('shows the fatality page for a fatality hash', () => {
    window.location.hash = '#/fatality/sample-uppercut'
    render(<AppRoutes />)

    expect(
      screen.getByRole('heading', { level: 1, name: 'Sample Uppercut' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Back to the list/ })).toHaveAttribute(
      'href',
      '#/?game=sample-game',
    )
  })

  it('shows the filtered list for an address with a game', () => {
    window.location.hash = '#/?game=second-sample-game'
    render(<AppRoutes />)

    expect(screen.getByRole('status')).toHaveTextContent('1 fatality in Second sample game')
    expect(screen.queryByRole('link', { name: /Sample Uppercut/ })).toBeNull()
  })

  it('shows the list for an unknown fatality', () => {
    window.location.hash = '#/fatality/nope'
    render(<AppRoutes />)
    expect(screen.getByRole('heading', { level: 1, name: 'Mortals' })).toBeInTheDocument()
  })

  it('moves between pages when the hash changes, scrolls to the top, and focuses the heading', () => {
    render(<AppRoutes />)
    expect(window.scrollTo).not.toHaveBeenCalled()

    act(() => {
      window.location.hash = '#/fatality/sample-uppercut'
      window.dispatchEvent(new HashChangeEvent('hashchange'))
    })

    const heading = screen.getByRole('heading', { level: 1, name: 'Sample Uppercut' })
    expect(window.scrollTo).toHaveBeenCalledTimes(1)
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
    expect(document.activeElement).toBe(heading)
  })

  it('does not scroll when only the game filter changes', () => {
    render(<AppRoutes />)

    act(() => {
      window.location.hash = '#/?game=sample-game'
      window.dispatchEvent(new HashChangeEvent('hashchange'))
    })

    expect(screen.getByRole('status')).toHaveTextContent('2 fatalities in Sample game')
    expect(window.scrollTo).not.toHaveBeenCalled()
  })
})
