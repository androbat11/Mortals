import { describe, expect, it } from 'vitest'
import { aboutHref, brutalitiesHref, fatalitiesHref } from './hrefs'
import { createNavItems } from './navItems'
import { getPageKey } from './getPageKey'
import { parseRoute } from './parseRoute'

describe('parseRoute', () => {
  it('shows About for an empty or root hash', () => {
    expect(parseRoute('')).toEqual({ name: 'about' })
    expect(parseRoute('#')).toEqual({ name: 'about' })
    expect(parseRoute('#/')).toEqual({ name: 'about' })
  })

  it('parses the Fatalities and Brutalities pages', () => {
    expect(parseRoute('#/fatalities')).toEqual({ name: 'fatalities' })
    expect(parseRoute('#/brutalities')).toEqual({ name: 'brutalities' })
  })

  it('ignores a trailing slash and a query', () => {
    expect(parseRoute('#/fatalities/')).toEqual({ name: 'fatalities' })
    expect(parseRoute('#/brutalities?x=1')).toEqual({ name: 'brutalities' })
  })

  it('falls back to About for anything unknown', () => {
    expect(parseRoute('#/nope')).toEqual({ name: 'about' })
    expect(parseRoute('#/fatality/sample-uppercut')).toEqual({ name: 'about' })
  })
})

describe('hrefs and navigation items', () => {
  it('round-trips every link through parseRoute', () => {
    expect(parseRoute(aboutHref())).toEqual({ name: 'about' })
    expect(parseRoute(fatalitiesHref())).toEqual({ name: 'fatalities' })
    expect(parseRoute(brutalitiesHref())).toEqual({ name: 'brutalities' })
  })

  it('lists the three pages in the design order, each linking to its own route', () => {
    const items = createNavItems()
    expect(items.map((item) => item.label)).toEqual(['About', 'Fatalities', 'Brutalities'])
    items.forEach((item) => expect(parseRoute(item.href).name).toBe(item.name))
  })

  it('treats each page as its own page key', () => {
    expect(getPageKey({ name: 'about' })).not.toBe(getPageKey({ name: 'fatalities' }))
  })
})
