import { describe, expect, it } from 'vitest'
import { createPlaybackControl } from './playbackControl'

describe('createPlaybackControl', () => {
  it('plays by default and can start paused', () => {
    expect(createPlaybackControl().isPlaying()).toBe(true)
    expect(createPlaybackControl(false).isPlaying()).toBe(false)
  })

  it('pauses and resumes', () => {
    const playback = createPlaybackControl()
    playback.pause()
    expect(playback.isPlaying()).toBe(false)
    playback.play()
    expect(playback.isPlaying()).toBe(true)
  })

  it('restart starts playing and is reported exactly once', () => {
    const playback = createPlaybackControl(false)

    playback.restart()

    expect(playback.isPlaying()).toBe(true)
    expect(playback.takeRestart()).toBe(true)
    expect(playback.takeRestart()).toBe(false)
  })

  it('reports no restart when none was requested', () => {
    expect(createPlaybackControl().takeRestart()).toBe(false)
  })

  it('keeps the state of each control separate', () => {
    const first = createPlaybackControl()
    const second = createPlaybackControl()
    first.pause()
    expect(second.isPlaying()).toBe(true)
  })
})
