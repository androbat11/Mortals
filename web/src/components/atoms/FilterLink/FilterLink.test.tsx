import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import FilterLink from './FilterLink'

afterEach(cleanup)

describe('FilterLink', () => {
  it('is a link to the given address', () => {
    render(<FilterLink href="#/?game=x" current={false}>Game X</FilterLink>)
    expect(screen.getByRole('link', { name: 'Game X' })).toHaveAttribute('href', '#/?game=x')
  })

  it('says it is the current choice only when it is', () => {
    const { rerender } = render(<FilterLink href="#/" current>All</FilterLink>)
    expect(screen.getByRole('link')).toHaveAttribute('aria-current', 'true')

    rerender(<FilterLink href="#/" current={false}>All</FilterLink>)
    expect(screen.getByRole('link')).not.toHaveAttribute('aria-current')
  })
})
