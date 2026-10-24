import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from './App.tsx'

vi.mock('three', async (importOriginal) =>
  (await import('./test/mockThree')).withMockRenderer(await importOriginal()),
)

afterEach(cleanup)

describe('App', () => {
  it('renders the scene page with a canvas', () => {
    const { container } = render(<App />)
    expect(container.querySelector('main.scene-page')).toBeInTheDocument()
    expect(container.querySelector('canvas')).toBeInTheDocument()
  })
})
