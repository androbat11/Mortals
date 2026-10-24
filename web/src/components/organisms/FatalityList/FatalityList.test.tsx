import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { createFatalities } from '../../../data/createFatalities'
import FatalityList from './FatalityList'

afterEach(cleanup)

describe('FatalityList', () => {
  const fatalities = createFatalities()

  it('shows one card, as a list item and a link, for every fatality', () => {
    render(
      <FatalityList fatalities={fatalities} hrefFor={(f) => `#/fatality/${f.id}`} />,
    )

    const items = within(screen.getByRole('list')).getAllByRole('listitem')

    expect(items).toHaveLength(fatalities.length)
    fatalities.forEach((fatality) =>
      expect(
        screen.getByRole('link', { name: new RegExp(fatality.name) }),
      ).toHaveAttribute('href', `#/fatality/${fatality.id}`),
    )
  })

  it('shows an empty list for no fatalities', () => {
    render(<FatalityList fatalities={[]} hrefFor={() => '#/'} />)
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
  })
})
