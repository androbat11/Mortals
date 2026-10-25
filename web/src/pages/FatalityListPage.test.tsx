import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { createFatalities } from '../data/createFatalities'
import { filterByGame } from '../data/filterByGame'
import { listGames } from '../data/listGames'
import FatalityListPage from './FatalityListPage'

afterEach(cleanup)

describe('FatalityListPage', () => {
  const all = createFatalities()
  const games = listGames(all)

  it('has the app title as the one page heading, which can take focus', () => {
    render(<FatalityListPage game={null} />)
    const heading = screen.getByRole('heading', { level: 1, name: 'Mortals' })
    expect(heading).toHaveAttribute('tabindex', '-1')
  })

  it('sets the page title', () => {
    render(<FatalityListPage game={null} />)
    expect(document.title).toBe('Mortals')
  })

  it('links every fatality to its own page when there is no filter', () => {
    render(<FatalityListPage game={null} />)

    all.forEach((fatality) =>
      expect(
        screen.getByRole('link', { name: new RegExp(fatality.name) }),
      ).toHaveAttribute('href', `#/fatality/${fatality.id}`),
    )
    expect(screen.getByRole('status')).toHaveTextContent(`${all.length} fatalities`)
  })

  it('shows only the chosen game\'s fatalities, and says how many', () => {
    const shown = filterByGame(all, games[0].id)
    const hidden = all.filter((fatality) => !shown.includes(fatality))
    render(<FatalityListPage game={games[0].id} />)

    shown.forEach((fatality) =>
      expect(screen.getByRole('link', { name: new RegExp(fatality.name) })).toBeInTheDocument(),
    )
    hidden.forEach((fatality) =>
      expect(screen.queryByRole('link', { name: new RegExp(fatality.name) })).toBeNull(),
    )
    expect(screen.getByRole('status')).toHaveTextContent(
      `${shown.length} ${shown.length === 1 ? 'fatality' : 'fatalities'} in ${games[0].name}`,
    )
  })

  it('has a filter with every game and marks the chosen one as current', () => {
    render(<FatalityListPage game={games[1].id} />)

    const filter = screen.getByRole('navigation', { name: 'Filter by game' })

    expect(filter).toHaveTextContent('All games')
    games.forEach((game) => expect(filter).toHaveTextContent(game.name))
    expect(screen.getByRole('link', { name: games[1].name })).toHaveAttribute('aria-current', 'true')
    expect(screen.getByRole('link', { name: 'All games' })).not.toHaveAttribute('aria-current')
  })
})
