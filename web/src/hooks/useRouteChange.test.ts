import { renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { Route } from '../routing/route'
import { useRouteChange } from './useRouteChange'

const about: Route = { name: 'about' }
const fatalities: Route = { name: 'fatalities' }
const brutalities: Route = { name: 'brutalities' }

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
    renderHook(({ route }) => useRouteChange(route), { initialProps: { route: about as Route } })

    expect(window.scrollTo).not.toHaveBeenCalled()
    expect(document.activeElement).not.toBe(heading)
  })

  it('scrolls to the top and focuses the heading when the page changes', () => {
    const { rerender } = renderHook(({ route }) => useRouteChange(route), {
      initialProps: { route: about as Route },
    })

    rerender({ route: fatalities })

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
    expect(document.activeElement).toBe(heading)
  })

  it('also moves between the two move pages', () => {
    const { rerender } = renderHook(({ route }) => useRouteChange(route), {
      initialProps: { route: fatalities as Route },
    })

    rerender({ route: brutalities })

    expect(window.scrollTo).toHaveBeenCalledTimes(1)
  })

  it('does nothing when a new route object points at the same page', () => {
    const { rerender } = renderHook(({ route }) => useRouteChange(route), {
      initialProps: { route: fatalities as Route },
    })

    rerender({ route: { name: 'fatalities' } as Route })

    expect(window.scrollTo).not.toHaveBeenCalled()
    expect(document.activeElement).not.toBe(heading)
  })
})
