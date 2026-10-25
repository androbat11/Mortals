import { describe, expect, it } from 'vitest'
import { describeMatches } from './describeMatches'

describe('describeMatches', () => {
  it('says how many of the moves are shown, with the right noun', () => {
    expect(describeMatches(3, 8, 'fatality')).toBe('Showing 3 of 8 fatalities')
    expect(describeMatches(1, 9, 'brutality')).toBe('Showing 1 of 9 brutalities')
  })

  it('says nothing matched when none are shown', () => {
    expect(describeMatches(0, 8, 'fatality')).toBe('No fatalities match your search.')
  })
})
