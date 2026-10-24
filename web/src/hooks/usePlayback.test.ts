import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { usePlayback } from './usePlayback'

afterEach(() => vi.unstubAllGlobals())

describe('usePlayback', () => {
  it('starts playing and keeps the same control across re-renders', () => {
    const { result, rerender } = renderHook(() => usePlayback())
    const first = result.current.playback

    rerender()

    expect(result.current.playing).toBe(true)
    expect(result.current.playback).toBe(first)
  })

  it('toggles between playing and paused, in the control and in the state', () => {
    const { result } = renderHook(() => usePlayback())

    act(() => result.current.togglePlaying())
    expect(result.current.playing).toBe(false)
    expect(result.current.playback.isPlaying()).toBe(false)

    act(() => result.current.togglePlaying())
    expect(result.current.playing).toBe(true)
    expect(result.current.playback.isPlaying()).toBe(true)
  })

  it('replay restarts the move and plays, also from paused', () => {
    const { result } = renderHook(() => usePlayback())
    act(() => result.current.togglePlaying())

    act(() => result.current.replay())

    expect(result.current.playing).toBe(true)
    expect(result.current.playback.takeRestart()).toBe(true)
  })

  it('starts paused when the system asks for reduced motion', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true }))

    const { result } = renderHook(() => usePlayback())

    expect(result.current.playing).toBe(false)
    expect(result.current.playback.isPlaying()).toBe(false)
  })
})
