import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import AppRoutes from './AppRoutes'

vi.mock('../components/organisms/SceneCanvas/LazySceneCanvas', () => ({
  default: ({ label }: { label: string }) => <div role="img" aria-label={label} />,
}))

beforeEach(() => {
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
  Element.prototype.scrollIntoView = vi.fn()
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  window.location.hash = ''
})

const open = (hash: string) => {
  window.location.hash = hash
  return render(<AppRoutes />)
}

describe('the pages', () => {
  it('shows the About page with derived counts and the notation', () => {
    open('#/')

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/finish/i)
    expect(screen.getByRole('heading', { name: 'How to read an input' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Scorpion' })).toBeInTheDocument()
    expect(screen.queryByRole('searchbox')).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('aria-current', 'page')
  })

  it('shows fatalities grouped by fighter, with no fighter who has none', () => {
    open('#/fatalities')

    expect(screen.getByRole('heading', { level: 1, name: 'Fatalities' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Scorpion' })).toBeInTheDocument()
    expect(screen.queryByRole('region', { name: 'Raiden' })).not.toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent(/^Showing \d+ of \d+ fatalities$/)
  })

  it('shows brutalities with their triggers', () => {
    open('#/brutalities')

    expect(screen.getByRole('heading', { level: 1, name: 'Brutalities' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Raiden' })).toBeInTheDocument()
    expect(screen.getAllByText(/Trigger:/).length).toBeGreaterThan(0)
  })

  it('narrows the moves with the header search and recovers from an empty result', () => {
    open('#/fatalities')

    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'royal execution' } })
    expect(screen.getAllByRole('article')).toHaveLength(1)

    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'zzz' } })
    expect(screen.getByRole('status')).toHaveTextContent('No fatalities match your search.')
    fireEvent.click(screen.getByRole('button', { name: 'Clear search and filters' }))
    expect(screen.getAllByRole('article').length).toBeGreaterThan(1)
    expect(screen.getByRole('searchbox')).toHaveValue('')
  })

  it('filters by a category chip and turns it off when pressed again', () => {
    open('#/fatalities')
    const all = screen.getAllByRole('article').length
    const group = screen.getByRole('group', { name: 'Filter by range' })

    fireEvent.click(within(group).getByRole('button', { name: 'Close' }))
    expect(screen.getAllByRole('article').length).toBeLessThan(all)

    fireEvent.click(within(group).getByRole('button', { name: 'Close' }))
    expect(screen.getAllByRole('article')).toHaveLength(all)
  })

  it('runs only one preview at a time', () => {
    open('#/fatalities')
    const [first, second] = screen.getAllByRole('button', { name: /^Play / })

    fireEvent.click(first)
    expect(screen.getAllByRole('img', { name: /Animation of/ })).toHaveLength(1)

    fireEvent.click(second)
    expect(screen.getAllByRole('img', { name: /Animation of/ })).toHaveLength(1)
  })
})
