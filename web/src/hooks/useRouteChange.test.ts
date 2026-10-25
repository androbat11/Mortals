import { renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { Route } from '../routing/route'
import { useRouteChange } from './useRouteChange'

const list = (game: 'sample-game' | null = null): Route => ({ name: 'list', game })
const fatality = (id: 'sample-uppercut' | 'sample-sweep-kick'): Route => ({
  name: 'fatality',
  id,
})

let heading: HTMLHeadingElement

beforeEach(() => {
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
  heading = document.createElement('h1')
  heading.tabIndex = -1
  document.body.appendChild(heading)
})

afterEach(() => {
  heading.remove()
  vi.restoreAllMocks()
})

describe('useRouteChange', () => {
  it('does nothing on the first render', () => {
    renderHook(({ route }) => useRouteChange(route), { initialProps: { route: list() } })

    expect(window.scrollTo).not.toHaveBeenCalled()
    expect(document.activeElement).not.toBe(heading)
  })

  it('scrolls to the top and focuses the heading when the page changes', () => {
    const { rerender } = renderHook(({ route }) => useRouteChange(route), {
      initialProps: { route: list() },
    })

    rerender({ route: fatality('sample-uppercut') })

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
    expect(document.activeElement).toBe(heading)
  })

  it('also moves between two different fatalities', () => {
    const { rerender } = renderHook(({ route }) => useRouteChange(route), {
      initialProps: { route: fatality('sample-uppercut') },
    })

    rerender({ route: fatality('sample-sweep-kick') })

    expect(window.scrollTo).toHaveBeenCalledTimes(1)
  })

  it('does not scroll or move focus when only the game filter changes', () => {
    const { rerender } = renderHook(({ route }) => useRouteChange(route), {
      initialProps: { route: list() },
    })

    rerender({ route: list('sample-game') })

    expect(window.scrollTo).not.toHaveBeenCalled()
    expect(document.activeElement).not.toBe(heading)
  })
})
