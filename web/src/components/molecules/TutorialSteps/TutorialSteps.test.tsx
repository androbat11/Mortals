import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import TutorialSteps from './TutorialSteps'

afterEach(cleanup)

describe('TutorialSteps', () => {
  const steps: [string, ...string[]] = ['First step', 'Second step', 'Third step']

  it('shows every step, in order, as an ordered list', () => {
    render(<TutorialSteps steps={steps} />)

    const items = within(screen.getByRole('list')).getAllByRole('listitem')

    expect(screen.getByRole('list').tagName).toBe('OL')
    expect(items.map((item) => item.textContent)).toEqual(steps)
  })

  it('names the list with its heading', () => {
    render(<TutorialSteps steps={steps} />)

    expect(
      screen.getByRole('region', { name: 'How to perform it' }),
    ).toBeInTheDocument()
  })

  it('works with a single step', () => {
    render(<TutorialSteps steps={['Only step']} />)
    expect(screen.getAllByRole('listitem')).toHaveLength(1)
  })
})
