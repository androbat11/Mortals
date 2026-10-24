import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { createFatalities } from '../data/createFatalities'
import FatalityListPage from './FatalityListPage'

afterEach(cleanup)

describe('FatalityListPage', () => {
  it('has the app title as the one page heading', () => {
    render(<FatalityListPage />)
    expect(screen.getByRole('heading', { level: 1, name: 'Mortals' })).toBeInTheDocument()
  })

  it('links every fatality to its own page', () => {
    render(<FatalityListPage />)

    createFatalities().forEach((fatality) =>
      expect(
        screen.getByRole('link', { name: new RegExp(fatality.name) }),
      ).toHaveAttribute('href', `#/fatality/${fatality.id}`),
    )
  })
})
