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
  window.scrollTo = vi.fn()
})

afterEach(() => {
  cleanup()
  window.location.hash = ''
  vi.unstubAllGlobals()
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
      '#/?game=Sample%20game%20(placeholder)',
    )
  })

  it('shows the filtered list for an address with a game', () => {
    window.location.hash = '#/?game=Second%20sample%20game%20(placeholder)'
    render(<AppRoutes />)

    expect(screen.getByRole('status')).toHaveTextContent('1 fatality in Second sample game')
    expect(screen.queryByRole('link', { name: /Sample Uppercut/ })).toBeNull()
  })

  it('shows the list for an unknown fatality', () => {
    window.location.hash = '#/fatality/nope'
    render(<AppRoutes />)
    expect(screen.getByRole('heading', { level: 1, name: 'Mortals' })).toBeInTheDocument()
  })

  it('moves between pages when the hash changes and scrolls to the top', () => {
    render(<AppRoutes />)

    act(() => {
      window.location.hash = '#/fatality/sample-uppercut'
      window.dispatchEvent(new HashChangeEvent('hashchange'))
    })

    expect(
      screen.getByRole('heading', { level: 1, name: 'Sample Uppercut' }),
    ).toBeInTheDocument()
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
  })
})
