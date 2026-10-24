import { describe, expect, it } from 'vitest'
import { fatalityHref, listHref } from './hrefs'
import { parseRoute } from './parseRoute'

describe('parseRoute', () => {
  it('treats an empty or root hash as the list', () => {
    expect(parseRoute('')).toEqual({ name: 'list' })
    expect(parseRoute('#')).toEqual({ name: 'list' })
    expect(parseRoute('#/')).toEqual({ name: 'list' })
  })

  it('parses a fatality route with a real id', () => {
    expect(parseRoute('#/fatality/sample-uppercut')).toEqual({
      name: 'fatality',
      id: 'sample-uppercut',
    })
  })

  it('falls back to the list for an unknown id, a missing id, or junk', () => {
    expect(parseRoute('#/fatality/nope')).toEqual({ name: 'list' })
    expect(parseRoute('#/fatality/')).toEqual({ name: 'list' })
    expect(parseRoute('#/fatality')).toEqual({ name: 'list' })
    expect(parseRoute('#/something/else')).toEqual({ name: 'list' })
  })
})

describe('hrefs', () => {
  it('round-trips through parseRoute', () => {
    expect(parseRoute(listHref())).toEqual({ name: 'list' })
    expect(parseRoute(fatalityHref('sample-uppercut'))).toEqual({
      name: 'fatality',
      id: 'sample-uppercut',
    })
  })
})
