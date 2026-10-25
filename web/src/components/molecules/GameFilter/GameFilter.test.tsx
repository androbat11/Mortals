import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import GameFilter from './GameFilter'

afterEach(cleanup)

import type { Game, GameId } from '../../../data/game'

const hrefFor = (game: GameId | null) => (game === null ? '#/' : `#/?game=${game}`)
const a: Game = { id: 'sample-game', name: 'Game A' }
const b: Game = { id: 'second-sample-game', name: 'Game B' }

describe('GameFilter', () => {
  it('has "All games" first and then one link per game, in a labelled navigation', () => {
    render(<GameFilter games={[a, b]} selected={null} hrefFor={hrefFor} />)

    const nav = screen.getByRole('navigation', { name: 'Filter by game' })
    const links = within(nav).getAllByRole('link')

    expect(links.map((link) => link.textContent)).toEqual(['All games', 'Game A', 'Game B'])
    expect(links.map((link) => link.getAttribute('href'))).toEqual(['#/', '#/?game=sample-game', '#/?game=second-sample-game'])
  })

  it('marks exactly the selected choice as current', () => {
    render(<GameFilter games={[a, b]} selected="second-sample-game" hrefFor={hrefFor} />)

    const current = screen
      .getAllByRole('link')
      .filter((link) => link.getAttribute('aria-current') === 'true')

    expect(current.map((link) => link.textContent)).toEqual(['Game B'])
  })

  it('marks "All games" as current when nothing is selected', () => {
    render(<GameFilter games={[a]} selected={null} hrefFor={hrefFor} />)
    expect(screen.getByRole('link', { name: 'All games' })).toHaveAttribute('aria-current', 'true')
  })
})
