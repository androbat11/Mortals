import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App.tsx'

afterEach(cleanup)

describe('App', () => {
  it('renders the Mortals text', () => {
    render(<App />)
    expect(screen.getByText('Mortals')).toBeInTheDocument()
  })

  it('renders a single div and not an empty page', () => {
    const { container } = render(<App />)
    expect(container.childElementCount).toBe(1)
    expect(container.firstElementChild?.tagName).toBe('DIV')
  })
})
