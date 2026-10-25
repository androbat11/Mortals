import { describe, expect, it } from 'vitest'
import { createFatalities } from './createFatalities'
import { createFatality } from './createFatality'
import { isFatalityId } from './isFatalityId'
import { listFatalityIds } from './listFatalityIds'

describe('data helpers', () => {
  it('lists the ids of the registry and every one resolves to its entry', () => {
    const ids = listFatalityIds()
    expect(ids.length).toBeGreaterThan(0)
    ids.forEach((id) => expect(createFatality(id).id).toBe(id))
  })

  it('has no duplicate ids', () => {
    const ids = listFatalityIds()
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('creates one entry per id, in the same order', () => {
    expect(createFatalities().map((fatality) => fatality.id)).toEqual(
      listFatalityIds(),
    )
  })

  it('recognises real ids and rejects everything else', () => {
    expect(isFatalityId('sample-uppercut')).toBe(true)
    expect(isFatalityId('nope')).toBe(false)
    expect(isFatalityId('')).toBe(false)
  })
})
