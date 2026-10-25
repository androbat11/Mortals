import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { toInputSteps } from '../../../data/toInputSteps'
import InputSequence from './InputSequence'

afterEach(cleanup)

describe('InputSequence', () => {
  it('lists every step in order, naming the arrows and the buttons', () => {
    render(<InputSequence steps={toInputSteps(['↓', '→', '+', '2'])} />)

    const items = within(screen.getByRole('list', { name: 'Input sequence' })).getAllByRole(
      'listitem',
    )
    expect(items).toHaveLength(4)
    expect(within(items[0]).getByRole('img', { name: 'Down' })).toBeInTheDocument()
    expect(within(items[1]).getByRole('img', { name: 'Right' })).toBeInTheDocument()
    expect(items[2]).toHaveTextContent('+')
    expect(
      within(items[3]).getByRole('img', { name: 'Button 2, HP / TRIANGLE' }),
    ).toBeInTheDocument()
  })
})
