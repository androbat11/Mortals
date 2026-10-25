import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import BackLink from './BackLink'

afterEach(cleanup)

describe('BackLink', () => {
  it('is a link to the given address, named by its text without the arrow', () => {
    render(<BackLink href="#/">All fatalities</BackLink>)

    const link = screen.getByRole('link', { name: 'All fatalities' })

    expect(link).toHaveAttribute('href', '#/')
  })
})
