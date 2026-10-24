import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { createFatality } from '../../../data/createFatality'
import FatalityCard from './FatalityCard'

afterEach(cleanup)

describe('FatalityCard', () => {
  const fatality = createFatality('sample-uppercut')

  it('is one link to the given address', () => {
    render(<FatalityCard fatality={fatality} href="#/fatality/sample-uppercut" />)

    const link = screen.getByRole('link')

    expect(link).toHaveAttribute('href', '#/fatality/sample-uppercut')
  })

  it('shows the name, game, and description inside the link', () => {
    render(<FatalityCard fatality={fatality} href="#/x" />)

    const link = screen.getByRole('link')

    expect(link).toHaveTextContent(fatality.name)
    expect(link).toHaveTextContent(fatality.game)
    expect(link).toHaveTextContent(fatality.description)
  })
})
