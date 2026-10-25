import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { createFighterEntries } from '../../../data/createFighterEntries'
import MoveCard from './MoveCard'

vi.mock('../SceneCanvas/LazySceneCanvas', () => ({
  default: ({ label }: { label: string }) => <div role="img" aria-label={label} />,
}))

afterEach(cleanup)

const moves = createFighterEntries().flatMap((entry) => entry.moves)
const fatality = moves.find((move) => move.kind === 'fatality')!
const brutality = moves.find((move) => move.kind === 'brutality')!

describe('MoveCard', () => {
  it('shows the name, range, description, input, and the unverified mark', () => {
    render(<MoveCard move={fatality} active={false} onPlay={vi.fn()} onStop={vi.fn()} />)

    expect(screen.getByRole('heading', { name: fatality.name })).toBeInTheDocument()
    expect(screen.getByText(fatality.category)).toBeInTheDocument()
    expect(screen.getByText(fatality.description)).toBeInTheDocument()
    expect(screen.getByRole('list', { name: 'Input sequence' })).toBeInTheDocument()
    expect(screen.getByText('Unverified')).toBeInTheDocument()
    expect(screen.queryByText(/Trigger:/)).not.toBeInTheDocument()
  })

  it('shows the trigger of a brutality', () => {
    render(<MoveCard move={brutality} active={false} onPlay={vi.fn()} onStop={vi.fn()} />)
    expect(screen.getByText(/Trigger:/)).toBeInTheDocument()
  })

  it('reports Play with the move id, and shows no scene until it is active', () => {
    const onPlay = vi.fn()
    render(<MoveCard move={fatality} active={false} onPlay={onPlay} onStop={vi.fn()} />)

    expect(screen.queryByRole('img', { name: /Animation of/ })).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: `Play ${fatality.name}` }))
    expect(onPlay).toHaveBeenCalledWith(fatality.id)
  })

  it('mounts the scene with playback controls when active, and reports Close', () => {
    const onStop = vi.fn()
    render(<MoveCard move={fatality} active onPlay={vi.fn()} onStop={onStop} />)

    expect(screen.getByRole('img', { name: /Animation of/ })).toBeInTheDocument()
    expect(screen.getByRole('group', { name: 'Animation playback' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Close' }))
    expect(onStop).toHaveBeenCalledTimes(1)
  })
})
