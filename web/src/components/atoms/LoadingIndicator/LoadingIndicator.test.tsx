import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import LoadingIndicator from './LoadingIndicator'

afterEach(cleanup)

describe('LoadingIndicator', () => {
  it('is a status message with the given wording', () => {
    render(<LoadingIndicator>Loading the 3D view…</LoadingIndicator>)
    expect(screen.getByRole('status')).toHaveTextContent('Loading the 3D view…')
  })
})
