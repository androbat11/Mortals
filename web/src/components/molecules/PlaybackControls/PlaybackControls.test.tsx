import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import PlaybackControls from './PlaybackControls'

afterEach(cleanup)

describe('PlaybackControls', () => {
  it('offers Pause while playing and Play while paused', () => {
    const { rerender } = render(
      <PlaybackControls playing onTogglePlay={vi.fn()} onReplay={vi.fn()} />,
    )
    expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument()

    rerender(
      <PlaybackControls playing={false} onTogglePlay={vi.fn()} onReplay={vi.fn()} />,
    )
    expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument()
  })

  it('calls the handlers when the buttons are pressed', () => {
    const onTogglePlay = vi.fn()
    const onReplay = vi.fn()
    render(
      <PlaybackControls playing onTogglePlay={onTogglePlay} onReplay={onReplay} />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Pause' }))
    fireEvent.click(screen.getByRole('button', { name: 'Replay' }))

    expect(onTogglePlay).toHaveBeenCalledTimes(1)
    expect(onReplay).toHaveBeenCalledTimes(1)
  })

  it('groups the buttons under an accessible name', () => {
    render(<PlaybackControls playing onTogglePlay={vi.fn()} onReplay={vi.fn()} />)
    expect(screen.getByRole('group', { name: 'Animation playback' })).toBeInTheDocument()
  })
})
