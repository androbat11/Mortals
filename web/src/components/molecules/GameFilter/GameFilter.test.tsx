import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import GameFilter from './GameFilter'

afterEach(cleanup)

const hrefFor = (game: string | null) => (game === null ? '#/' : `#/?game=${game}`)

describe('GameFilter', () => {
  it('has "All games" first and then one link per game, in a labelled navigation', () => {
    render(<GameFilter games={['A', 'B']} selected={null} hrefFor={hrefFor} />)

    const nav = screen.getByRole('navigation', { name: 'Filter by game' })
    const links = within(nav).getAllByRole('link')

    expect(links.map((link) => link.textContent)).toEqual(['All games', 'A', 'B'])
    expect(links.map((link) => link.getAttribute('href'))).toEqual(['#/', '#/?game=A', '#/?game=B'])
  })

  it('marks exactly the selected choice as current', () => {
    render(<GameFilter games={['A', 'B']} selected="B" hrefFor={hrefFor} />)

    const current = screen
      .getAllByRole('link')
      .filter((link) => link.getAttribute('aria-current') === 'true')

    expect(current.map((link) => link.textContent)).toEqual(['B'])
  })

  it('marks "All games" as current when nothing is selected', () => {
    render(<GameFilter games={['A']} selected={null} hrefFor={hrefFor} />)
    expect(screen.getByRole('link', { name: 'All games' })).toHaveAttribute('aria-current', 'true')
  })
})
