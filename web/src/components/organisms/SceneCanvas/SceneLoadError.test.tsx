import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import SceneLoadError from './SceneLoadError'

afterEach(cleanup)

describe('SceneLoadError', () => {
  it('tells the user the 3D view could not be loaded, as an alert', () => {
    render(<SceneLoadError />)
    expect(screen.getByRole('alert')).toHaveTextContent('could not be loaded')
  })
})
