import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { createFatality } from '../../../data/createFatality'
import FatalityDetails from './FatalityDetails'

afterEach(cleanup)

describe('FatalityDetails', () => {
  const fatality = createFatality('sample-uppercut')

  it('shows the name as the page heading and the game it comes from', () => {
    render(<FatalityDetails fatality={fatality} />)

    expect(
      screen.getByRole('heading', { level: 1, name: fatality.name }),
    ).toBeInTheDocument()
    expect(screen.getByText(fatality.game)).toBeInTheDocument()
  })

  it('shows what the fatality does under its own heading', () => {
    render(<FatalityDetails fatality={fatality} />)

    expect(
      screen.getByRole('heading', { level: 2, name: 'What it does' }),
    ).toBeInTheDocument()
    expect(screen.getByText(fatality.description)).toBeInTheDocument()
  })

  it('shows every tutorial step from the entry', () => {
    render(<FatalityDetails fatality={fatality} />)

    fatality.tutorialSteps.forEach((step) =>
      expect(screen.getByText(step)).toBeInTheDocument(),
    )
  })
})
