import { useCallback, useState } from 'react'
import { createPlaybackControl } from '../three/animation/playbackControl'
import { prefersReducedMotion } from './prefersReducedMotion'

// Design: playback is logic, so it lives in a hook and the buttons only render.
// It creates one control for the page's life (the lazy `useState` initialiser
// runs once), which the scene's player reads every frame. The control holds the
// truth for the player; React keeps a copy of `playing` only so the button label
// can change. A user who asks for reduced motion gets a page that starts paused
// at the rest pose and can press Play (WCAG 2.2.2: auto-playing motion needs a
// way to stop it).
export function usePlayback() {
  const [playback] = useState(() => createPlaybackControl(!prefersReducedMotion()))
  const [playing, setPlaying] = useState(() => playback.isPlaying())

  const togglePlaying = useCallback(() => {
    if (playback.isPlaying()) playback.pause()
    else playback.play()
    setPlaying(playback.isPlaying())
  }, [playback])

  const replay = useCallback(() => {
    playback.restart()
    setPlaying(true)
  }, [playback])

  return { playback, playing, togglePlaying, replay }
}
